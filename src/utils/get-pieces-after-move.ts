import getPieceBySquare from 'utils/get-piece-by-square';
import { isEqual } from 'lodash-es';
import { Move, Piece, PieceType, Square } from 'types';

const movePiece = (pieces: Piece[], { from, to }: Move): Piece[] =>
  pieces.map(
    (piece: Piece): Piece => {
      if (isEqual(piece.square, from)) {
        return {
          ...piece,
          hasMoved: true,
          square: to,
        };
      }

      return piece;
    }
  );

const removePiece = (pieces: Piece[], { from, to }: Move): Piece[] => {
  const piece: Piece = getPieceBySquare(pieces, from);
  const [fromFile, fromRank]: Square = from;
  const [toFile, toRank]: Square = to;
  const isPawn: boolean = piece.type === PieceType.Pawn;
  const isCapture: boolean = fromFile !== toFile && fromRank !== toRank;
  const isEmpty: boolean = !getPieceBySquare(pieces, to);

  // en passant
  if (isPawn && isCapture && isEmpty) {
    const capturedPieceSquare: Square = [toFile, fromRank];

    return pieces.filter(
      ({ square }: Piece): boolean => !isEqual(square, capturedPieceSquare)
    );
  }

  return pieces.filter(({ square }: Piece): boolean => !isEqual(square, to));
};

export default (pieces: Piece[], move: Move): Piece[] =>
  movePiece(removePiece(pieces, move), move);
