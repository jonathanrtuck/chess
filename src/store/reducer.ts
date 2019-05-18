import { Action, ActionType, Move, Piece, PieceColor, State } from 'types';
import { flatten } from 'lodash-es';
import getOtherPieceColor from 'utils/get-other-piece-color';
import getPiecesAfterMove from 'utils/get-pieces-after-move';
import getValidMovesByPiece from 'utils/get-valid-moves-by-piece';
import initialState from 'store/initial-state';
import isCheck from 'utils/is-check';

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.MovePiece: {
      const pieces: Piece[] = getPiecesAfterMove(state.pieces, action.payload);

      if (!isCheck(pieces, state.turn)) {
        return {
          ...state,
          lastMove: action.payload,
          pieces,
          turn: getOtherPieceColor(state.turn),
        };
      }

      return state;
    }

    default:
      return state;
  }
};

export const getLastMove = (state: State): Move => state.lastMove;

export const getPieces = (state: State): Piece[] => state.pieces;

export const getTurn = (state: State): PieceColor => state.turn;

export const getValidMoves = (state: State): Move[] =>
  flatten(
    state.pieces
      .filter((piece: Piece): boolean => piece.color === state.turn)
      .map(
        (piece: Piece): Move[] =>
          getValidMovesByPiece(state.pieces, piece, state.lastMove)
      )
  );
