export function categoryConvertor(cat: string): string {
  return cat.toLowerCase().replaceAll(" ", "_");
}

export function categoryNormaliser(cat: string): string {
  return cat
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
