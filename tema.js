import { DefaultTheme } from 'react-native-paper';

const customTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#155DFC',        // azul usado nos botões e status
    accent: '#AE0F0A',          // vermelho do botão de login
    background: '#FFFFFF',      // fundo branco da tela
    surface: '#F2EEF8',         // cor de fundo dos cards
    text: '#000000',            // texto padrão
    placeholder: '#999999',     // texto de placeholder em inputs
    disabled: '#E0E0E0',        // inputs desabilitados
    notification: '#F44336',    // alerta, por ex. status Negado
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
};

export default customTheme;
