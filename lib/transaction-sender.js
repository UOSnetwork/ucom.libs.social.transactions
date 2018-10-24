const EosJs       = require('eosjs');
const config      = require('../config/default.json');
const eosConfig   = config.eos_config;

let http_endpoint = eosConfig.staging_http_endpoint;

class TransactionSender {

  /**
   * @return void
   */
  static initForTestEnv() {
    http_endpoint   = eosConfig.test_http_endpoint;
  }

  /**
   * @return void
   */
  static initForStagingEnv() {
    http_endpoint   = eosConfig.staging_http_endpoint;
  }

  /**
   * @return void
   */
  static initForProductionEnv() {
    http_endpoint   = eosConfig.production_http_endpoint
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
    });

    // noinspection JSUnresolvedFunction
    return await eos.pushTransaction(signedTransaction);
  }
}

module.exports = TransactionSender;