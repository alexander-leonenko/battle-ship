import * as React from 'react';
import { GridModel } from 'app/models';

export namespace Header {
  export interface Props {
    status: GridModel.Status;
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
  }

  render() {
    let text = null;
    switch (this.props.status) {
      case GridModel.Status.INIT:
        text = "Please set up ships";
        break;
      case GridModel.Status.READY:
        text = "Lets play!";
        break;
      case GridModel.Status.GAME:
        text = "Please wait...";
        break;
      case GridModel.Status.FINISH:
        text = "All ships have sunk!";
        break;
    }

    return (
      <h1>{text}</h1>
    );
  }
}
