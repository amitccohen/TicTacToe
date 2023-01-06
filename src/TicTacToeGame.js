import React, { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const winningCombinations = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] !== null || winner !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (board.every((square) => square !== null) && winner === null) {
        setWinner('Tie');
      }

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(currentPlayer);
        return;
      }
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    if (board.every((square) => square !== null) && winner === null) {
        setWinner('Tie');
      }
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index] === 'X' ? (
            <div className="x">X</div>
            ) : board[index] === 'O' ? (
            <div className="o">O</div>
            ) : null}
      </button>
    );
  };

  return (
    <div>
      {winner !== null ? (
        <div>
          <div className="winner">{winner === 'Tie' ? 'It\'s a tie!' : `${winner} has won!`}</div>
          <button className="play-again" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <div>
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;