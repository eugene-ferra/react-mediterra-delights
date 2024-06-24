const getArticleData = (req) => ({
  title: req.body.title,
  topic: req.body.topic,
  markup: req.body.markup,
  previewText: req.body.previewText,
});

export default getArticleData;
