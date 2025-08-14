import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [board, setBoard] = useState([['','',''], ['','',''], ['','','']]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBoard();
  }, []);
  
  const fetchBoard = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/game/board');
      console.log('API Response: ', response.data);
      setBoard(response.data);
    } catch (error) {
      console.log('エラー: ボード取得失敗', error);
      setMessage('ボードの読み込みに失敗しました');
    }
  };
  const handleClick = async (row, col) => {
    console.log('handleClick: ', row, col);
    try {
      const response = await axios.post(`http://localhost:8081/api/game/move?row=${row}&col=${col}`);
      setMessage(response.data);
      fetchBoard();
    } catch (error) {
      console.log('エラー: 手番失敗', error);
      setMessage('手番に失敗しました');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>○×ゲーム</h1>
      <div className="message">{message}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '5px',
          margin: '20px auto',
          width: 'fit-content',
        }}
      >
        {board.map((row, i) => 
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
              style={{
                width: '100px',
                height: '100px',
                fontSize: '2em',
                border: '2px solid #333',
                backgrand: cell ? (cell === 'X' ? '#ffcccc' : '#ccffcc'): '#fff',
                cursor: cell ? 'default' : 'pointer',
              }}
              disabled={cell !== ''}
            >
              {cell}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
