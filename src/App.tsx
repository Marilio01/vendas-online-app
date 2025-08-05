
import { Provider } from 'react-redux';

import Navigation from './Navigation';

import store from './store';
import GlobalModal from './shared/components/modal/globalModal/GlobalModal';




const App = () => {
  return (
    <Provider store={store}>
      <GlobalModal />
      <Navigation />
    </Provider>
  );
};

export default App;