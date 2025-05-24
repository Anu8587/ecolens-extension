import React from 'react';
import ReactDOM from 'react-dom/client';
import './Popup.css';

const Popup = () => {
  const score = 8; // Hardcoded for demo

  return (
    <div className="popup">
      <h1>EcoLens Eco-Score</h1>
      <p className="score">Eco-Score: {score}/10</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Popup />);