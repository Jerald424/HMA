// utils/color.ts
export const withOpacity = (hexColor: string, opacity: number) => {
  // Ensure opacity is between 0 and 1
  const alpha = Math.min(Math.max(opacity, 0), 1);

  // Convert hex → rgba
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
