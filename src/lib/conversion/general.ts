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