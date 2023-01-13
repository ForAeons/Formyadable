/**
 * Takes in a username and returns first two starting letter of the username. This is used to display the username as an icon.
 * @param username string
 * @returns string
 */

export default function iconTextGenerator(username: string): string {
  return username
    .split(" ") // split by spacing
    .slice(0, 2) // select the first two names
    .map((name) => name[0].toUpperCase()) // taking the first letter and converting to uppercase
    .join(); // joining them together
}
