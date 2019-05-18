import { flatten, isEqual, property } from 'lodash-es';
import getOtherPieceColor from 'utils/get-other-piece-color';
import getValidMovesByPiece from 'utils/get-valid-moves-by-piece';
import { Move, Piece, PieceColor, PieceType, Square } from 'types';

export default (pieces: Piece[], color: PieceColor): boolean => {
  const king: Piece = pieces
    .filter((piece: Piece): boolean => piece.color === color)
    .find(({ type }): boolean => type === PieceType.King);
  const attackedSquares: Square[] = flatten(
    pieces
      .filter(
        (piece: Piece): boolean => piece.color === getOtherPieceColor(color)
      )
      .map((piece: Piece): Move[] => getValidMovesByPiece(pieces, piece))
  ).map(property('to'));

  return attackedSquares.some(
    (square: Square): boolean => isEqual(square, king.square)
  );
};
