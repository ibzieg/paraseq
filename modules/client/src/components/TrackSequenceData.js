import "../styles/scene-options.css";

import React from "react";
import { useSelector } from "react-redux";

import { createNoteEvent, deleteNoteEvent } from "../support/sequence-data";
import PianoRoll from "./PianoRoll";

export default function TrackSequenceData({ match }) {
  const sequencerDefinition = useSelector(state => state.sequencerDefinition);

  const trackId = parseInt(match.params.trackId) - 1;
  const perfId = parseInt(match.params.perfId) - 1;
  const sceneId = parseInt(match.params.sceneId) - 1;

  const performance = sequencerDefinition.performances[perfId];
  const scene = performance ? performance.scenes[sceneId] : {};
  const track = scene && scene.tracks ? scene.tracks[trackId] || {} : {};

  // TODO should scene/track inherit from previous scenes?
  const sequenceData = track.sequenceData || [];

  return (
    <div className="track-options">
      {sequenceData.map((v, i) => (
        <div>
          <h3>{`Sequence ${i + 1}`}</h3>
          <PianoRoll
            key={i}
            scene={scene.options}
            track={track}
            data={v}
            createNote={(noteId, pitch) => {
              createNoteEvent({
                perfId,
                sceneId,
                trackId,
                seqId: i,
                noteId,
                pitch
              });
            }}
            deleteNote={noteId => {
              deleteNoteEvent({
                perfId,
                sceneId,
                trackId,
                seqId: i,
                noteId
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}
