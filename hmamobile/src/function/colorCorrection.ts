function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3)
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  const int = parseInt(hex, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function rgbToHex({ r, g, b }) {
  const toHex = v => v.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function blendWithWhite(hex, t) {
  const { r, g, b } = hexToRgb(hex);
  const mix = v => Math.round(v + (255 - v) * t);
  return rgbToHex({ r: mix(r), g: mix(g), b: mix(b) });
}
