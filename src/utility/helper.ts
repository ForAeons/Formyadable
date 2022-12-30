export const BACKEND_URL = "https://cvwo-rails-backend.herokuapp.com/";

export function categoryConvertor(cat: string): string {
  return cat.toLowerCase().replaceAll(" ", "_");
}
