import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
