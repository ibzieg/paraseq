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

const Store = require("./store");
const SequenceData = require("./sequence-data");
const Log = require("../../../shared").display.Console;

class SequenceGraph {
  get trackState() {
    return Store.instance.scene.tracks[this.props.index];
  }

  get type() {
    return this.trackState.graphType;
  }

  get data() {
    return this.trackState.graphData[this.type];
  }

  get sequence() {
    return this.state.sequence;
  }

  get index() {
    return this.state.index;
  }

  constructor(props) {
    this.props = {
      index: props.index,
      createSequence: props.createSequence
    };

    this.state = {
      index: 0,
      count: 0,
      secondaryCounters: [],
      sequence: [],
      lastSequence: []
    };
  }

  clock() {
    if (this.type === "linear") {
      let primaryIndex = this.state.count % this.data.length;
      let i = this.data[primaryIndex];
      if (typeof i === "number") {
        this.state.index = i;
      } else if (typeof i === "object") {
        let j = this.state.secondaryCounters[primaryIndex];
        if (typeof j !== "number") {
          j = 0;
        }
        this.state.secondaryCounters[primaryIndex] = j + 1;
        this.state.index = i[j % i.length];
      }
      this.state.sequence = [...this.trackState.sequenceData[this.index]];
    } else if (this.type === "markov") {
      let p = this.data[this.index];
      if (p) {
        let sum = p.reduce((s, element) => s + element, 0);
        let q = p.reduce(
          (s, element, i) => [
            ...s,
            ...Array(Math.floor((element / sum) * 100)).join(i)
          ],
          []
        );
        this.state.index = q[Math.floor(Math.random() * q.length)];
      } else {
        Log.error("SequenceGraph: clock: markov data missing");
      }
      this.state.sequence = [...this.trackState.sequenceData[this.index]];
    } else if (this.type === "evolve") {
      const nextSequence = this.props.createSequence();
      if (this.data && this.data.probability && nextSequence) {
        this.state.sequence = SequenceData.evolveSequence(
          this.state.sequence,
          nextSequence,
          this.data.probability
        );
      }
    } else if (parseInt(this.type) >= 0) {
      this.state.index = parseInt(this.type);
    }
    this.state.count = this.state.count + 1;
  }

  static randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  generateData() {
    let data = {
      linear: [],
      markov: [],
      evolve: {
        probability: 0.5
      }
    };
    let i, j;
    // Linear
    let length = SequenceGraph.randomInt(1, 2);
    for (i = 0; i < length; i++) {
      let k = SequenceGraph.randomInt(0, 2);
      let r = [];
      if (k < 2) {
        r.push(SequenceGraph.randomInt(0, Store.SEQUENCE_COUNT - 1));
      } else {
        for (j = 0; j < k; j++) {
          r.push(SequenceGraph.randomInt(0, Store.SEQUENCE_COUNT - 1));
        }
      }
      data.linear.push(r);
    }
    // Markov
    for (i = 0; i < Store.SEQUENCE_COUNT; i++) {
      let p = [];
      for (j = 0; j < Store.SEQUENCE_COUNT; j++) {
        p.push(Math.random());
      }
      data.markov.push(p);
    }

    Store.instance.setTrackProperty(this.props.index, "graphData", data);
  }

  reset() {
    this.state.count = 0;
    this.state.secondaryCounters = [];
    this.clock();
  }
}

module.exports = SequenceGraph;
