import { isEqual } from 'lodash-es';
import { Piece, Square } from 'types';

export default (pieces: Piece[], square: Square): Piece | undefined =>
  pieces.find((piece: Piece): boolean => isEqual(piece.square, square));
