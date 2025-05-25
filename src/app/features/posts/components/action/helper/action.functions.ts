export function generateUniqueId(existingIds: Set<string | number>): string {
  let id: string;
  do {
    id = Math.floor(100000000 + Math.random() * 900000000).toString();
  } while (existingIds.has(id));
  return id;
}
