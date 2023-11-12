export class CommentDTO {
  id;
  articleID;
  userID;
  createdAt;
  comment;
  isModerated;

  constructor(responseComment) {
    this.id = responseComment._id;
    this.articleID = responseComment.articleID;
    this.userID = responseComment.userID;
    this.createdAt = responseComment.createdAt;
    this.comment = responseComment.comment;
    this.isModerated = responseComment.isModerated;
  }
}
