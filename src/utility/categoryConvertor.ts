import { category } from "../types/type";

export default function catergoryConvertor(cat: category): string {
  return cat.toLowerCase().replaceAll(" ", "_");
}
