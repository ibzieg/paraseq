/* eslint-disable prettier/prettier */
import { merge } from "lodash";
import { createSelector } from "reselect";


export function getPerformance({ performances }, perfId) {
  return (performances || [])[perfId] || {};
}

export function getScene({ scenes }, sceneId) {
  return (scenes || [])[sceneId] || {};
}

export function getTrack({ tracks }, trackId) {
  return (tracks || [])[trackId] || {};
}

export function getMergedScene (performance, sceneIndex) {
  //return getScene(performance, sceneIndex);
  const scenes = performance.scenes || [];
  return scenes.reduce((acc, scene, index) => {
    if (index <= sceneIndex) {
      return merge(acc, { ...scene});
    }
    return acc;
  }, {} );
}

export const sequencerDefinitionSelector = createSelector(
  state => state.sequencerDefinition,
  definition => definition
);

export const makePerformanceSelector = ({ perfId, sceneId, trackId }) => {
  return createSelector(
    sequencerDefinitionSelector,
    def => {
      const performance = getPerformance(def, parseInt(perfId) - 1 );
      const scene = getScene(performance, parseInt(sceneId) - 1);
      const mergedScene = getMergedScene(performance, parseInt(sceneId) - 1);
      const mergedTrack = getTrack(mergedScene, parseInt(trackId) - 1);
      const track = getTrack(scene, parseInt(trackId) - 1);
      return { performance, scene, mergedScene, track, mergedTrack };
    }
  );
};
