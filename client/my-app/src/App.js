import logo from './logo.svg';
import './App.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import './index.css';
import './flags.css';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
