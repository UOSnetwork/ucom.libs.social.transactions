const EosJs       = require('eosjs');
const config      = require('../config/default.json');
const eosConfig   = config.eos_config;

let http_endpoint = eosConfig.test_http_endpoint;
let chain_id      = eosConfig.test_chain_id;

const UOS_SYSTEM_ACCOUNT          = 'eosio';

const ACTION__NEW_ACCOUNT         = 'newaccount';
const ACTION__BUY_RAM_BYTES       = 'buyrambytes';
const ACTION__DELEGATE_BANDWIDTH  = 'delegatebw';

const MEMORY_BYTES_FOR_NEW_ACCOUNT  = 8192;
const STAKE_NET_QUANTITY            = '1.0000 UOS';
const STAKE_CPU_QUANTITY            = '1.0000 UOS';

class TransactionSender {

  /**
   * @return void
   */
  static initForTestEnv() {
    http_endpoint   = eosConfig.test_http_endpoint;
    chain_id        = eosConfig.test_chain_id;
  }

  /**
   * @return void
   */
  static initForStagingEnv() {
    http_endpoint   = eosConfig.staging_http_endpoint;
    chain_id        = eosConfig.staging_chain_id;
  }

  /**
   * @return void
   */
  static initForProductionEnv() {
    http_endpoint   = eosConfig.production_http_endpoint;
    chain_id        = eosConfig.production_chain_id
  }

  /**
   * Push transaction to blockchain
   * @param {Object} signedTransaction
   * @returns {Promise<Object>}
   */
  static async pushTransaction(signedTransaction) {
    const eos = EosJs({
      httpEndpoint: http_endpoint,
      verbose:      false,
      chainId:      chain_id,
    });

    // noinspection JSUnresolvedFunction
    return await eos.pushTransaction(signedTransaction);
  }

  /**
   *
   * @param {string} accountCreatorName
   * @param {string} accountCreatorPrivateKey
   * @param {string} newAccountName
   * @param {string} ownerPubKey
   * @param {string} activePubKey
   * @return {Promise<*>}
   */
  static async createNewAccountInBlockchain(
    accountCreatorName,
    accountCreatorPrivateKey,
    newAccountName,
    ownerPubKey,
    activePubKey
  ) {
    const eos = EosJs({
      keyProvider:  [ accountCreatorPrivateKey ],
      httpEndpoint: http_endpoint,
      verbose:      true,
      chainId:      chain_id,
    });

    const authorization = [{
      actor:      accountCreatorName,
      permission: 'active',
    }];

    // noinspection JSUnresolvedFunction
    return await eos.transaction({
      actions: [{
        account:  UOS_SYSTEM_ACCOUNT,
        name:     ACTION__NEW_ACCOUNT,
        authorization,
        data: {
          creator: accountCreatorName,
          name:    newAccountName,
          owner: {
            threshold: 1,
            keys: [{
              key: ownerPubKey,
              weight: 1
            }],
            accounts: [],
            waits: []
          },
          active: {
            threshold: 1,
            keys: [{
              key: activePubKey,
              weight: 1
            }],
            accounts: [],
            waits: []
          },
        },
      },
        {
          account: UOS_SYSTEM_ACCOUNT,
          name: ACTION__BUY_RAM_BYTES,
          authorization,
          data: {
            payer:    accountCreatorName,
            receiver: newAccountName,
            bytes:    MEMORY_BYTES_FOR_NEW_ACCOUNT,
          },
        },
        {
          account:  UOS_SYSTEM_ACCOUNT,
          name:     ACTION__DELEGATE_BANDWIDTH,
          authorization,
          data: {
            from: accountCreatorName,
            receiver: newAccountName,
            stake_net_quantity: STAKE_NET_QUANTITY,
            stake_cpu_quantity: STAKE_CPU_QUANTITY,
            transfer: 0,
          }
        }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
  }

  static async getImportanceTableRows() {
    const eos = EosJs({
      httpEndpoint: http_endpoint,
      chainId:      chain_id,
    });

    // noinspection JSUnresolvedFunction
    const data = await eos.getTableRows({
      json: true,
      code: 'uos.activity',
      scope: 'uos.activity',
      table: 'rate',
      limit: 9999999999,
    });

    return data.rows;
  }

  /**
   *
   * @param {string} accountName
   * @return {Promise<boolean>}
   */
  static async isAccountAvailable(accountName) {
    const eos = EosJs({
      httpEndpoint: http_endpoint,
      chainId:      chain_id,
    });

    try {
      // noinspection JSUnresolvedFunction
      const account = await eos.getAccount(accountName);
      if (account) {
        return false;
      }
    } catch (error) {
      // noinspection UnusedCatchParameterJS
      try {
        const data = JSON.parse(error.message);
        // noinspection JSUnresolvedVariable
        return data.error.what === 'unspecified';
      } catch(e) {
        return false;
      }
    }
  }

  /**
   *
   * @param {string} accountName
   * @return {Promise<*>}
   */
  static async getAccount(accountName) {
    const eos = EosJs({
      httpEndpoint: http_endpoint,
      chainId:      chain_id,
    });

    // noinspection JSUnresolvedFunction
    return eos.getAccount(accountName);
  }
}

module.exports = TransactionSender;