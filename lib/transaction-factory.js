const EosJs = require('eosjs');

const config          = require('../config/default.json');
const eosConfig       = config.eos_config;
let smart_contract    = eosConfig.staging_smart_contract;
let http_endpoint     = eosConfig.staging_http_endpoint;

const ActionNameDictionary        = require('../lib/dictionary/action-name-dictionary');
const InteractionTypesDictionary  = require('../lib/dictionary/interaction-types-dictionary');
const ContentTypeDictionary       = require('../lib/dictionary/content-type-dictionary');

const EXPIRE_IN_SECONDS = 3600 * 0.5;

class TransactionFactory {

  /**
   * @deprecated
   * @see initForStagingEnv
   * @return void
   */
  static initForTestEnv() {
    smart_contract  = eosConfig.staging_smart_contract;
    http_endpoint   = eosConfig.staging_http_endpoint
  }

  /**
   * @return void
   */
  static initForStagingEnv() {
    smart_contract  = eosConfig.staging_smart_contract;
    http_endpoint   = eosConfig.staging_http_endpoint;
  }

  /**
   * @return void
   */
  static initForProductionEnv() {
    smart_contract  = eosConfig.production_smart_contract;
    http_endpoint   = eosConfig.production_http_endpoint;
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} newPostBlockchainId
   * @return {Promise<string>}
   */
  static async getSignedUserHimselfCreatesMediaPost(senderAccountName, senderPrivateKey, newPostBlockchainId) {
    const contentTypeId = ContentTypeDictionary.getTypeMediaPost();

    return this._userHimselfCreatesPost(senderAccountName, senderPrivateKey, newPostBlockchainId, contentTypeId);
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} newPostBlockchainId
   * @return {Promise<string>}
   */
  static async getSignedUserHimselfCreatesPostOffer(senderAccountName, senderPrivateKey, newPostBlockchainId) {
    const contentTypeId = ContentTypeDictionary.getTypeOffer();

    return this._userHimselfCreatesPost(senderAccountName, senderPrivateKey, newPostBlockchainId, contentTypeId);
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} organizationBlockchainId
   * @param {string} newContentBlockchainId
   *
   * @return {Promise<string>}
   */
  static async getSignedOrganizationCreatesMediaPost(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newContentBlockchainId
  ) {
    const contentTypeId = ContentTypeDictionary.getTypeMediaPost();

    return await this._getSignedOrganizationCreatesContent(
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
   * @param {string} newCommentBlockchainId
   *
   * @param {string} postBlockchainId
   * @return {Promise<string>}
   */
  static async getSignedOrganizationCreatesCommentOnPost(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newCommentBlockchainId,
    postBlockchainId
  ) {
    const contentTypeId = ContentTypeDictionary.getTypeComment();

    return await this._getSignedOrganizationCreatesContent(
      senderAccountName,
      senderPrivateKey,
      organizationBlockchainId,
      newCommentBlockchainId,
      contentTypeId,
      postBlockchainId
    );
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   *
   * @param {string} organizationBlockchainId
   * @param {string} newCommentBlockchainId
   * @param {string} parentCommentBlockchainId
   *
   * @return {Promise<string>}
   */
  static async getSignedOrganizationCreatesCommentOnComment(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newCommentBlockchainId,
    parentCommentBlockchainId
  ) {
    const contentTypeId = ContentTypeDictionary.getTypeComment();

    return await this._getSignedOrganizationCreatesContent(
      senderAccountName,
      senderPrivateKey,
      organizationBlockchainId,
      newCommentBlockchainId,
      contentTypeId,
      parentCommentBlockchainId
    );
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} commentBlockchainId
   * @param {string} parentPostBlockchainId
   */
  static async getSignedUserHimselfCreatesCommentOnPost(
    senderAccountName,
    senderPrivateKey,
    commentBlockchainId,
    parentPostBlockchainId
  ) {
    const actionName = ActionNameDictionary.getMakeContent();

    const data = {
      acc:                senderAccountName,
      content_id:         commentBlockchainId,
      content_type_id:    ContentTypeDictionary.getTypeComment(),
      parent_content_id:  parentPostBlockchainId,
    };

    return await this._getSignedTransaction(senderAccountName, senderPrivateKey, actionName, data);
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} commentBlockchainId
   * @param {string} parentCommentBlockchainId
   */
  static async getSignedUserHimselfCreatesCommentOnComment(
    senderAccountName,
    senderPrivateKey,
    commentBlockchainId,
    parentCommentBlockchainId
  ) {
    const actionName = ActionNameDictionary.getMakeContent();
    const contentTypeId = ContentTypeDictionary.getTypeComment();

    const data = {
      acc:                senderAccountName,
      content_id:         commentBlockchainId,
      content_type_id:    contentTypeId,
      parent_content_id:  parentCommentBlockchainId,
    };

    return await this._getSignedTransaction(senderAccountName, senderPrivateKey, actionName, data);
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} organizationBlockchainId
   * @param {string} newContentBlockchainId
   *
   * @return {Promise<string>}
   */
  static async getSignedOrganizationCreatesPostOffer(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newContentBlockchainId
  ) {
    const contentTypeId = ContentTypeDictionary.getTypeOffer();

    return await this._getSignedOrganizationCreatesContent(
      senderAccountName,
      senderPrivateKey,
      organizationBlockchainId,
      newContentBlockchainId,
      contentTypeId
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

    return await this._getSignedUserToContent(senderAccountName, senderPrivateKey, orgBlockchainId, interactionType);
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

    return await this._getSignedUserToContent(senderAccountName, senderPrivateKey, orgBlockchainId, interactionType);
  }

  /**
   *
   * @param {string} senderAccountName - who follows?
   * @param {string} senderPrivateKey - actor private key
   * @param {string} recipientAccountName - who is followed
   * @param {boolean} asString - deprecated parameter. Means nothing
   * @returns {Promise<string>}
   */
  static async getSignedUserFollowsUser(senderAccountName, senderPrivateKey, recipientAccountName, asString = false) {
    const interactionType = InteractionTypesDictionary.getFollowId();

    return await this._getSignedUserToUser(senderAccountName, senderPrivateKey, recipientAccountName, interactionType);
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} newPostBlockchainId
   * @param {number} postTypeId
   * @return {Promise<string>}
   * @private
   */
  static async _userHimselfCreatesPost(senderAccountName, senderPrivateKey, newPostBlockchainId, postTypeId) {
    const actionName = ActionNameDictionary.getMakeContent();

    const data = {
      acc:                senderAccountName,
      content_id:         newPostBlockchainId,
      content_type_id:    postTypeId,
      parent_content_id:  ''
    };

    return await this._getSignedTransaction(senderAccountName, senderPrivateKey, actionName, data);
  }

  /**
   * Create signed transaction for any user to content interactions
   * @param {string} senderAccountName
   * @param {string} senderActivePrivateKey
   * @param {string} contentBlockchainId
   * @param {number} interactionTypeId
   * @returns {Promise<string|Object>}
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
   * @param   {string} senderAccountName - who follows?
   * @param   {string} senderPrivateKey - actor private key
   * @param   {string} recipientAccountName - who is followed
   * @param   {boolean} asString - deprecated parameter. Not used
   * @returns {Promise<Object>}
   */
  static async getSignedUserUnfollowsUser(senderAccountName, senderPrivateKey, recipientAccountName, asString = false) {
    const interactionType = InteractionTypesDictionary.getUnfollowId();

    return await this._getSignedUserToUser(senderAccountName, senderPrivateKey, recipientAccountName, interactionType);
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} newOrganizationBlockchainId
   * @return {Promise<string>} - signed transaction
   */
  static async createSignedUserCreatesOrganization(senderAccountName, senderPrivateKey, newOrganizationBlockchainId) {
    const data = {
      acc:                senderAccountName,
      content_id:         newOrganizationBlockchainId,
      content_type_id:    ContentTypeDictionary.getTypeOrganization(),
      parent_content_id:  '' // organization does not have parent content ID
    };

    const actionName = ActionNameDictionary.getMakeContent();

    return await this._getSignedTransaction(senderAccountName, senderPrivateKey, actionName, data);
  }

  static async _getSignedUserToUser(senderAccountName, senderPrivateKey, recipientAccountName, interactionType) {
    const data = {
      acc_from:             senderAccountName,
      acc_to:               recipientAccountName,
      interaction_type_id:  interactionType,
    };

    const actionName = ActionNameDictionary.getUserToUser();
    return await this._getSignedTransaction(senderAccountName, senderPrivateKey, actionName, data);
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderPrivateKey
   * @param {string} organizationBlockchainId
   * @param {string} newContentBlockchainId
   * @param {number} contentTypeId
   * @param {string} parentContentBlockchainId
   * @return {Promise<string|Object>}
   * @private
   */
  static async _getSignedOrganizationCreatesContent(
    senderAccountName,
    senderPrivateKey,
    organizationBlockchainId,
    newContentBlockchainId,
    contentTypeId,
    parentContentBlockchainId = ''
  ) {
    const actionName = ActionNameDictionary.getOrganizationMakesContent();

    const data = {
      acc:                senderAccountName,
      organization_id:    organizationBlockchainId,
      content_id:         newContentBlockchainId,
      content_type_id:    contentTypeId,
      parent_content_id:  parentContentBlockchainId
    };

    return await this._getSignedTransaction(
      senderAccountName,
      senderPrivateKey,
      actionName,
      data
    );
  }

  /**
   *
   * @param {string} senderAccountName
   * @param {string} senderActivePrivateKey
   * @param {string} actionName - smart contract action name
   * @param {Object} data - transaction data
   * @param {boolean} asString - make JSON.stringify and return string instead of json
   * @return {Promise<string|Object>}
   * @private
   */
  static async _getSignedTransaction(senderAccountName, senderActivePrivateKey, actionName, data, asString = true) {
    const eos = EosJs({
      keyProvider:    [ senderActivePrivateKey ],
      httpEndpoint:   http_endpoint,
      verbose:        false,
      broadcast:      false,
      expireInSeconds: EXPIRE_IN_SECONDS
    });

    // noinspection JSUnresolvedFunction
    const json = await eos.transaction({
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

    if (asString) {
      return JSON.stringify(json);
    }

    return json;
  }
}

module.exports = TransactionFactory;