export function generateUniqueId(existingIds: Set<string | number>): string {
  let id: string;
  do {
    id = Math.floor(100000000 + Math.random() * 900000000).toString();
  } while (existingIds.has(id));
  return id;
}

export function formatDateForInput(dateString: string): string {
  try {
    let date: Date;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.warn('Invalid date format:', dateString);
      return new Date().toISOString().split('T')[0];
    }

    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Date().toISOString().split('T')[0];
  }
}
