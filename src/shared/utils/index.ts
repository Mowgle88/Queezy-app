export * from "./auth/index";
export * from "./user/index";
export * from "./date/index";

export const getSourcePath = (title: string) => {
  switch (title) {
    case "Art":
      return require("../../assets/categories/Icon-Art.png");
    case "Math":
      return require("../../assets/categories/Icon-Math.png");
    case "Science":
      return require("../../assets/categories/Icon-Science.png");
    case "Sport":
      return require("../../assets/categories/Icon-Sport.png");
    case "Music":
      return require("../../assets/categories/Icon-Music.png");
    case "Films":
      return require("../../assets/categories/Icon-Films.png");
    case "Travel":
      return require("../../assets/categories/Icon-Travel.png");
    case "History":
      return require("../../assets/categories/Icon-History.png");
    case "Multiple":
      return require("../../assets/categories/Icon-Multiple.png");
    case "TrueOrFalse":
      return require("../../assets/categories/Icon-TrueOrFalse.png");
    case "TypeAnswer":
      return require("../../assets/categories/Icon-TypeAnswer.png");
    case "Checkbox":
      return require("../../assets/categories/Icon-Checkbox.png");
  }
};

export const shuffle = <Type>(array: Type[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
