/**
 * Takes in a string in title case and converts it to snake case
 * @param cat
 * @returns string
 */

export function snakeCase(cat: string): string {
  return cat.toLowerCase().replaceAll(" ", "_");
}

/**
 * Takes in a string in snake case and converts it to title case
 * @param cat
 * @returns string
 */

export function titleCase(cat: string): string {
  return cat
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
