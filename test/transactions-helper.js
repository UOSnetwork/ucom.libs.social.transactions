const config = require('../config/default.json');
const accountsData = require('../../secrets/accounts-data');

const { TransactionFactory, TransactionSender } = require('../index');

class TransactionsHelper {
  static initByNodeEnv() {
    switch(process.env.NODE_ENV) {
      case 'test':
        TransactionFactory.initForTestEnv();
        TransactionSender.initForTestEnv();
        break;
      case 'staging':
        TransactionFactory.initForStagingEnv();
        TransactionSender.initForStagingEnv();
        break;
      case 'production':
        TransactionFactory.initForProductionEnv();
        TransactionSender.initForProductionEnv();
        break;
      default:
        throw new TypeError(`Unsupported env: ${process.env.NODE_ENV}`);
    }
  }

  /**
   *
   * @return {string}
   */
  static getSenderAccountName() {
    if (process.env.NODE_ENV === 'production') {
      return accountsData.summerknight.account_name;
    }

    return accountsData.staging_autotester.account_name
  }

  static getRecipientAccountName() {
    if (process.env.NODE_ENV === 'production') {
      return accountsData.autumnknight.account_name;
    }

    return accountsData.jane.account_name
  }

  /**
   *
   * @return {string}
   */
  static getSenderActivePrivateKey() {
    if (process.env.NODE_ENV === 'production') {
      return accountsData.summerknight.activePk;
    }

    return accountsData.staging_autotester.activePk
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "usertouser",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc_from": this.getSenderAccountName(),
                  "acc_to": this.getRecipientAccountName(),
                  "interaction_type_id": 1
                },
              },
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
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "usertouser",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
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
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontent",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontent",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_blockchain_id",
                  "content_type_id": 4,
                  "parent_content_id": "",
                },
                // "hex_data": "00c05519ab4cb3361473616d706c655f626c6f636b636861696e5f69640400"
              },
              // "console": `makecontent acc = ${this.getSenderAccountName()} content_id = sample_blockchain_id content_type_id = 4 parent_content_id = `,
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
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "usertocont",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
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
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "usertocont",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }
  static getSampleUserUpvotesContent() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "usertocont",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSampleUserCreatesDirectPostOnOtherUserPost() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "usertocont",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSampleUserCreatesDirectPostOnOrg() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "dirpostorg",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }
  static getSampleUserCreatesDirectPostOnOtherUser() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "dirpost",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }
  static getSampleUserDownvotesContent() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "usertocont",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
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
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontorg",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }
  static getSampleTransactionUserHimselfCreatesMediaPost() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontent",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSmartContractByEnv() {
    switch(process.env.NODE_ENV) {
      case 'test':
        return config.eos_config.test_smart_contract;
      case 'staging':
        return config.eos_config.staging_smart_contract;
      case 'production':
        return config.eos_config.staging_smart_contract;
      default:
        throw new TypeError(`Unsupported env: ${process.env.NODE_ENV}`);
    }
  }

  static getSampleTransactionUserCreatesRepostForOtherPost() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontent",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
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
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontorg",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }
  static getSampleTransactionUserHimselfCreatesPostOffer() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontent",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }
  static getSampleTransactionForOrgCreatesCommentOnPost() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontorg",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSampleTransactionForUserHimselfCreatesCommentOnPost() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontent",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSampleTransactionForOrgCreatesCommentOnComment() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontorg",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
            }
          ],
          "transaction_extensions": []
        },
      }
    }
  }

  static getSampleTransactionForUserHimselfCreatesCommentOnComment() {
    return {
      "broadcast": false,
      "transaction": {
        "compression": "none",
        "transaction": {
          "max_cpu_usage_ms": 0,
          "delay_sec": 0,
          "context_free_actions": [],
          "actions": [
            {
              "account": this.getSmartContractByEnv(),
              "name": "makecontent",
              "authorization": [
                {
                  "actor": this.getSenderAccountName(),
                  "permission": "active"
                }
              ],
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontorg",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_post_blockchain_id",
                  "content_type_id": 1,
                  "parent_content_id": "",
                },
                // "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f69641973616d706c655f706f73745f626c6f636b636861696e5f69640100"
              },
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultUserHimselfCreatesMediaPost() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
          },
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontent",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "new_media_post_blockchain_id",
                  "content_type_id": 1,
                  "parent_content_id": "",
                },
              },
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultUserCreatesRepostOfOtherPost() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
          },
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontent",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "new_repost_blockchain_id",
                  "content_type_id": 11,
                  "parent_content_id": "parent_post_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb336186e65775f7265706f73745f626c6f636b636861696e5f69640b19706172656e745f706f73745f626c6f636b636861696e5f6964"
              },
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "usertocont",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_org_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f696401"
              },
              // "console": `usertocont acc = ${this.getSenderAccountName()} content_id = sample_org_blockchain_id interaction_type_id = 1`,
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "usertocont",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_org_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f696405"
              },
              // "console": `usertocont acc = ${this.getSenderAccountName()} content_id = sample_org_blockchain_id interaction_type_id = 5`,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultForUserUpvotesContent() {
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "usertocont",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb3361473616d706c655f626c6f636b636861696e5f696402"
              },
              // "console": `usertocont acc = autotester content_id = sample_blockchain_id interaction_type_id = 2`,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }

  static getSamplePushResultForUserCreatesDirectPostOnOrg() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 21
          },
          "net_usage": 168,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "dirpostorg",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_content_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb3361c73616d706c655f636f6e74656e745f626c6f636b636861696e5f69642173616d706c655f6f7267616e697a6174696f6e5f626c6f636b636861696e5f69640a"
              },
              // "console": `dirpostorg acc = autotester content_id = sample_content_blockchain_id organization_to_id = sample_organization_blockchain_id content_type_id = 10`,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }

  static getSamplePushResultForUserCreatesDirectPostOnOtherUser() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 17
          },
          "net_usage": 136,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "dirpost",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb3361473616d706c655f626c6f636b636861696e5f696490a7a6089958a5c10a"
              },
              // "console": `dirpost acc = autotester content_id = sample_blockchain_id acc_to = samplaccount content_type_id = 10`,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultForUserDownvotesContent() {
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "usertocont",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb3361473616d706c655f626c6f636b636861696e5f696404"
              },
              // "console": `usertocont acc = autotester content_id = sample_blockchain_id interaction_type_id = 4`,
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
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontorg",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_post_blockchain_id",
                  "content_type_id": 2,
                  "parent_content_id": "",
                },
                // "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f69641973616d706c655f706f73745f626c6f636b636861696e5f69640200"
              },
              // "console": `makecontent acc = ${this.getSenderAccountName()}organization_id = sample_org_blockchain_id content_id = sample_post_blockchain_id content_type_id = 2 parent_content_id = `,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultUserHimselfCreatesPostOffer() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
          },
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontent",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "new_post_offer_blockchain_id",
                  "content_type_id": 2,
                  "parent_content_id": "",
                },
                // "hex_data": "00c05519ab4cb3361c6e65775f706f73745f6f666665725f626c6f636b636861696e5f69640200"
              },
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultForOrgCreatesCommentOnPost() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
          },
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontorg",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_new_comment_blockchain_id",
                  "content_type_id": 3,
                  "parent_content_id": "sample_parent_post_blockchain_id",
                },
              },
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }

  static getSamplePushResultForUserHimselfCreatesCommentOnPost() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
          },
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontent",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_new_comment_blockchain_id",
                  "content_type_id": 3,
                  "parent_content_id": "sample_parent_post_blockchain_blockchain_id",
                },
              },
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultForOrgCreatesCommentOnComment() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
            "net_usage_words": 25
          },
          "net_usage": 200,
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontorg",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_new_comment_blockchain_id",
                  "content_type_id": 3,
                  "parent_content_id": "sample_parent_comment_blockchain_id",
                },
                // "hex_data": "00c05519ab4cb3361873616d706c655f6f72675f626c6f636b636861696e5f69642073616d706c655f6e65775f636f6d6d656e745f626c6f636b636861696e5f6964032373616d706c655f706172656e745f636f6d6d656e745f626c6f636b636861696e5f6964"
              },
              // "console": `makecontent acc = ${this.getSenderAccountName()}organization_id = sample_org_blockchain_id content_id = sample_new_comment_blockchain_id content_type_id = 3 parent_content_id = sample_parent_comment_blockchain_id`,
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
  static getSamplePushResultForUserHimselfCreatesCommentOnComment() {
    return {
        "processed": {
          "receipt": {
            "status": "executed",
          },
          "scheduled": false,
          "action_traces": [
            {
              "receipt": {
                "receiver": this.getSmartContractByEnv(),
              },
              "act": {
                "account": this.getSmartContractByEnv(),
                "name": "makecontent",
                "authorization": [
                  {
                    "actor": this.getSenderAccountName(),
                    "permission": "active"
                  }
                ],
                "data": {
                  "acc": this.getSenderAccountName(),
                  "content_id": "sample_new_comment_blockchain_id",
                  "content_type_id": 3,
                  "parent_content_id": "sample_parent_comment_blockchain_id",
                },
              },
              "inline_traces": []
            }
          ],
          "except": null
        }
      }
  }
}

module.exports = TransactionsHelper;
