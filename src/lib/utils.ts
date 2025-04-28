export const slugify = (s: string): string => {
  return s ? s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') : "";
}

export const extractMotoIdsFromPathname = (path: string): string[] => {
  const regex = /-(\d+)(?=_vs_|$)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(path)) !== null) {
      matches.push(match[1]);
  }
  return matches;
}