import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reset, selectGameState } from "../game/gameSlice";
import { GameSessionState } from "../game/gameTypes";

type EndDialogProps = {
  open: boolean
}

export const EndDialog: React.FC<EndDialogProps> = ({ open }) => {

  const dispatch = useAppDispatch();
  const sessionState = useAppSelector(selectGameState);

  function handleButtonClickOrClose() {
    dispatch(reset());
  }

  function getTitle(sessionState: GameSessionState): string {
    switch (sessionState) {
      case GameSessionState.WON:
        return "You win!";
      case GameSessionState.LOST:
        return "You lose!";
      default:
        return "Let's play!";
    }
  }

  function getIcon(sessionState: GameSessionState) {
    switch (sessionState) {
      case GameSessionState.LOST:
        return <Icon sx={{ color: "#c33", fontSize: 64 }}>sentiment_very_dissatisfied</Icon>;
      default:
        return <Icon sx={{ color: "#090", fontSize: 64 }}>sentiment_very_satisfied</Icon>;
    }
  }

  return (
    <Dialog open={open} onClose={handleButtonClickOrClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>{getTitle(sessionState)}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" align="center">{getIcon(sessionState)}</Typography>
        <Typography variant="subtitle1" component="div">Would you like to play again?</Typography>
      </DialogContent>
      <DialogActions >
        <Stack direction="row" justifyContent="center">
          <Button onClick={handleButtonClickOrClose}>Yes</Button>
          <Button onClick={handleButtonClickOrClose}>Hell Yeah!</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
