import React, { Component } from 'react';
import BoardComponent from '../board.component/board.component';
import styles from './game.component.css';

class GameComponent extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <BoardComponent />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  export default GameComponent;