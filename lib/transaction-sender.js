const EosJs = require('eosjs');
const config = require('../config/default.json');
const eosConfig = config['eos_config'];

class TransactionSender {

  /**
   * Push transaction to blockchain
   * @param {Object} signedTransaction
   * @returns {Promise<Object>}
   */
  static async pushTransaction(signedTransaction) {
    const eos = EosJs({
      httpEndpoint: eosConfig.httpEndpoint,
      verbose: false,
    });

    // noinspection JSUnresolvedFunction
    return await eos.pushTransaction(signedTransaction);
  }

}

module.exports = TransactionSender;