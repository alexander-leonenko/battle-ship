import * as React from 'react';
import * as style from './style.css';
import { GridActions } from 'app/actions';
import { ICell, GridModel } from 'app/models';
import * as classNames from 'classnames';

export namespace Cell {
  export interface Props {
    actions: GridActions;
    cell: ICell;
    status: GridModel.Status;
  }
}

export class Cell extends React.Component<Cell.Props> {
  constructor(props: Cell.Props, context?: any) {
    super(props, context);
    this.handleOver = this.handleOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleOver() {
    const {cell, actions, status} = this.props;
    if (status !== GridModel.Status.INIT) {
      return;
    }
    const {rowId, columnId} = cell;
    actions.overCell({rowId, columnId});
  }

  handleClick() {
    const {cell, actions} = this.props;
    if (!cell.over || cell.error) {
      return;
    }
    const {rowId, columnId} = cell;
    actions.clickCell({rowId, columnId});
  }

  render() {
    const {cell} = this.props;

    const classes = classNames({
      [style.divnormal]: true,
      [style.overready]: cell.over,
      [style.overerror]: cell.error,
      [style.ship]: cell.lock && !!cell.ship,
      [style.hitempty]: cell.hit && !cell.ship,
      [style.hitship]: cell.hit && !!cell.ship,
    });

    return (
      <td className={style.normal} onMouseOver={() => this.handleOver()} onClick={() => this.handleClick()} >
        <div className={classes}/>
      </td>
    );
  }
}
