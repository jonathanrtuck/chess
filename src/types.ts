export type Action = MovePieceAction;

export enum ActionType {
  MovePiece = 'MOVE_PIECE',
  // OfferDraw = 'OFFER_DRAW',
  // Reset = 'RESET',
  // Resign = 'RESIGN',
}

export type File = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Move {
  from: Square;
  to: Square;
}

export interface MovePieceAction {
  payload: Move;
  type: typeof ActionType.MovePiece;
}

export interface Piece {
  color: PieceColor;
  hasMoved: boolean;
  square: Square;
  type: PieceType;
}

export enum PieceColor {
  Dark = 'DARK',
  Light = 'LIGHT',
}

export enum PieceType {
  Bishop = 'BISHOP',
  King = 'KING',
  Knight = 'KNIGHT',
  Pawn = 'PAWN',
  Queen = 'QUEEN',
  Rook = 'ROOK',
}

export type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Square = [File, Rank];

export enum SquareColor {
  Dark = 'DARK',
  Light = 'LIGHT',
}

export interface State {
  lastMove: Move | undefined;
  pieces: Piece[];
  turn: PieceColor;
}
