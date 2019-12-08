import "./scene-options.scss";

import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

import { makePerformanceSelector } from "../store/selectors";
import { createNoteEvent, deleteNoteEvent } from "../support/sequence-data";
import SectionBox from "./section-box";
import SeqEditor from "./seq-editor";

export default function TrackSequenceData({ match: { params } }) {
  const { scene, mergedScene, track, mergedTrack } = useSelector(
    makePerformanceSelector(params)
  );
  const { trackId, perfId, sceneId } = params;
  const sequenceData = get(track, "sequenceData", []);

  return (
    <div>
      {sequenceData.map((v, seqId) => (
        <SectionBox title={`Sequence ${seqId + 1}`}>
          <SeqEditor
            key={seqId}
            scene={scene.options}
            mergedScene={mergedScene.options}
            track={track}
            mergedTrack={mergedTrack}
            data={v}
            createNote={(noteId, pitch) => {
              createNoteEvent({
                perfId: perfId - 1,
                sceneId: sceneId - 1,
                trackId: trackId - 1,
                seqId,
                noteId,
                pitch
              });
            }}
            deleteNote={noteId => {
              deleteNoteEvent({
                perfId: perfId - 1,
                sceneId: sceneId - 1,
                trackId: trackId - 1,
                seqId,
                noteId
              });
            }}
          />
        </SectionBox>
      ))}
    </div>
  );
}
