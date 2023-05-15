
export const transformCDepToSenatTitle = (title: string): string => {
  // Remove any spaces or hyphens from the string
  let cleanedString = title.replace(/[\s-]/g, '');

  // Convert any lowercase letters to uppercase
  cleanedString = cleanedString.toUpperCase();

  // Replace the dot with an empty string and remove the "nr." substring
  cleanedString = cleanedString.replace(/\./g, '').replace('NR', '');

  return cleanedString;
}


export const transformSenatToCdepTitle = (title: string, lowercase = true): string => {
  // Replace the "X" character with a dot and "nr."
  let transformedString = title.replace('X', '-x nr. ');
  if (lowercase) {
    transformedString = transformedString.replace('L', 'l');
  }

  // Return the final transformed string
  return transformedString;
}