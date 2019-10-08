/******************************************************************************
 * Copyright 2019 Ian Bertram Zieg
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
import { createStore } from "redux";

import {
  setConnectionStatus,
  setSequencerDefinition
} from "./store/action-creators";
import reducer from "./store/reducer";

let _instance = null;

export default class Runtime {
  static create() {
    if (_instance) {
      throw new Error("Instance of Runtime already exists");
    }
    _instance = new Runtime();
  }

  static get instance() {
    return _instance;
  }

  constructor() {
    this.store = createStore(reducer);
    this.connection = Runtime.createWebSocket(this.store.dispatch);
  }

  static createWebSocket(dispatch) {
    const connection = new WebSocket(
      `ws://${window.location.hostname}:3001/sequencer/state`
    );
    connection.onopen = () => {
      dispatch(setConnectionStatus(true));
    };
    connection.onmessage = message => {
      dispatch(setSequencerDefinition(JSON.parse(message.data)));
    };
    connection.onclose = () => {
      dispatch(setConnectionStatus(false));
    };
    return connection;
  }
}
