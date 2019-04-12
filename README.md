# U°OS Application Transactions

# Warning: this library has been deprecated
Please see this library: [ucom.libs.wallet](../../../ucom.libs.wallet)

## Goal

This package is used to generate signed transactions related to different users actions.

## Content type dictionary

number | description
--- | ---
`1` | Media post
`2` | Post-offer
`10` | Direct post (like a comment directly on user or on org)
`11` | Repost of other post
`3` | Comment
`4` | Organization (Community)

## Interaction type dictionary
number | description
--- | ---
`1` | Follow
`5` | Unfollow
`2` | Upvote (like)
`4` | Downvote (dislike)
`3` | Join (to the post-offer)
`20` | Organization team invitation. Not implemented yet

## Action name dictionary
name | description
--- | ---
`usertouser` | User to user interaction, for ex. follow
`makecontent` | User makes content by himself (not by organization)
`makecontorg` | Organization (organization member) makes content
`usertocont` | User to content interaction, for ex. upvote
`dirpost` | User creates direct post on other user
`dirpostorg` | User creates direct post on organization

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
npm i git+ssh://git@bitbucket.org/gravityprotocol/uos.app.transaction.git#latest
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
See also [CONTRIBUTING](../../../uos.docs/blob/master/CONTRIBUTING.md) for detailed project information.
