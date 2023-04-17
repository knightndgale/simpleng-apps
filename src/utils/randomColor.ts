function randomColor(): string {
  const minBrightness = 40;
  const color = `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(
    Math.random() * 100
  )}%, ${Math.floor(Math.random() * (100 - minBrightness) + minBrightness)}%)`;
  return color;
}

export default randomColor;
