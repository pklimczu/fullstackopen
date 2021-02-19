import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBar: '#24292e',
      appBarText: '#dee1e3',
      background: '#e6e6e6',
      backgroundContainer: '#fafafa',
      backgroundLanguage: '#0366d6',
      borderColor: '#b9b9b9',
      errorColor: '#d73a4a',
    },
    fontSizes: {
      body: 15,
      subheading: 18,
      small: 13
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
    }),
  },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;