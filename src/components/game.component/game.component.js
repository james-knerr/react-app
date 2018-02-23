import React, { Component } from 'react';
import { FaRotateLeft, FaRepeat } from 'react-icons/lib/fa';
import BoardComponent from '../board.component/board.component';
import { calculateWinner } from '../../helper.functions';
import styles from './game.component.css';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  restartGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Current Move: Player ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let canUndo;
    if (history.length >= 1 && this.state.stepNumber > 0) {
      canUndo = true;
    } else {
      canUndo = false;
    }

    let canRedo;
    if (history.length > 1 && this.state.stepNumber < (history.length - 1)) {
      canRedo = true;
    } else {
      canRedo = false;
    }

    return (
      <div className="game">
      <div className="game-info"></div>
        {/*<div className={this.state.xIsNext ? "game-info active" : "game-info"}>
        <div className="player-header active">Player X</div>
        <ol>{moves}</ol>
      </div>*/}
        <div className="game-container">
          <div className="game-status">
            {status}
            <div className="game-buttons">
              <button className="raised-button" onClick={() => this.restartGame()}>Restart</button>
              <span>
                <div>
                  <Tooltip
                    title="Undo"
                    position="bottom"
                    animation="scale"
                    size="small"
                    distance="18"
                  > <button style={{ display: (canUndo ? "inline-block" : "none") }} className="icon-button sm" onClick={() => this.jumpTo(this.state.stepNumber - 1)}><FaRotateLeft /></button>
                  </Tooltip>
                  <Tooltip title="Redo"
                    position="bottom"
                    animation="scale"
                    size="small"
                    distance="18">
                    <button style={{ display: (canRedo ? "inline-block" : "none") }} className="icon-button sm" onClick={() => this.jumpTo(this.state.stepNumber + 1)}><FaRepeat /></button>
                  </Tooltip>
                </div>
              </span>
            </div>
          </div>
          <div className="game-board">
            <BoardComponent
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
        <div className="game-info"></div>
        {/*
          <div  className={this.state.xIsNext ? "game-info" : "game-info active"}>
          <div className="player-header">Player O</div>
          <ol>{moves}</ol>
          </div>*/}
      </div>
    );
  }
}
export default GameComponent;