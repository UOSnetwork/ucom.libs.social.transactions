module.exports = {
  TransactionFactory:         require('./lib/transaction-factory'),
  TransactionSender:          require('./lib/transaction-sender'),

  ContentTypeDictionary:      require('./lib/dictionary/content-type-dictionary'),
  InteractionTypeDictionary:  require('./lib/dictionary/interaction-types-dictionary')
};