# UOS Application transactions

## Goal

This package is used to generate signed transactions related to different users actions.

## Workflow
1. Call one of the methods and receive signed transaction.
2. Send this transaction as is to backend server. Backend server will push this transaction to blockchain.
Example:
```
body = {
// other request params
'signed_transaction': signed_transaction_string,
// other request params
}
```

## How to install:

```
npm i git+ssh://git@bitbucket.org/gravityprotocol/uos.app.transaction.git
```

## User to user transactions
### User follows other user
```
const { TransactionFactory } = require('uos-app-transaction');

// Init for test env before doing any calls
TransactionFactory.initForTestEnv();
// In production call this method instead: TransactionFactory.initForProductionEnv(); 

(async () => {

  const senderAccountName = 'vlad';
  const senderActivePrivateKey = accountsData.vlad.activePk;
  const recipientAccountName = 'jane';

  const signed = await TransactionFactory.getSignedUserFollowsUser(
    senderAccountName,
    senderActivePrivateKey,
    recipientAccountName
  );
  
  const signed_transaction_string = JSON.stringify(signed);
  // Then send this value in request body
})();
```
