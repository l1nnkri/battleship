import { Pane } from 'evergreen-ui';

const PIXEL_SIZE = 30;
const BOARD_SIZE = 10;

const Board = ({ board }: { board?: number[][] }) => (
  <Pane
    elevation={3}
    height={BOARD_SIZE * PIXEL_SIZE}
    width={BOARD_SIZE * PIXEL_SIZE}
    display="flex"
    flexWrap="wrap"
  >
    {board &&
      board.map((row) =>
        row.map((cell, i) => (
          <Pane
            key={`${i}_${cell}`}
            height={PIXEL_SIZE}
            width={PIXEL_SIZE}
            border="muted"
            textAlign="center"
            fontSize={27}
          >
            {cell === 1 && 'X'}
          </Pane>
        ))
      )}
  </Pane>
);

export default Board;
