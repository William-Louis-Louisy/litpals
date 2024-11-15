// Capitalize the first letter of a string
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert a string to Title Case
export const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};
