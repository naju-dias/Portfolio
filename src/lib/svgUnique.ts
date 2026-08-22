function sanitizeSeed(seed: string): string {
  return seed
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // troca tudo que não é letra/número por hífen
    .replace(/-+/g, "-")        // colapsa hífens repetidos
    .replace(/^-|-$/g, "");     // remove hífen do início/fim
}

export function makeSvgIdsUnique(svgString: string, seed: string): string {
  const uid = `s-${sanitizeSeed(seed)}`;
  const ids = new Set<string>();

  const idRegex = /id="([^"]+)"/g;
  let match;
  while ((match = idRegex.exec(svgString)) !== null) {
    ids.add(match[1]);
  }

  let result = svgString;
  ids.forEach((id) => {
    const uniqueId = `${uid}-${id}`;
    result = result.replaceAll(`id="${id}"`, `id="${uniqueId}"`);
    result = result.replaceAll(`#${id})`, `#${uniqueId})`);
    result = result.replaceAll(`#${id}"`, `#${uniqueId}"`);
  });

  return result;
}