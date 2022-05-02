import { Box } from "@mui/material";
import React from "react";
import { GameFieldRow } from "./GameFieldRow";
import { CellState, GameField } from "./gameTypes";

type GameFieldGridProps = {
  field: GameField
};

export const GameFieldGrid: React.FC<GameFieldGridProps> = ({ field }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      {field.map((cells: Array<CellState>, i: number) => {
        return <GameFieldRow key={i} row={i} cells={cells} />;
      })}
    </Box>
  );
}
