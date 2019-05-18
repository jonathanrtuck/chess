import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from '@fortawesome/free-solid-svg-icons';
import { PieceType } from 'types';

export default {
  [PieceType.Bishop]: faChessBishop,
  [PieceType.King]: faChessKing,
  [PieceType.Knight]: faChessKnight,
  [PieceType.Pawn]: faChessPawn,
  [PieceType.Queen]: faChessQueen,
  [PieceType.Rook]: faChessRook,
};
