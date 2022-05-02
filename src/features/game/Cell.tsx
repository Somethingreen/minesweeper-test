import { Box, Icon, Typography } from "@mui/material";
import React, { MouseEvent, useMemo } from "react";
import { useAppDispatch } from "../../app/hooks";
import { openCell } from "./gameActions";
import { cycleCell } from "./gameSlice";
import { CellState } from "./gameTypes";

type CellProps = {
  state: CellState,
  row: number,
  col: number
};

export const Cell: React.FC<CellProps> = ({ state, row, col }) => {
  const dispatch = useAppDispatch();

  function onButtonClicked(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    switch (e.button) {
      case 0:
        if ([CellState.UNKNOWN, CellState.MARKED, CellState.MAYBE].indexOf(state) > -1) {
          dispatch(openCell({ row, col }));
        }
        break;
      case 1:
      case 2:
        dispatch(cycleCell({ row, col }));
        break;
    }
  }

  function getButtonContent(state: CellState) {
    switch (state) {
      case CellState.MARKED:
        return <Icon sx={{ color: "#333" }}>flag_outlined</Icon>;
      case CellState.UNKNOWN:
      case CellState.N0:
        return "";
      default:
        return <Typography variant="button" sx={{ color: "#36c" }}>{state}</Typography>;
    }
  }

  function getBackgroundColor(state: CellState) {
    switch (state) {
      case CellState.UNKNOWN:
      case CellState.MARKED:
      case CellState.MAYBE:
        return "#ebebeb";
      default:
        return "#f8f8f8";
    }
  }

  return useMemo(() => (
    <Box onMouseDown={onButtonClicked} sx={{
      width: 32,
      height: 32,
      minWidth: 32,
      backgroundColor: getBackgroundColor(state),
      border: "1px solid #ccc",
      justifyContent: "center",
      alignItems: "center",
      display: "flex"
    }} role="GameFieldCell">
      {getButtonContent(state)}
    </Box>
  ),
    [state, row, col]
  );
};
