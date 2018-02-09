import React, { Component } from 'react';
import GameComponent from './components/game.component/game.component';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
      <GameComponent/>
      </div>
    );
  }
}

export default App;
