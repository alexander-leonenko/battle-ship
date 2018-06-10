import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { GridActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { Cell, Header, StartButton } from 'app/components';
import { ICell, GridModel } from 'app/models';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    grid: RootState.GridState;
    actions: GridActions;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'grid'> => {
    return {
      grid: state.grid,
    };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(GridActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleOut = this.handleOut.bind(this);
  }

  handleOut() {
    const { grid, actions } = this.props;
    if (grid.status !== GridModel.Status.INIT) {
      return;
    }
    actions.outCell();
  }

  render() {
    const { grid, actions } = this.props;
    const cellMap: ICell[][] = [];
    grid.cells.forEach(cell => {
      if (!cellMap[cell.rowId]) {
        cellMap[cell.rowId] = [];
      }
      cellMap[cell.rowId][cell.columnId] = Object.assign({}, cell);
    });
    if (grid.status === GridModel.Status.GAME && grid.cells.find(c => c.hit)) {
      setTimeout(() => this.props.actions.shootCell(), 250);
    }
    return (
      <div className={style.divmain}>
        <div className={style.normal} onMouseOut={() => this.handleOut()}>
          <Header status={grid.status}/>
          <table>
            <tbody>
              {cellMap.map((rows, rowId) =>
                <tr key={rowId}>
                  {rows.map((cell, columnId) =>
                    <Cell status={grid.status} cell={cell} actions={actions} key={columnId} />
                  )}
                </tr>
              )}
              </tbody>
          </table>
        </div>
        <StartButton status={grid.status} actions={actions}/>
      </div>
    );
  }
}
