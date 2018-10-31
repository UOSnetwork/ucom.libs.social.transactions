const TYPE__MEDIA_POST   = 1;
const TYPE__OFFER        = 2;
const TYPE__COMMENT      = 3;
const TYPE__ORGANIZATION = 4;

const TYPE__DIRECT_POST = 10;
const TYPE__REPOST      = 11;

class ContentTypeDictionary {

  /**
   *
   * @return {number}
   */
  static getTypeMediaPost() {
    return TYPE__MEDIA_POST;
  }

  /**
   *
   * @return {number}
   */
  static getTypeDirectPost() {
    return TYPE__DIRECT_POST;
  }

  /**
   *
   * @return {number}
   */
  static getTypeRepost() {
    return TYPE__REPOST;
  }

  /**
   *
   * @return {number}
   */
  static getTypeOffer() {
    return TYPE__OFFER;
  }
  /**
   *
   * @return {number}
   */
  static getTypeComment() {
    return TYPE__COMMENT;
  }
  /**
   *
   * @return {number}
   */
  static getTypeOrganization() {
    return TYPE__ORGANIZATION;
  }
}

module.exports = ContentTypeDictionary;