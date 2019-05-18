import { PieceColor } from 'types';

export default (color: PieceColor): PieceColor =>
  color === PieceColor.Light ? PieceColor.Dark : PieceColor.Light;
