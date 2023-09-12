const buildBasicTheme = () => ({
  colors: {
    primary: '#06AE72',
  },
  font: 'Questrial, sans-serif',
  lists: {
    row: {
      startInset: 12,
      endInset: 12,
      tileSpacing: 4,
    },
  },
});

export default {
  light: buildBasicTheme(),
  dark: buildBasicTheme(),
};
