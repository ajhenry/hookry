import { colord, extend } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import randomColor from "randomcolor";

extend([harmoniesPlugin]);

export const generateColorPalette = () => {
  const baseColor = randomColor({
    luminosity: "light",
  });

  const similar =
    Math.random() > 0.5
      ? colord(baseColor).darken(0.1).toHex()
      : colord(baseColor).lighten(0.1).toHex();

  return [baseColor, similar];
};
