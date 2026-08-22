let uidCounter = 0;

export function makeSvgIdsUnique(svgString: string): string {
  const uid = `s${uidCounter++}`;
  const ids = new Set<string>();

  // encontra todos os id declarados no svg
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