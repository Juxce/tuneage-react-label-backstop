import logo from './assets/juxcespinner100.gif';
import './App.css';
import LabelBackstop from './components/LabelBackstop.js';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="display-1">Record Label Backstop</h1>
                <LabelBackstop />
            </header>
        </div>
    );
}

export default App;
