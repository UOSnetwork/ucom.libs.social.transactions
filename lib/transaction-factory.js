const EosJs = require('eosjs');

const config = require('../config/default.json');
const eosConfig = config.eos_config;
let smart_contract = eosConfig.test_smart_contract;
const ActionNameDictionary = require('../lib/dictionary/action-name-dictionary');
const InteractionTypesDictionary = require('../lib/dictionary/interaction-types-dictionary');
const ContentTypeDictionary = require('../lib/dictionary/content-type-dictionary');

const EXPIRE_IN_SECONDS = 3600 * 0.5;

class TransactionFactory {

  /**
   * @return void
   */
  static initForTestEnv() {
    smart_contract = eosConfig.test_smart_contract;
  }

  /**
   * @return void
   */
  static initForProductionEnv() {
    smart_contract = eosConfig.production_smart_contract
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} organizationBlockchainId
   * @param {string} newContentBlockchainId
   *
   * @return {Promise<Object>}
   */
  static async getSignedOrganizationCreatesMediaPost(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newContentBlockchainId
  ) {
    const contentTypeId = ContentTypeDictionary.getTypeMediaPost();

    return await this._getSignedOrganizationCreatesPost(
      senderAccountName,
      senderPrivateKey,
      organizationBlockchainId,
      newContentBlockchainId,
      contentTypeId
    );
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} organizationBlockchainId
   * @param {string} newContentBlockchainId
   *
   * @return {Promise<Object>}
   */
  static async getSignedOrganizationCreatesPostOffer(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newContentBlockchainId
  ) {
    const contentTypeId = ContentTypeDictionary.getTypeOffer();

    return await this._getSignedOrganizationCreatesPost(
      senderAccountName,
      senderPrivateKey,
      organizationBlockchainId,
      newContentBlockchainId,
      contentTypeId
    );
  }

  static async _getSignedOrganizationCreatesPost(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newContentBlockchainId,
    contentTypeId
  ) {
    const actionName = ActionNameDictionary.getOrganizationMakesContent();

    const transactionData = {
      acc:                senderAccountName,
      organization_id:    organizationBlockchainId,
      content_id:         newContentBlockchainId,
      content_type_id:    contentTypeId,
      parent_content_id:  '' // post does not have parent content ID
    };

    return await this._getSignedTransaction(
      senderAccountName,
      senderPrivateKey,
      actionName,
      transactionData
    );
  }

  /**
   *
   * @param {string} senderAccountName - who follows?
   * @param {string} senderPrivateKey - actor private key
   * @param {string} orgBlockchainId
   *
   * @returns {Promise<string>}
   */
  static async getSignedUserFollowsOrg(senderAccountName, senderPrivateKey, orgBlockchainId) {
    const interactionType = InteractionTypesDictionary.getFollowId();

    const jsonData = await this._getSignedUserToContent(senderAccountName, senderPrivateKey, orgBlockchainId, interactionType);

    return JSON.stringify(jsonData);
  }

  /**
   *
   * @param {string} senderAccountName - who follows?
   * @param {string} senderPrivateKey - actor private key
   * @param {string} orgBlockchainId
   *
   * @returns {Promise<string>}
   */
  static async getSignedUserUnfollowsOrg(senderAccountName, senderPrivateKey, orgBlockchainId) {
    const interactionType = InteractionTypesDictionary.getUnfollowId();

    const jsonData = await this._getSignedUserToContent(senderAccountName, senderPrivateKey, orgBlockchainId, interactionType);

    return JSON.stringify(jsonData);
  }

  /**
   *
   * @param {string} senderAccountName - who follows?
   * @param {string} senderPrivateKey - actor private key
   * @param {string} recipientAccountName - who is followed
   * @returns {Promise<Object>}
   */
  static async getSignedUserFollowsUser(senderAccountName, senderPrivateKey, recipientAccountName) {
    const interactionType = InteractionTypesDictionary.getFollowId();

    return await this._getSignedUserToUser(senderAccountName, senderPrivateKey, recipientAccountName, interactionType);
  }

  /**
   * Create signed transaction for any user to content interactions
   * @param {string} senderAccountName
   * @param {string} senderActivePrivateKey
   * @param {string} contentBlockchainId
   * @param {number} interactionTypeId
   * @returns {Promise<Object>}
   */
  static async _getSignedUserToContent(senderAccountName, senderActivePrivateKey, contentBlockchainId, interactionTypeId) {
    const actionName = ActionNameDictionary.getUserToContent();

    const transactionData = {
        acc: senderAccountName,
        content_id: contentBlockchainId,
        interaction_type_id: interactionTypeId,
    };

    return await this._getSignedTransaction(senderAccountName, senderActivePrivateKey, actionName, transactionData);
  }

  /**
   *
   * @param {string} senderAccountName - who follows?
   * @param {string} senderPrivateKey - actor private key
   * @param {string} recipientAccountName - who is followed
   * @returns {Promise<Object>}
   */
  static async getSignedUserUnfollowsUser(senderAccountName, senderPrivateKey, recipientAccountName) {
    const interactionType = InteractionTypesDictionary.getUnfollowId();

    return await this._getSignedUserToUser(senderAccountName, senderPrivateKey, recipientAccountName, interactionType);
  }

  static async _getSignedUserToUser(senderAccountName, senderPrivateKey, recipientAccountName, interactionType) {
    const actionName = ActionNameDictionary.getUserToUser();

    const senderData = {
      'account_name': senderAccountName,
      'activePk': senderPrivateKey,
    };

    const transactionData = {
      action_name: actionName,

      data: {
        acc_from: senderAccountName,
        acc_to: recipientAccountName,
        interaction_type_id: interactionType,
      }
    };

    return await this._createSignedUserToUser(senderData, transactionData);
  }

  /**
   * @deprecated
   * @see _getSignedTransaction
   * @param {Object} senderData
   * @param {Object} transactionData
   * @return {Promise<*>}
   * @private
   */
  static async _createSignedUserToUser(senderData, transactionData) {
    const eos = EosJs({
      keyProvider: [
        senderData.activePk,
      ],
      httpEndpoint: eosConfig.httpEndpoint,
      verbose: false,
      broadcast: false,
      expireInSeconds: EXPIRE_IN_SECONDS
    });

    // noinspection JSUnresolvedFunction
    return await eos.transaction({
      actions: [{
        account: smart_contract,
        name: transactionData.action_name,
        authorization: [{
          actor: senderData.account_name,
          permission: 'active',
        }],
        data: transactionData.data
      }],
    }, {broadcast: false});
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} newOrganizationBlockchainId
   * @return {Promise<Object>} - signed transaction
   */
  static async createSignedUserCreatesOrganization(senderAccountName, senderPrivateKey, newOrganizationBlockchainId) {
    const senderData = {
      'activePk': senderPrivateKey,
      'account_name': senderAccountName,
    };

    const transactionData = {
      acc:                senderAccountName,
      content_id:         newOrganizationBlockchainId,
      content_type_id:    ContentTypeDictionary.getTypeOrganization(),
      parent_content_id:  '' // organization does not have parent content ID
    };

    return await this._createSignedUserMakeContent(senderData, transactionData);
  }

  /**
   * @deprecated
   * @see _getSignedTransaction
   * @param {Object} senderData
   * @param {Object} data - transaction data
   * @return {Promise<Object>}
   * @private
   */
  static async _createSignedUserMakeContent(senderData, data) {
    const eos = EosJs({
      keyProvider: [
        senderData.activePk,
      ],
      httpEndpoint: eosConfig.httpEndpoint,
      verbose: false,
      broadcast: false,
      expireInSeconds: EXPIRE_IN_SECONDS,
    });

    // noinspection JSUnresolvedFunction
    return await eos.transaction({
      actions: [{
        account: smart_contract,
        name: ActionNameDictionary.getMakeContent(),
        authorization: [{
          actor: senderData.account_name,
          permission: 'active',
        }],
        data
      }],
    }, {broadcast: false});
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderActivePrivateKey
   * @param {string} actionName - smart contract action name
   * @param {Object} data - transaction data
   * @return {Promise<Object>}
   * @private
   */
  static async _getSignedTransaction(senderAccountName, senderActivePrivateKey, actionName, data) {
    const eos = EosJs({
      keyProvider:    [ senderActivePrivateKey ],
      httpEndpoint:   eosConfig.httpEndpoint,
      verbose:        false,
      broadcast:      false,
      expireInSeconds: EXPIRE_IN_SECONDS
    });

    // noinspection JSUnresolvedFunction
    return await eos.transaction({
      actions: [{
        account: smart_contract,
        name: actionName,
        authorization: [{
          actor: senderAccountName,
          permission: 'active',
        }],
        data
      }],
    }, {broadcast: false});
  }
}

module.exports = TransactionFactory;