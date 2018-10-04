const SENDER_ACCOUNT_NAME       = 'autotester';
const SENDER_ACTIVE_PRIVATE_KEY = '5JqPw7wHJ9MvDake6yfnvoYGvB6mhgHLCLafezkFGgGN67E9N6V';

class TransactionsHelper {

  /**
   *
   * @return {string}
   */
  static getSenderAccountName() {
    return SENDER_ACCOUNT_NAME;
  }



  /**
   *
   * @return {string}
   */
  static getSenderActivePrivateKey() {
    return SENDER_ACTIVE_PRIVATE_KEY;
  }

  static getExpectedUserFollowsUserTransactionPushResponse() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 14
          },
          "net_usage": 112,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": "tst.activity",
                "act_digest": "ecbe0b091e0ce7a6f9bb23fd2ff2f17eb7d47306adb129f4bc322558802cf777",
                // "code_sequence": 1,
                // "abi_sequence": 1
              },
              "act": {
                "account": "tst.activity",
                "name": "usertouser",
                "authorization": [
                  {
                    "actor": SENDER_ACCOUNT_NAME,
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc_from": SENDER_ACCOUNT_NAME,
                  "acc_to": "jane",
                  "interaction_type_id": 1
                },
                "hex_data": "00c05519ab4cb3360000000000a0a67901"
              },
              "cpu_usage": 0,
              "console": `usertouser acc_from = ${SENDER_ACCOUNT_NAME} acc_to = jane interaction_type_id = 1`,
              "total_cpu_usage": 0,
              "inline_traces": []
            }
          ],
          "except": null
        }
      };

  }

  static getUserToUserExpectedTransaction(){
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_net_usage_words": 0,
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": "tst.activity",
              "name": "usertouser",
              "authorization": [
                {
                  "actor": SENDER_ACCOUNT_NAME,
                  "permission": "active"
                }
              ],
              "data": "00c05519ab4cb3360000000000a0a67901"
            }
          ],
          "transaction_extensions": []
        },
      }
    };
  }

  static getExpectedNewOrganizationCreationTransaction() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_net_usage_words": 0,
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": "tst.activity",
              "name": "makecontent",
              "authorization": [
                {
                  "actor": SENDER_ACCOUNT_NAME,
                  "permission": "active"
                }
              ],
              "data": "00c05519ab4cb3361473616d706c655f626c6f636b636861696e5f69640400"
            }
          ],
          "transaction_extensions": []
        },
      }
    };
  }

  static getExpectedCreateOrganizationTransactionPushResponse() {
    return  {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 16
          },
          "net_usage": 128,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": "tst.activity",
                "act_digest": "b62814e71f1794008b39646c8f6099254080344da7209744cf3ff3f35421b697",
                // "code_sequence": 1,
                // "abi_sequence": 1
              },
              "act": {
                "account": "tst.activity",
                "name": "makecontent",
                "authorization": [
                  {
                    "actor": SENDER_ACCOUNT_NAME,
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": SENDER_ACCOUNT_NAME,
                  "content_id": "sample_blockchain_id",
                  "content_type_id": 4,
                  "parent_content_id": "",
                },
                "hex_data": "00c05519ab4cb3361473616d706c655f626c6f636b636861696e5f69640400"
              },
              "cpu_usage": 0,
              "console": `makecontent acc = ${SENDER_ACCOUNT_NAME} content_id = sample_blockchain_id content_type_id = 4 parent_content_id = `,
              "total_cpu_usage": 0,
              "inline_traces": []
            }
          ],
          "except": null
        }
      };

  }


  static getSampleTransactionUserFollowsOrganization() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_net_usage_words": 0,
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": "tst.activity",
              "name": "usertocont",
              "authorization": [
                {
                  "actor": SENDER_ACCOUNT_NAME,
                  "permission": "active"
                }
              ],
              "data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f696401"
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSampleTransactionUserUnfollowsOrganization() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_net_usage_words": 0,
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": "tst.activity",
              "name": "usertocont",
              "authorization": [
                {
                  "actor": SENDER_ACCOUNT_NAME,
                  "permission": "active"
                }
              ],
              "data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f696405"
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSampleTransactionForMediaPost() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_net_usage_words": 0,
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": "tst.activity",
              "name": "makecontorg",
              "authorization": [
                {
                  "actor": SENDER_ACCOUNT_NAME,
                  "permission": "active"
                }
              ],
              "data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f69641973616d706c655f706f73745f626c6f636b636861696e5f69640100"
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }
  static getSampleTransactionForPostOffer() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_net_usage_words": 0,
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": "tst.activity",
              "name": "makecontorg",
              "authorization": [
                {
                  "actor": SENDER_ACCOUNT_NAME,
                  "permission": "active"
                }
              ],
              "data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f69641973616d706c655f706f73745f626c6f636b636861696e5f69640200"
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSamplePushResultForMediaPost() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 20
          },
          "net_usage": 160,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": "tst.activity",
                "act_digest": "9124fa0b78fae922fa7bec56e58f92cdd394858ece3cedb1f54644d3eb1eb878",
                "code_sequence": 5,
                "abi_sequence": 5
              },
              "act": {
                "account": "tst.activity",
                "name": "makecontorg",
                "authorization": [
                  {
                    "actor": SENDER_ACCOUNT_NAME,
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": SENDER_ACCOUNT_NAME,
                  "content_id": "sample_post_blockchain_id",
                  "content_type_id": 1,
                  "parent_content_id": "",
                },
                "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f69641973616d706c655f706f73745f626c6f636b636861696e5f69640100"
              },
              "cpu_usage": 0,
              "console": `makecontent acc = ${SENDER_ACCOUNT_NAME}organization_id = sample_org_blockchain_id content_id = sample_post_blockchain_id content_type_id = 1 parent_content_id = `,
              "total_cpu_usage": 0,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }

  static getSamplePushResultForUserFollowsOrg() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 16
          },
          "net_usage": 128,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": "tst.activity",
                "act_digest": "80a7e0a91fd33f802dd7cbcb4f0e0fc040b29b9144121aa90ab808ea3506e4fa",
                "code_sequence": 5,
                "abi_sequence": 5
              },
              "act": {
                "account": "tst.activity",
                "name": "usertocont",
                "authorization": [
                  {
                    "actor": SENDER_ACCOUNT_NAME,
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": SENDER_ACCOUNT_NAME,
                  "content_id": "sample_org_blockchain_id",
                },
                "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f696401"
              },
              "cpu_usage": 0,
              "console": `usertocont acc = ${SENDER_ACCOUNT_NAME} content_id = sample_org_blockchain_id interaction_type_id = 1`,
              "total_cpu_usage": 0,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }

  static getSamplePushResultForUserUnfollowsOrg() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 16
          },
          "net_usage": 128,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": "tst.activity",
                "act_digest": "396370df540759c63fe4fc19eb7ae9be9f430870b50e65d8217d376cc68bd937",
                "code_sequence": 5,
                "abi_sequence": 5
              },
              "act": {
                "account": "tst.activity",
                "name": "usertocont",
                "authorization": [
                  {
                    "actor": SENDER_ACCOUNT_NAME,
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": SENDER_ACCOUNT_NAME,
                  "content_id": "sample_org_blockchain_id",
                },
                "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f696405"
              },
              "cpu_usage": 0,
              "console": `usertocont acc = ${SENDER_ACCOUNT_NAME} content_id = sample_org_blockchain_id interaction_type_id = 5`,
              "total_cpu_usage": 0,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultForPostOffer() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 20
          },
          "net_usage": 160,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": "tst.activity",
                "act_digest": "527de82903144acb0744268e9f17cfb7e5bfd3e30764001978838533c6e220d9",
                "code_sequence": 5,
                "abi_sequence": 5
              },
              "act": {
                "account": "tst.activity",
                "name": "makecontorg",
                "authorization": [
                  {
                    "actor": SENDER_ACCOUNT_NAME,
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": SENDER_ACCOUNT_NAME,
                  "content_id": "sample_post_blockchain_id",
                  "content_type_id": 2,
                  "parent_content_id": "",
                },
                "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f69641973616d706c655f706f73745f626c6f636b636861696e5f69640200"
              },
              "cpu_usage": 0,
              "console": `makecontent acc = ${SENDER_ACCOUNT_NAME}organization_id = sample_org_blockchain_id content_id = sample_post_blockchain_id content_type_id = 2 parent_content_id = `,
              "total_cpu_usage": 0,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
}

module.exports = TransactionsHelper;