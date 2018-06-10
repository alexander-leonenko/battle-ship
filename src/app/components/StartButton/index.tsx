import * as React from 'react';
import { GridModel } from 'app/models';
import { GridActions } from 'app/actions';

export namespace StartButton {
  export interface Props {
    status: GridModel.Status;
    actions: GridActions;
  }
}

export class StartButton extends React.Component<StartButton.Props> {
  constructor(props: StartButton.Props, context?: any) {
    super(props, context);
    this.handleGameStart = this.handleGameStart.bind(this);
  }

  handleGameStart() {
    const { actions } = this.props;
    actions.startGame();
    actions.shootCell();
  }

  render() {
    if (this.props.status !== GridModel.Status.READY) {
      return null;
    }
    return (
      <button onClick={() => this.handleGameStart()}>
        Start
      </button>
    );
  }
}
