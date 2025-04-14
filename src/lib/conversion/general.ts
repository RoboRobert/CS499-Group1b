export function toTeamID(input: string): string {
    return input
      .toLowerCase()                   // Convert the string to lowercase
      .replace(/\s+/g, '')             // Remove all spaces
      .replace(/[^\w\d]/g, '');        // Remove all punctuation (anything that's not a letter or digit)
}

export function toPlayerID(name: string, playerno: number, team_id: string): string {
  const cleanName: string = name
    .toLowerCase()                   // Convert the string to lowercase
    .replace(/\s+/g, '')             // Remove all spaces
    .replace(/[^\w\d]/g, '');        // Remove all punctuation (anything that's not a letter or digit)

  return `${team_id}-${cleanName}-${playerno}`;
}

export function themeToBool(theme: string): boolean {
  if(theme === "dark") {
    return true;
  }

  return false;
}

export function convertTo12Hour(time24: string): string {
  const [hourStr, minuteStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12; // Handle midnight (0) and noon (12)

  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}