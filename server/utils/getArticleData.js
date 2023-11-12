export const getArticleData = (req) => {
  return {
    title: req.body.title,
    topic: req.body.topic,
    imgCover: req.body.imgCover,
    markup: req.body.markup,
    previewText: req.body.previewText,
  };
};
