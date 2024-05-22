export function prettyTime(dateStr, fields = {}) {
  return new Date(dateStr).toLocaleString("uk-UA", {
    timeZone: "Etc/Greenwich",
    ...fields,
  });
}
