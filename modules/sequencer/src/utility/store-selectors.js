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

const Store = require("../sequencer/store");

const {
  assertPerformanceIndexBounds,
  assertSceneIndexBounds
} = require("./assertions");

class StoreSelectors {
  static getNextRepeatCount(nextPerformance, nextScene, repeatCount) {
    const { performances } = Store.instance.state;
    const nextRepeatCount =
      performances[nextPerformance].scenes[nextScene].options.repeat;
    return typeof nextRepeatCount === "number" ? nextRepeatCount : repeatCount;
  }

  static getNextRepeatableScene(performanceIndex, sceneIndex, repeatCount) {
    assertPerformanceIndexBounds(performanceIndex);
    assertSceneIndexBounds(sceneIndex);
    let nextScene = (sceneIndex + 1) % Store.SCENE_COUNT;
    let nextPerformance = performanceIndex;
    if (nextScene === 0) {
      // Next scene rolled over into the next Performance
      nextPerformance = (performanceIndex + 1) % Store.PERFORMANCE_COUNT;
      if (nextPerformance === 0) {
        // Next Performance looped back to begginning
        // Always return from here at 0,0 to avoid infinite loop
        return [nextPerformance, nextScene];
      }
    }
    const nextRepeatCount = StoreSelectors.getNextRepeatCount(
      nextPerformance,
      nextScene,
      repeatCount
    );
    if (nextRepeatCount > 0) {
      return [nextPerformance, nextScene];
    } else {
      return StoreSelectors.getNextRepeatableScene(
        nextPerformance,
        nextScene,
        nextRepeatCount
      );
    }
  }
}

module.exports = StoreSelectors;
