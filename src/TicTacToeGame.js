import React from 'react';

class TicTacToeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      player: 'X',
      winner: null,
    };
  }

  handleClick(index) {
    if (this.state.winner) return;
    if (this.state.board[index]) return;

    let newBoard = this.state.board.slice();
    newBoard[index] = this.state.player;
    this.setState({
      board: newBoard,
      player: this.state.player === 'X' ? 'O' : 'X',
    });
    this.checkForWinner();
  }

  checkForWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        this.state.board[a] &&
        this.state.board[a] === this.state.board[b] &&
        this.state.board[a] === this.state.board[c]
      ) {
        this.setState({
          winner: this.state.player,
        });
      }
    }
  }

  render() {
    const squares = this.state.board.map((square, index) => (
      <div
        key={index}
        onClick={() => this.handleClick(index)}
        className="square"
      >
        {square}
      </div>
    ));

    let status;
    if (this.state.winner) {
      status = `Winner: ${this.state.winner}`;
    } else {
      status = `Next player: ${this.state.player}`;
    }

    return (
      <div className="game">
        <div className="board">{squares}</div>
        <div className="status">{status}</div>
      </div>
    );
  }
}

export default TicTacToeGame;