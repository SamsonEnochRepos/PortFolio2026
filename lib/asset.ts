/** Prefix a /public path with the GitHub Pages base path (empty in local dev). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
