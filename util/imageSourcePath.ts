export function getSourcePath(title: string) {
  switch (title) {
    case 'Art':
      return require('../assets/categories/Icon-Art.png');
    case 'Math':
      return require('../assets/categories/Icon-Math.png');
    case 'Science':
      return require('../assets/categories/Icon-Science.png');
    case 'Sport':
      return require('../assets/categories/Icon-Sport.png');
    case 'Music':
      return require('../assets/categories/Icon-Music.png');
    case 'Tech':
      return require('../assets/categories/Icon-Tech.png');
    case 'Travel':
      return require('../assets/categories/Icon-Travel.png');
    case 'History':
      return require('../assets/categories/Icon-History.png');
    case 'Multiple':
      return require('../assets/categories/Icon-Multiple.png');
    case 'TrueOfFalse':
      return require('../assets/categories/Icon-TrueOfFalse.png');
    case 'TypeAnswer':
      return require('../assets/categories/Icon-TypeAnswer.png');
    case 'Checkbox':
      return require('../assets/categories/Icon-Checkbox.png');
  }
}