import { Button, Heading, Pane } from 'evergreen-ui';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import Board from './components/board';

const BOARD_SIZE = 10;

const LENGTH_SHIPS = [2, 3, 3, 4, 5];

const initialBoard = () => {
  const newBoard: number[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    newBoard.push(new Array(BOARD_SIZE));
    newBoard[i].fill(0);
  }
  return newBoard;
};

const placeBoat = (boatLength: number, board: number[][]): number[][] => {
  const randomPosX = Math.floor(Math.random() * BOARD_SIZE);
  const randomPosY = Math.floor(Math.random() * BOARD_SIZE);
  const direction = Math.floor(Math.random() * 2);
  if (direction === 0 && randomPosX + boatLength - 1 >= BOARD_SIZE)
    return placeBoat(boatLength, board);
  if (direction === 1 && randomPosY + boatLength - 1 >= BOARD_SIZE)
    return placeBoat(boatLength, board);
  const newBoard = cloneDeep(board);
  for (let i = 0; i < boatLength; i++) {
    const nextX = randomPosX + (direction === 0 ? i : 0);
    const nextY = randomPosY + (direction === 1 ? i : 0);
    if (newBoard[nextX][nextY] === 1) return placeBoat(boatLength, board);
    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        if ((newBoard[nextX + j] || [])[nextY + k] === 1)
          return placeBoat(boatLength, board);
      }
    }
  }
  for (let i = 0; i < boatLength; i++) {
    const nextX = randomPosX + (direction === 0 ? i : 0);
    const nextY = randomPosY + (direction === 1 ? i : 0);
    newBoard[nextX][nextY] = 1;
  }
  return newBoard;
};

function App() {
  const [board, setBoard] = useState<number[][]>();
  useEffect(() => {
    setBoard(initialBoard());
  }, []);
  return (
    <Pane display="flex" justifyContent="center" margin={50}>
      <Pane display="flex" flexDirection="column">
        <Heading marginBottom={20}>Battleship</Heading>
        <Button
          onClick={() => {
            let board = initialBoard();
            for (const ship of LENGTH_SHIPS) {
              board = placeBoat(ship, board);
            }
            setBoard(board);
          }}
          marginBottom={20}
        >
          Randomize
        </Button>
        <Board board={board} />
      </Pane>
    </Pane>
  );
}

export default App;
