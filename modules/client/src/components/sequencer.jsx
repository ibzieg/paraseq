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
import "./sequencer.scss";

import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import { sequencerDefinitionSelector } from "../store/selectors";
import NavButton from "./nav-button";
import Performance from "./performance";
import PianoRoll from "./piano-roll";
import SeqEditor from "./seq-editor";

export default function Sequencer() {
  const { performances, selectedPerformance } = useSelector(
    sequencerDefinitionSelector
  );

  return (
    <Switch>
      <Route
        exact
        path="/performances/:perfId/scene/:sceneId/track/:trackId/sequences/:seqId"
        component={SeqEditor}
      />
      <Route path="/performances">
        <div>
          <div className="sequencer-tabs-container">
            {performances.map((value, index) => (
              <NavButton
                key={index}
                route={`/performances/${index + 1}`}
                selected={selectedPerformance === index}
                text={`P${index + 1}`}
              />
            ))}
          </div>
          <Switch>
            <Route path="/performances/:perfId" component={Performance} />
            <Redirect exact={true} from="/" to="/performances/1" />
            <Redirect exact={true} from="/performances" to="/performances/1" />
          </Switch>
        </div>
      </Route>
    </Switch>
  );
}
