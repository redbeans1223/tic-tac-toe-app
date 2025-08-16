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
      const response = await axios.get('http://153.127.51.201/api/game/board');
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
      const response = await axios.post(`http://153.127.51.201/api/game/move?row=${row}&col=${col}`);
      setMessage(response.data);
      fetchBoard();
    } catch (error) {
      console.log('エラー: 手番失敗', error);
      setMessage('手番に失敗しました');
    }
  };
  const resetClick = async () => {
    try {
      console.log('リセットボタンがクリックされました');
      
      setBoard([['','',''], ['','',''], ['','','']]);
      const response = await axios.post(`http://153.127.51.201/api/game/reset`);
      console.log('ボードがリセットされました');
      setMessage('');
      fetchBoard();
      console.log('ボードを再取得しました');
    } catch (error) {
      console.log('エラー: リセット失敗', error); 
      setMessage('リセットに失敗しました');
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <h1 className="text-5xl font-bold mb-6">○×ゲーム</h1>
      <div className="message">{message}</div>
      <div className="grid grid-cols-3 gap-3 w-80">
        {board.map((row, i) => 
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
              className={`w-24 h-24 text-3xl font-semibold rounded-lg shadow-lg border-2 border-gray-300 
                ${cell ? (cell === 'X' ? 'bg-red-200' : 'bg-green-200') : 'bg-white hover:bg-gray-100'} 
                flex items-center justify-center transition-all duration-200`}
              disabled={cell !== ''}
            >
              {cell}
            </button>
          ))
        )}
        {message === "引き分け" || message.indexOf("勝") != -1 ? (
          <button
            onClick={() => {resetClick()}}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"            
          >リセット</button>): null}
      </div>
    </div>
  );
}

export default App;
