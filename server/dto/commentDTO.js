export default class CommentDTO {
  constructor(responseComment) {
    this.id = responseComment._id;
    this.articleID = responseComment.articleID;
    this.user = {
      id: responseComment.userID._id,
      name: responseComment.userID.name,
      lastName: responseComment.userID.lastName,
      avatar: {
        jpg: responseComment.userID.avatar?.jpg,
        webp: responseComment.userID.avatar?.webp,
        avif: responseComment.userID.avatar?.avif,
      },
    };
    this.createdAt = responseComment.createdAt;
    this.comment = responseComment.comment;
    this.isModerated = responseComment.isModerated;
  }
}
