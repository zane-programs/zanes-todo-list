import React from 'react';
import ToDoList from './components/ToDoList.jsx';
import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <main className="app-main">
        <h1>Zane's To-Do List!</h1>
        <ToDoList />
      </main>
    );
  }
}

export default App;