import React from 'react';
// 何かを「記憶」するために、コンポーネントは state というものを使用
import { useState } from 'react';

// props を通してデータを渡す

// state のリフトアップ　を行う（引用　https://ja.react.dev/learn/tutorial-tic-tac-toe）
// 複数の子コンポーネントからデータを収集したい、あるいは 2 つの子コンポーネント同士で通信したい、と思ったら、代わりに親コンポーネントに共有の state を宣言するようにしてください。親コンポーネントはその state を子コンポーネントに prop 経由で渡すことができます。これにより、子同士および親子間で、コンポーネントが同期されるようになります。
// function xxxx( { xxxx } ←ここがprops) {
function Square({ value, onSquareClick }) {
  // onSquareClick 関数を Square コンポーネントの props に追加
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/**
 *  ユーザが盤面の左上のマス目をクリックして X を置いた場合を例に、何が起こるのか
 *  1. 左上のマス目をクリックすると、button が props として受け取った onClick 関数が実行されます。Square コンポーネントはその関数を Board から onSquareClick プロパティとして受け取っています。Board コンポーネントはその関数を JSX の中で直接定義しています。その関数は引数 0 で handleClick を呼び出します。
 *  2. handleClick は引数 0 を使って、squares 配列の最初の要素を null から X に更新します。
 *  3. Board コンポーネントの state である squares が更新されたので、Board とそのすべての子が再レンダーされます。これにより、インデックス 0 である Square コンポーネントの value プロパティが null から X に変更されます。
*/

export default function Board() {

  const [xIsNext, setXIsNext] = useState(true);
  // どちらのプレーヤの手番なのかを決める xIsNext

  const [squares, setSquares] = useState(Array(9).fill(null));
  // 「squares」     現在のstateの値を保持
  // 「setSquares」　「squares」の値を更新するのに使用する関数

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 4, 6] //urawaza
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}