import { Piece, PieceColor, PieceType, Square } from 'types';

const darkPieces: Piece[] = [
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [0, 0] as Square,
    type: PieceType.Rook,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [1, 0] as Square,
    type: PieceType.Knight,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [2, 0] as Square,
    type: PieceType.Bishop,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [3, 0] as Square,
    type: PieceType.Queen,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [4, 0] as Square,
    type: PieceType.King,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [5, 0] as Square,
    type: PieceType.Bishop,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [6, 0] as Square,
    type: PieceType.Knight,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [7, 0] as Square,
    type: PieceType.Rook,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [0, 1] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [1, 1] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [2, 1] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [3, 1] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [4, 1] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [5, 1] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [6, 1] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Dark,
    hasMoved: false,
    square: [7, 1] as Square,
    type: PieceType.Pawn,
  },
];
const lightPieces: Piece[] = [
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [0, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [1, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [2, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [3, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [4, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [5, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [6, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [7, 6] as Square,
    type: PieceType.Pawn,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [0, 7] as Square,
    type: PieceType.Rook,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [1, 7] as Square,
    type: PieceType.Knight,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [2, 7] as Square,
    type: PieceType.Bishop,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [3, 7] as Square,
    type: PieceType.Queen,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [4, 7] as Square,
    type: PieceType.King,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [5, 7] as Square,
    type: PieceType.Bishop,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [6, 7] as Square,
    type: PieceType.Knight,
  },
  {
    color: PieceColor.Light,
    hasMoved: false,
    square: [7, 7] as Square,
    type: PieceType.Rook,
  },
];

export default {
  lastMove: undefined,
  pieces: [...darkPieces, ...lightPieces],
  turn: PieceColor.Light,
};
