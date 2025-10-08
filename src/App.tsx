
import { Provider } from 'react-redux';
import Navigation from './Navigation';
import store from './store';
import GlobalModal from './shared/components/modal/globalModal/GlobalModal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';
import { theme } from './shared/themes/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalModal />
          <Navigation />
          </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;