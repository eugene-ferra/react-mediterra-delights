export function prettyTime(dateStr) {
  return new Date(dateStr).toLocaleString("uk-UA", {
    timeZone: "Etc/Greenwich",
  });
}
