export const getInitials = (name: string): string => {
  const words = name.split(" ");
  return words
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
};
