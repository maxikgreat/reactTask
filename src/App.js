import React from 'react';
import {Main} from './pages/Main'
import { RedditState } from './context/Reddit/RedditState';

function App() {
  return (
    <RedditState>
      <Main />
    </RedditState>
  );
}

export default App;
