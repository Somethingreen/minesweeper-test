import { Box, Grid } from '@mui/material';
import React from 'react';
import { Cell } from './Cell';
import { CellState } from './gameTypes';

type GameFieldRowProps = {
  cells: Array<CellState>,
  row: number
};

export const GameFieldRow: React.FC<GameFieldRowProps> = ({ cells, row }) => {
    return (
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          {cells.map((cell, i) => <Grid key={i} item xs={1} sx={{ width: 32, height: 32 }}>
            <Cell state={cell} row={row} col={i} />
          </Grid>)}
        </Box>
    );
}
