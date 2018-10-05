const { TransactionFactory, TransactionSender } = require('../index');
TransactionFactory.initForTestEnv();

const helper = require('./transactions-helper');

const senderAccountName       = helper.getSenderAccountName();
const senderActivePrivateKey  = helper.getSenderActivePrivateKey();

describe('Transaction tests', () => {
  describe('Organization related transactions', function () {
    describe('User - organization interaction', () => {
      it('should create valid transaction - user follows organization', async () => {
        const signedString = await TransactionFactory.getSignedUserFollowsOrg(
          senderAccountName,
          senderActivePrivateKey,
          'sample_org_blockchain_id'
        );

        const signed = JSON.parse(signedString);

        expect(signed).toMatchObject(helper.getSampleTransactionUserFollowsOrganization());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForUserFollowsOrg());
      }, 10000);

      it('should create valid transaction - user unfollows organization', async () => {
        const signedString = await TransactionFactory.getSignedUserUnfollowsOrg(
          senderAccountName,
          senderActivePrivateKey,
          'sample_org_blockchain_id'
        );

        const signed = JSON.parse(signedString);

        expect(signed).toMatchObject(helper.getSampleTransactionUserUnfollowsOrganization());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForUserUnfollowsOrg());
      }, 10000);
    });
    describe('Organization creates content', () => {
      it('should create valid transaction - organization creates media post', async () => {
        const signedString = await TransactionFactory.getSignedOrganizationCreatesMediaPost(
          senderAccountName,
          senderActivePrivateKey,
          'sample_org_blockchain_id',
          'sample_post_blockchain_id'
        );

        const signed = JSON.parse(signedString);

        expect(signed).toMatchObject(helper.getSampleTransactionForMediaPost());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForMediaPost());
      }, 10000);

      it('should create valid transaction - organization creates post-offer', async () => {
        const signedString = await TransactionFactory.getSignedOrganizationCreatesPostOffer(
          senderAccountName,
          senderActivePrivateKey,
          'sample_org_blockchain_id',
          'sample_post_blockchain_id'
        );

        const signed = JSON.parse(signedString);

        expect(signed).toMatchObject(helper.getSampleTransactionForPostOffer());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForPostOffer());
      }, 10000);

      it('comment on post creation - should create valid transaction', async () => {
        const signedString = await TransactionFactory.getSignedOrganizationCreatesCommentOnPost(
          senderAccountName,
          senderActivePrivateKey,
          'sample_org_blockchain_id',
          'sample_new_comment_blockchain_id',
          'sample_parent_post_blockchain_id'
        );

        const signed = JSON.parse(signedString);

        expect(signed).toMatchObject(helper.getSampleTransactionForOrgCreatesCommentOnPost());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForOrgCreatesCommentOnPost());
      });

      it('comment on comment creation - should create valid transaction', async () => {
        const signedString = await TransactionFactory.getSignedOrganizationCreatesCommentOnComment(
          senderAccountName,
          senderActivePrivateKey,
          'sample_org_blockchain_id',
          'sample_new_comment_blockchain_id',
          'sample_parent_comment_blockchain_id'
        );

        const signed = JSON.parse(signedString);
        expect(signed).toMatchObject(helper.getSampleTransactionForOrgCreatesCommentOnComment());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForOrgCreatesCommentOnComment());
      });
    });

    describe('User creates organization', () => {
      it('should create valid create organization signature and push it successfully', async () => {
        const signedString = await TransactionFactory.createSignedUserCreatesOrganization(
          senderAccountName,
          senderActivePrivateKey,
          'sample_blockchain_id'
        );

        const signed = JSON.parse(signedString);

        expect(signed).toMatchObject(helper.getExpectedNewOrganizationCreationTransaction());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getExpectedCreateOrganizationTransactionPushResponse());
      }, 20000);
    });
  });

  describe('User direct actions related transactions', () => {
    describe('User creates content', () => {
      it('Create comment directly for post - should create valid transaction', async () => {
        const signedString = await TransactionFactory.getSignedUserHimselfCreatesComment(
          senderAccountName,
          senderActivePrivateKey,
          'sample_new_comment_blockchain_id',
          'sample_parent_post_blockchain_blockchain_id'
        );

        const signed = JSON.parse(signedString);

        expect(signed).toMatchObject(helper.getSampleTransactionForUserHimselfCreatesCommentOnPost());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForUserHimselfCreatesCommentOnPost());
      }, 10000);

      it('comment on comment creation - should create valid transaction', async () => {
        const signedString = await TransactionFactory.getSignedUserHimselfCreatesCommentOnComment(
          senderAccountName,
          senderActivePrivateKey,
          'sample_new_comment_blockchain_id',
          'sample_parent_comment_blockchain_id'
        );

        const signed = JSON.parse(signedString);
        expect(signed).toMatchObject(helper.getSampleTransactionForUserHimselfCreatesCommentOnComment());
        const data = await TransactionSender.pushTransaction(signed.transaction);

        expect(data).toMatchObject(helper.getSamplePushResultForUserHimselfCreatesCommentOnComment());
      });
    });
  });

  describe('User follows-unfollows other user', () => {
    it('should create valid user-to-user signed transaction and push it successfully', async () => {
      const recipientAccountName = 'jane';

      const signedString = await TransactionFactory.getSignedUserFollowsUser(
        senderAccountName,
        senderActivePrivateKey,
        recipientAccountName
      );

      const signed = JSON.parse(signedString);

      expect(signed).toMatchObject(helper.getUserToUserExpectedTransaction());

      const data = await TransactionSender.pushTransaction(signed.transaction);

      expect(data).toMatchObject(helper.getExpectedUserFollowsUserTransactionPushResponse());
    }, 10000)
  });
});