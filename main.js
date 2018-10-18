/******************************************************************************
 * Copyright 2017 Ian Bertram Zieg
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

const { fork, spawn } = require("child_process");

const shared = require("./modules/shared");
const Console = shared.display.Console;
const InterfaceAddress = shared.network.InterfaceAddress;

const Screen = require("./modules/screen/lib/screen");

Screen.create({
  onExit: () => {
    stopAllThreads();
    return process.exit(0);
  },
  onCommandInput: (cmd) => {
    performanceThread.send({
      type: "command",
      script: cmd
    });
  },
  onFunctionKey: (index) => {
    performanceThread.send({
      type: "functionKey",
      index: index
    });
  }
});

const performanceThread = fork("./modules/sequencer/src/main.js");

performanceThread.on("message", (message) => {
  try {
    switch (message.type) {
      case "log":
        Screen.Instance.log(message ? message.text : "");
        break;
      case "controllerMap":
        Screen.Instance.updateControllerMap(message.map);
        break;
      case "state":
        Screen.instance.updateState(message.state);
        apiServerThread.send(message);
        break;
      case "scene":
        Screen.instance.updateScene(message.data);
        break;
      default:
        Screen.Instance.log(Console.errorStyle(`Unknown message type: ${JSON.stringify(message)}`));
        break;
    }
  } catch (error) {
    Screen.Instance.log(Console.errorStyle(`${error} ${error.stack}`));
  }

});


const apiServerThread = fork("./modules/server/bin/www", {
  env: {
    PORT: 3001
  },
  silent: true
});


const webServerThread = fork("./node_modules/react-scripts/scripts/start", {
  env: {
    PORT: 3000
  },
  cwd: "./modules/client/",
  silent: true
});

Screen.instance.log(Console.successStyle(`HTTP server started at http://${InterfaceAddress.localAddress}:3000`));

function stopAllThreads() {
  apiServerThread.kill();
  webServerThread.kill();
  performanceThread.kill("SIGINT");
}


process.on("SIGTERM", function() {
  stopAllThreads();
  process.exit(1);
});