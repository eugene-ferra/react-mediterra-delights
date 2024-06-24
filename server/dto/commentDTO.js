export default class CommentDTO {
  constructor(responseComment) {
    this.id = responseComment._id;
    this.articleID = responseComment.articleID;
    this.userID = responseComment.userID;
    this.createdAt = responseComment.createdAt;
    this.comment = responseComment.comment;
    this.isModerated = responseComment.isModerated;
  }
}
