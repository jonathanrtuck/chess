import { get, isEqual, isUndefined, reject, take } from 'lodash-es';
import getOtherPieceColor from 'utils/get-other-piece-color';
import getPieceBySquare from 'utils/get-piece-by-square';
import { Move, Piece, PieceColor, PieceType, Square } from 'types';

const getAvailableSquaresByOffset = (
  pieces: Piece[],
  square: Square,
  color: PieceColor,
  fileOffset: number,
  rankOffset: number
): Square[] => {
  const squares: Square[] = [];
  let offsetSquare: Square = square;
  let offsetColor: PieceColor;

  while (true) {
    offsetSquare = getSquareByOffset(offsetSquare, fileOffset, rankOffset);

    if (!offsetSquare) {
      break;
    }

    offsetColor = get(getPieceBySquare(pieces, offsetSquare), 'color');

    if (offsetColor) {
      if (offsetColor !== color) {
        squares.push(offsetSquare);
      }

      break;
    }

    squares.push(offsetSquare);
  }

  return squares;
};

const getSquareByOffset = (
  [file, rank]: Square,
  fileOffset: number,
  rankOffset: number
): Square | undefined => {
  const offsetFile: number = file + fileOffset;
  const offsetRank: number = rank + rankOffset;

  if (
    offsetFile >= 0 &&
    offsetFile <= 7 &&
    offsetRank >= 0 &&
    offsetRank <= 7
  ) {
    return [offsetFile, offsetRank] as Square;
  }
};

const getValidBishopMoves = (
  pieces: Piece[],
  { color, square }: Piece
): Move[] => {
  const availableSquares: Square[] = [
    ...getAvailableSquaresByOffset(pieces, square, color, -1, -1),
    ...getAvailableSquaresByOffset(pieces, square, color, 1, -1),
    ...getAvailableSquaresByOffset(pieces, square, color, 1, 1),
    ...getAvailableSquaresByOffset(pieces, square, color, -1, 1),
  ];
  const availableMoves: Move[] = availableSquares.map(
    (to: Square): Move => ({
      from: square,
      to,
    })
  );

  return availableMoves;
};

const getValidKingMoves = (
  pieces: Piece[],
  { color, square }: Piece
): Move[] => {
  const squares: Square[] = [
    getSquareByOffset(square, -1, -1),
    getSquareByOffset(square, 0, -1),
    getSquareByOffset(square, 1, -1),
    getSquareByOffset(square, 1, 0),
    getSquareByOffset(square, 1, 1),
    getSquareByOffset(square, 0, 1),
    getSquareByOffset(square, -1, 1),
    getSquareByOffset(square, -1, 0),
  ];
  const validSquares: Square[] = reject(squares, isUndefined);
  const availableSquares: Square[] = reject(
    validSquares,
    isSquareOccupiedByColor(pieces, color)
  );
  const availableMoves: Move[] = availableSquares.map(
    (to: Square): Move => ({
      from: square,
      to,
    })
  );

  return availableMoves;
};

const getValidKnightMoves = (
  pieces: Piece[],
  { color, square }: Piece
): Move[] => {
  const squares: Square[] = [
    getSquareByOffset(square, -1, -2),
    getSquareByOffset(square, 1, -2),
    getSquareByOffset(square, 2, -1),
    getSquareByOffset(square, 2, 1),
    getSquareByOffset(square, 1, 2),
    getSquareByOffset(square, -1, 2),
    getSquareByOffset(square, -2, 1),
    getSquareByOffset(square, -2, -1),
  ];
  const validSquares: Square[] = reject(squares, isUndefined);
  const availableSquares: Square[] = reject(
    validSquares,
    isSquareOccupiedByColor(pieces, color)
  );
  const availableMoves: Move[] = availableSquares.map(
    (to: Square): Move => ({
      from: square,
      to,
    })
  );

  return availableMoves;
};

const getValidPawnMoves = (
  pieces: Piece[],
  { color, hasMoved, square }: Piece,
  lastMove?: Move
): Move[] => {
  const rankOffset: number = color === PieceColor.Light ? -1 : 1;
  const forwardSquares: Square[] = reject(
    take(
      getAvailableSquaresByOffset(pieces, square, color, 0, rankOffset),
      hasMoved ? 1 : 2
    ),
    (square: Square): boolean => Boolean(getPieceBySquare(pieces, square))
  );
  const captureSquares: Square[] = reject(
    [
      getSquareByOffset(square, -1, rankOffset),
      getSquareByOffset(square, 1, rankOffset),
    ],
    isUndefined
  ).filter(
    (square: Square): boolean => {
      const otherColor: PieceColor = getOtherPieceColor(color);

      // normal capture
      if (get(getPieceBySquare(pieces, square), 'color') === otherColor) {
        return true;
      }

      const neighboringSquare: Square = getSquareByOffset(
        square,
        0,
        -rankOffset
      );
      const neighboringPiece: Piece | undefined = getPieceBySquare(
        pieces,
        neighboringSquare
      );

      // en passant
      if (
        lastMove &&
        neighboringPiece &&
        neighboringPiece.color === otherColor &&
        neighboringPiece.type === PieceType.Pawn &&
        isEqual(neighboringSquare, lastMove.to) &&
        isEqual(getSquareByOffset(square, 0, +rankOffset), lastMove.from)
      ) {
        return true;
      }
    }
  );
  const availableSquares: Square[] = forwardSquares.concat(captureSquares);
  const availableMoves: Move[] = availableSquares.map(
    (to: Square): Move => ({
      from: square,
      to,
    })
  );

  return availableMoves;
};

const getValidQueenMoves = (
  pieces: Piece[],
  { color, square }: Piece
): Move[] => {
  const availableSquares: Square[] = [
    ...getAvailableSquaresByOffset(pieces, square, color, -1, -1),
    ...getAvailableSquaresByOffset(pieces, square, color, 0, -1),
    ...getAvailableSquaresByOffset(pieces, square, color, 1, -1),
    ...getAvailableSquaresByOffset(pieces, square, color, 1, 0),
    ...getAvailableSquaresByOffset(pieces, square, color, 1, 1),
    ...getAvailableSquaresByOffset(pieces, square, color, 0, 1),
    ...getAvailableSquaresByOffset(pieces, square, color, -1, 1),
    ...getAvailableSquaresByOffset(pieces, square, color, -1, 0),
  ];
  const availableMoves: Move[] = availableSquares.map(
    (to: Square): Move => ({
      from: square,
      to,
    })
  );

  return availableMoves;
};

const getValidRookMoves = (
  pieces: Piece[],
  { color, square }: Piece
): Move[] => {
  const availableSquares: Square[] = [
    ...getAvailableSquaresByOffset(pieces, square, color, 0, -1),
    ...getAvailableSquaresByOffset(pieces, square, color, 1, 0),
    ...getAvailableSquaresByOffset(pieces, square, color, 0, 1),
    ...getAvailableSquaresByOffset(pieces, square, color, -1, 0),
  ];
  const availableMoves: Move[] = availableSquares.map(
    (to: Square): Move => ({
      from: square,
      to,
    })
  );

  return availableMoves;
};

const isSquareOccupiedByColor = (pieces: Piece[], color: PieceColor) => (
  square: Square
): boolean => get(getPieceBySquare(pieces, square), 'color') == color;

export default (pieces: Piece[], piece: Piece, lastMove?: Move): Move[] => {
  switch (piece.type) {
    case PieceType.Bishop:
      return getValidBishopMoves(pieces, piece);

    case PieceType.King:
      return getValidKingMoves(pieces, piece);

    case PieceType.Knight:
      return getValidKnightMoves(pieces, piece);

    case PieceType.Pawn:
      return getValidPawnMoves(pieces, piece, lastMove);

    case PieceType.Queen:
      return getValidQueenMoves(pieces, piece);

    case PieceType.Rook:
      return getValidRookMoves(pieces, piece);
  }
};
