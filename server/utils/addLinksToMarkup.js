import * as cheerio from "cheerio";

export default function addLinksToMarkup(req, doc, field) {
  const port = process.env.PORT || 3000;
  const linkBegin = `${req.protocol}://${req.hostname}:${port}/`;

  const $ = cheerio.load(doc[field]);
  $("img").each((index, element) => {
    element.attribs.src = `${element.attribs.src.replace(/\\/g, "/")}`;
    const oldBegin = element.attribs.src.split("articles")[0];
    element.attribs.src = element.attribs.src.replace(oldBegin, linkBegin);
  });

  doc[field] = $.html();

  return doc;
}
