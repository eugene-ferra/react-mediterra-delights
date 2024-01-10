import * as cheerio from "cheerio";

export default function addLinksToMarkup(req, doc, field) {
  const port = process.env.PORT || 3000;
  const linkBegin = `${req.protocol}://${req.hostname}:${port}`;

  const $ = cheerio.load(doc[field]);
  $("img").each((index, element) => {
    element.attribs.src = `${linkBegin}/${element.attribs.src.replace(/\\/g, "/")}`;

    element.attribs.srcset = element.attribs?.srcset
      ?.split(", ")
      ?.map((img) => {
        if (img.startsWith("http")) {
          return img;
        } else {
          return `${linkBegin}/${img.replace(/\\/g, "/")}`;
        }
      })
      ?.join(", ");
  });

  doc[field] = $.html($("article"));

  return doc;
}
