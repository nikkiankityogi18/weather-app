export const generateTemperatureColor = (
  temperature,
  minTemperature,
  maxTemperature
) => {
  const red = [255, 0, 0];
  const blue = [0, 0, 255];

  const normalizedTemperature =
    (temperature - minTemperature) / (maxTemperature - minTemperature);

  const rgb = [
    Math.round(red[0] + (blue[0] - red[0]) * normalizedTemperature),
    Math.round(red[1] + (blue[1] - red[1]) * normalizedTemperature),
    Math.round(red[2] + (blue[2] - red[2]) * normalizedTemperature),
  ];

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};
