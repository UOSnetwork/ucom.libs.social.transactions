const ACTION__USER_TO_USER                = 'usertouser';
const ACTION__MAKE_CONTENT                = 'makecontent';
const ACTION__ORGANIZATION_MAKES_CONTENT  = 'makecontorg';
const ACTION__CONTENT_INTERACTION         = 'usertocont';

const ACTION__DIRECT_POST_CREATION_FOR_USER = 'dirpost';
const ACTION__DIRECT_POST_CREATION_FOR_ORG  = 'dirpostorg';

class ActionNameDictionary {
  /**
   *
   * @return {string}
   */
  static getDirectPostCreationForUser() {
    return ACTION__DIRECT_POST_CREATION_FOR_USER;
  }
  /**
   *
   * @return {string}
   */
  static getDirectPostCreationForOrg() {
    return ACTION__DIRECT_POST_CREATION_FOR_ORG;
  }
  /**
   *
   * @return {string}
   */
  static getUserToUser() {
    return ACTION__USER_TO_USER;
  }

  /**
   *
   * @return {string}
   */
  static getMakeContent() {
    return ACTION__MAKE_CONTENT;
  }

  /**
   *
   * @return {string}
   */
  static getOrganizationMakesContent() {
    return ACTION__ORGANIZATION_MAKES_CONTENT;
  }

  /**
   *
   * @return {string}
   */
  static getUserToContent() {
    return ACTION__CONTENT_INTERACTION;
  }
}

module.exports = ActionNameDictionary;