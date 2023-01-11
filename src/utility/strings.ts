export function snakeCase(cat: string): string {
  return cat.toLowerCase().replaceAll(" ", "_");
}

export function titleCase(cat: string): string {
  return cat
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
