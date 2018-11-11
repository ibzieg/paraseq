/******************************************************************************
 * Copyright 2018 Ian Bertram Zieg
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

import React, { Component } from "react";

export default class CommandBox extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      commandHistoryIndex: 0,
      commandHistory: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { commandInput } = this.refs;
      commandInput.focus();
    }, 0);

    this.props.emitter.on("log", this.appendLog.bind(this));
  }

  appendLog(text) {
    this.refs.log.insertBottom(text);
    this.refs.log.setScrollPerc(100);
    this.setState(); // force render
  }

  render() {
    const { top, left, width, height, onCommandInput, onExit } = this.props;
    const { commandInput } = this.refs;
    return (
      <box top={top}
           left={left}
           width={width}
           height={height}
           style={{
             border: { fg: "white" }
           }}>
        <box
          ref='log'
          top={0}
          left={0}
          scrollable={true}
          width={width}
          height={height - 3}
          border={{ type: "line" }}
          style={{
            border: { fg: "white" }
          }}>

        </box>
        <textbox
          top={height - 4}
          left={0}
          width={width}
          height={3}
          ref='commandInput'
          scrollable={true}
          inputOnFocus={true}
          keys={true}
          mouse={true}
          border={{ type: "line" }}
          style={{
            border: { fg: "white" }
          }}
          onKeypress={this.handleKeypress.bind(this)}
          onSubmit={(value) => {
            commandInput.clearValue();
            commandInput.focus();
            if (value === "exit") {
              onExit();
            } else {
              if (onCommandInput) {
                onCommandInput(value);
              }
              this.setState({
                commandHistory: [...this.state.commandHistory, value],
                commandHistoryIndex: this.state.commandHistory.length+1
              });
            }
          }}
        >
        </textbox>

      </box>);
  }

  handleKeypress(ch, key) {
    const { commandInput } = this.refs;
    const fkeys = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12"];

    if (fkeys.indexOf(key.name) >= 0) {
      if (typeof this.props.onFunctionKey === "function") {
           this.props.onFunctionKey(fkeys.indexOf(key.name));
      }
    } else if (key.name === "up" || (key.ctrl && key.name === "p")) {
      const nextIndex = Math.max(this.state.commandHistoryIndex - 1, 0);
      const cmd = this.state.commandHistory[nextIndex];
      commandInput.setValue(cmd);
      this.setState({ commandHistoryIndex: nextIndex });
    } else if (key.name === "down" || (key.ctrl && key.name === "n")) {
      const nextIndex = Math.min(this.state.commandHistoryIndex + 1, this.state.commandHistory.length);
      const cmd = this.state.commandHistory[nextIndex];
      commandInput.setValue(cmd);
      this.setState({ commandHistoryIndex: nextIndex });
    } else if (key.ctrl && key.name === "c") {
      commandInput.clearValue();
      this.setState({ commandHistoryIndex: this.state.commandHistory.length});
    } else {
      this.setState({ commandHistoryIndex: this.state.commandHistory.length});
    }
  }

}