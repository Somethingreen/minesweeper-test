import React from 'react';

import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { Game } from './features/game/Game';

function App() {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            Minesweeper
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Game />
    </React.Fragment>
  );
}

export default App;
