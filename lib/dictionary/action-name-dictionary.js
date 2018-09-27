const ACTION__USER_TO_USER = 'usertouser';
const ACTION__MAKE_CONTENT = 'makecontent';
const ACTION__ORGANIZATION_MAKES_CONTENT = 'makecontorg';

class ActionNameDictionary {
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
}

module.exports = ActionNameDictionary;