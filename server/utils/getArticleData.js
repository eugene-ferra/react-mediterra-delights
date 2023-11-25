export const getArticleData = (req) => {
  return {
    title: req.body.title,
    topic: req.body.topic,
    markup: req.body.markup,
    previewText: req.body.previewText,
  };
};
