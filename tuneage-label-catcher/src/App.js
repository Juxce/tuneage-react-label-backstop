import logo from './assets/juxcedrip.gif';
import './App.css';
import LabelBackstop from './components/LabelBackstop.js';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p />
                <img src={logo} className="App-logo" alt="logo" />
                <p />
                <LabelBackstop />
            </header>
        </div>
    );
}

export default App;
