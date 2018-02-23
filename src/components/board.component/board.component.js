import React, { Component } from 'react';
import boardStyles from './board.component.css';
import squareStyles from '../square.component/square.component.css';

function SquareComponent(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class BoardComponent extends React.Component {
    renderSquare(i) {
      return (
      <SquareComponent
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}/>
      );
    }
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  export default BoardComponent;