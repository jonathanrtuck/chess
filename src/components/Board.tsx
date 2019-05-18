import { Classes } from 'jss';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { darkSquare, highlightSqaure, lightSquare } from 'colors';
import {
  File,
  Move,
  Piece,
  PieceColor,
  Rank,
  Square,
  SquareColor,
  State,
} from 'types';
import { getLastMove, getPieces, getTurn, getValidMoves } from 'store/reducer';
import getPieceBySquare from 'utils/get-piece-by-square';
import getPiecesAfterMove from 'utils/get-pieces-after-move';
import isCheck from 'utils/is-check';
import { isEqual, times } from 'lodash-es';
import { movePiece } from 'store/actions';
import { default as PieceComponent } from 'components/Piece';
import React, { DragEvent, SFC, useEffect, useState } from 'react';
import withStyles from 'react-jss';

interface Props {
  classes: Classes;
  lastMove: Move;
  movePiece: (move: Move) => void;
  pieces: Piece[];
  turn: PieceColor;
  validMoves: Move[];
}

const Board: SFC<Props> = ({
  classes,
  lastMove,
  movePiece,
  pieces,
  turn,
  validMoves,
}): JSX.Element => {
  const [draggedFrom, setDraggedFrom] = useState();

  const attemptMove = (move: Move): void => {
    const isValid: boolean = validMoves.some(
      (validMove: Move): boolean => isEqual(validMove, move)
    );

    if (isValid) {
      movePiece(move);
    }
  };

  const getColorOfSquare = ([file, rank]: Square): SquareColor =>
    ((file % 2) + (rank % 2)) % 2 ? SquareColor.Dark : SquareColor.Light;

  useEffect(() => {
    const hasMove: boolean = validMoves.some(
      (move: Move): boolean => !isCheck(getPiecesAfterMove(pieces, move), turn)
    );

    if (!hasMove) {
      const isInCheck: boolean = isCheck(pieces, turn);

      window.alert(isInCheck ? 'checkmate' : 'draw');
    }
  }, [turn]);

  return (
    <table className={classes.board}>
      <tbody>
        {times(8).map(
          (rank: Rank): JSX.Element => (
            <tr key={rank}>
              {times(8).map(
                (file: File): JSX.Element => {
                  const piece: Piece = getPieceBySquare(pieces, [file, rank]);

                  return (
                    <td
                      className={classnames(
                        classes.square,
                        classes[`square_${getColorOfSquare([file, rank])}`],
                        {
                          [classes.highlight]:
                            lastMove && isEqual([file, rank], lastMove.to),
                        }
                      )}
                      key={file}
                      onDragOver={(e: DragEvent): void => {
                        e.preventDefault();
                      }}
                      onDrop={(): void => {
                        attemptMove({
                          from: draggedFrom,
                          to: [file, rank],
                        });
                      }}
                    >
                      {piece ? (
                        <PieceComponent
                          color={piece.color}
                          draggable={piece.color === turn}
                          onDrag={(): void => {
                            setDraggedFrom([file, rank]);
                          }}
                          type={piece.type}
                        />
                      ) : null}
                    </td>
                  );
                }
              )}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default connect(
  (state: State) => ({
    lastMove: getLastMove(state),
    pieces: getPieces(state),
    turn: getTurn(state),
    validMoves: getValidMoves(state),
  }),
  {
    movePiece,
  }
)(
  withStyles({
    '@global': {
      body: {
        background: {
          color: 'rgb(256, 256, 256)',
        },
        margin: 0,
        padding: 16,
      },

      '#board': {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        height: 'calc(100vh - 32px)',
      },
    },

    board: {
      borderCollapse: 'collapse',
      boxShadow: {
        blur: 32,
        color: 'rgba(0, 0, 0, .5)',
        x: 8,
        y: 8,
      },
      height: 'calc(100vh - 32px)',
      outline: {
        color: darkSquare,
        style: 'solid',
        width: 8,
      },
      maxHeight: 'calc(100vw - 32px)',
      maxWidth: 'calc(100vh - 32px)',
      width: 'calc(100vw - 32px)',
    },

    highlight: {
      '&:after': {
        background: {
          color: highlightSqaure,
        },
        bottom: 0,
        content: '""',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
    },

    square: {
      flex: {
        grow: 1,
        shrink: 1,
      },
      position: 'relative',
    },

    [`square_${SquareColor.Dark}`]: {
      background: {
        color: darkSquare,
      },
    },

    [`square_${SquareColor.Light}`]: {
      background: {
        color: lightSquare,
      },
    },
  })(Board)
);
