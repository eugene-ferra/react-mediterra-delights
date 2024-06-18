import { CommentDTO } from "./commentDTO.js";

export class ArticleDTO {
  id;
  title;
  slug;
  topic;
  imgCover;
  createdAt;
  likes;
  views;
  viewsArr;
  markup;
  previewText;
  comments;

  constructor(responseArticle) {
    this.id = responseArticle._id;
    this.title = responseArticle.title;
    this.slug = responseArticle.slug;
    this.topic = responseArticle.topic;
    this.imgCover = {
      jpg: responseArticle.imgCover.jpg,
      webp: responseArticle.imgCover.webp,
      avif: responseArticle.imgCover.avif,
    };
    this.createdAt = responseArticle.createdAt;
    this.likes = responseArticle.likes;
    this.views = responseArticle.views;
    this.viewsArr = responseArticle.viewsArr
      ? responseArticle.viewsArr.map((item) => {
          return { ip: item.ip || null, userAgent: item.userAgent || null };
        })
      : [];
    this.markup = responseArticle.markup;
    this.previewText = responseArticle.previewText;
  }
}
