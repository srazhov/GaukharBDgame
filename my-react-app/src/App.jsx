import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import GameTable from './components/GameTable';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <>
    <div>
      <h1 className='container'>Gaukhar's Special Party!</h1>
      {isGameStarted ? 
        <GameTable></GameTable> : 
        <Button onClick={() => setIsGameStarted(true)}>Start game</Button>}
    </div>
    </>
  );
};

export default App;
