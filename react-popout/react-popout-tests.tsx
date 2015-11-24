///<reference path='../react/react.d.ts' />
///<reference path='../react-popout/react-popout.d.ts' />
import * as React from 'react';
import {PopoutWindow, WindowOptions} from "react-popout";

class Test extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  
  render() {

    const options:WindowOptions = {
      toolbar: "yes",
      location: "yes",
      directories: "yes",
      status: "yes",
      menubar: "yes",
      scrollbars: "yes",
      resizable: "yes",
      width: 500,
      height: 500,
      top: (o:Window, w:Window) => 10,
      left: (o:Window, w:Window) => 10,
    };

    return (
      <PopoutWindow
          title="react-popout"
          onClosing={() => alert('window closing')}
          options={options}
          window={window}>
          <div>This is a popout window!</div>
      </PopoutWindow>
    );
  }
}

export default Test;
