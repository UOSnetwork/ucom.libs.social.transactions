const EosJs = require('eosjs');

const config = require('../config/default.json');
const eosConfig = config['eos_config'];
let smart_contract = eosConfig['test_smart_contract'];
const ActionNameDictionary = require('../lib/dictionary/action-name-dictionary');
const InteractionTypesDictionary = require('../lib/dictionary/interaction-types-dictionary');

class TransactionFactory {

  /**
   * @return void
   */
  static initForTestEnv() {
    smart_contract = eosConfig['test_smart_contract'];
  }

  /**
   * @return void
   */
  static initForProductionEnv() {
    smart_contract = eosConfig['production_smart_contract']
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

  static async _createSignedUserToUser(senderData, transactionData) {
    const eos = EosJs({
      keyProvider: [
        senderData.activePk,
      ],
      httpEndpoint: eosConfig.httpEndpoint,
      verbose: false,
      broadcast: false
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
}

module.exports = TransactionFactory;