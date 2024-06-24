export default class ArticleDTO {
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
    this.viewsArr =
      responseArticle.viewsArr.lenght > 0
        ? responseArticle.viewsArr.map((item) => ({
            ip: item.ip || null,
            userAgent: item.userAgent || null,
          }))
        : [];
    this.markup = responseArticle.markup;
    this.previewText = responseArticle.previewText;
    this.fullText = responseArticle.fullText;
  }
}
