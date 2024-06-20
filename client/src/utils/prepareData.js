export function prepareData(obj) {
  // if (typeof obj === "string") {
  //   return obj.trim();
  // }

  // if (Array.isArray(obj)) {
  //   return obj.map((item) => prepareData(item));
  // }

  // if (
  //   typeof obj === "object" &&
  //   obj !== null &&
  //   !(obj instanceof File) &&
  //   !(obj instanceof Blob)
  // ) {
  //   const trimmedObj = {};
  //   for (let key in obj) {
  //     trimmedObj[key] = prepareData(obj[key]);
  //   }
  //   return trimmedObj;
  // }

  return obj;
}
