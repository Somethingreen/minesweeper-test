import { Radio, Card, CardContent, FormControl, FormControlLabel, FormLabel, RadioGroup, CardActions, Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { start } from '../game/gameActions';

export default function StartMenu() {

  const [size, setSize] = useState("1");

  const dispatch = useAppDispatch();

  function onButtonClicked() {
    dispatch(start(size));
  }

  return (
    <Card sx={{ maxWidth: '30%', margin: '0 auto' }}>
      <CardContent>
        <FormControl>
          <FormLabel>Field Size</FormLabel>
          <RadioGroup row value={size} onChange={e => setSize(e.target.value)}>
            <FormControlLabel value="1" control={<Radio />} label="Small" />
            <FormControlLabel value="2" control={<Radio />} label="Medium" />
            <FormControlLabel value="3" control={<Radio />} label="Large" />
            <FormControlLabel value="4" control={<Radio />} label="Huge" />
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onButtonClicked}>Start</Button>
      </CardActions>
    </Card>
  );
}
