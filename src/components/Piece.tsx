import { Classes } from 'jss';
import classnames from 'classnames';
import { darkPiece, lightPiece } from 'colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from 'icons';
import { PieceColor, PieceType } from 'types';
import React, { DragEvent, SFC } from 'react';
import withStyles from 'react-jss';

interface Props {
  classes: Classes;
  color: PieceColor;
  draggable: boolean;
  onDrag: (e: DragEvent<HTMLDivElement>) => void;
  type: PieceType;
}

const Piece: SFC<Props> = ({
  classes,
  color,
  draggable,
  onDrag,
  type,
}): JSX.Element => (
  <div className={classes.root} draggable={draggable} onDragStart={onDrag}>
    <FontAwesomeIcon
      className={classnames(classes.icon, classes[`icon_${color}`], {
        [classes.draggable]: draggable,
      })}
      icon={Icons[type]}
    />
  </div>
);

export default withStyles({
  draggable: {
    cursor: 'grab',
  },

  icon: {
    bottom: '10%',
    height: '80%',
    left: '10%',
    position: 'absolute',
    right: '10%',
    top: '10%',
    width: '80% !important',
  },

  [`icon_${PieceColor.Dark}`]: {
    color: darkPiece,
    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))',
  },

  [`icon_${PieceColor.Light}`]: {
    color: lightPiece,
    filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))',
  },

  root: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
})(Piece);
