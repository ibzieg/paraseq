import "../styles/track.css";

import { first } from "lodash";
import React, { useState } from "react";

import NoteQuantizer from "../linked-classes/note-quantizer";

export default function PianoRoll({
  data,
  scene,
  track,
  deleteNote,
  createNote
}) {
  const [selectedNoteIndex, setNoteIndex] = useState(null);

  const getNoteText = value => {
    const scale = NoteQuantizer.getSceneScale(scene);
    const hasConstantNote = Number.isFinite(track.note);
    let chord;
    if (!hasConstantNote) {
      let note = (value - 1) % 12;
      let octave = Math.floor(value / 12);
      note = note % 6; // keep it on a 7 note scale

      // Use incoming note 0-11 as an index into the current master scale;
      note = NoteQuantizer.getNoteIndexFromName(scale[note]);
      chord = NoteQuantizer.getHarmonizedChord(note, scale);
    }

    return `${value}` + (chord ? ` (${first(chord)})` : "");
  };

  const noteRange = [];
  if (track.note) {
    noteRange.push(track.note);
  } else {
    for (let i = scene.maxNote; i >= scene.minNote; i--) {
      noteRange.push(i);
    }
  }

  const w = `${100.0 / (data.length + 1)}%`;

  return (
    <div className="piano-roll">
      {noteRange.map((v, i) => {
        return (
          <div className="piano-roll-row">
            <div
              className="piano-roll-cell piano-cell-highlight"
              style={{
                width: w,
                maxWidth: w
              }}
            >
              {getNoteText(v)}
            </div>
            {data.map((note, j) => {
              //let className = `piano-roll-cell ${note && note[0] === v ? 'piano-cell-note' : ''}`;
              let className = "piano-roll-cell";

              const hasNoteEvent = note && note.pitch === v;

              if (hasNoteEvent) {
                className += " piano-cell-note";
              } else {
                if (selectedNoteIndex === j) {
                  className += " piano-cell-selected";
                } else if (j % 4 === 0) {
                  className += " piano-cell-quarter";
                }
              }

              return (
                <div
                  onMouseLeave={() => {
                    setNoteIndex(null);
                  }}
                  onMouseEnter={() => {
                    setNoteIndex(j);
                  }}
                  onMouseDown={() => {
                    if (hasNoteEvent) {
                      deleteNote(j);
                    } else {
                      createNote(j, v);
                    }
                  }}
                  className={className}
                  style={{
                    width: w,
                    maxWidth: w
                  }}
                >
                  <span>
                    {note && note.pitch === v ? getNoteText(note.pitch) : "-"}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
