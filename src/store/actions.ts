import { ActionType, Move, MovePieceAction } from 'types';

export const movePiece = (move: Move): MovePieceAction => ({
  payload: move,
  type: ActionType.MovePiece,
});
