import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LoginFormView } from './modules/Authentication';
import { ToDoListView } from './modules/ToDoList';

function App() {
  useEffect(() => {
    // check authentication
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <LoginFormView />
      <ToDoListView />
    </div>
  );
}

export default App;
