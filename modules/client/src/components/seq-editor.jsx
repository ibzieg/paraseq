import "./seq-editor.scss";

import { first } from "lodash";
import React, { useState } from "react";

import NoteQuantizer from "../linked-classes/note-quantizer";

function Note({ selected, value, label, quarter, ...props }) {
  const classes =
    "note" +
    (selected ? " note-selected " : "") +
    (quarter ? " note-quarter " : "");
  return (
    <div {...props} className={classes}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Event({ event, index, noteRange, createNote, deleteNote }) {
  const noteElements = noteRange.map((note, noteIndex) => {
    const selected = event && event.pitch === note;

    const onMouseDown = () => {
      if (selected) {
        deleteNote(index);
      } else {
        createNote(index, note);
      }
    };

    const label = selected ? note : "";
    const quarter = index % 4 == 0;
    return (
      <Note
        onMouseDown={onMouseDown}
        label={label}
        selected={selected}
        quarter={quarter}
      />
    );
  });
  return <div className="event">{noteElements}</div>;
}

export default function SeqEditor({
  data,
  scene,
  mergedScene,
  track,
  mergedTrack,
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
  if (mergedTrack.note) {
    noteRange.push(mergedTrack.note);
  } else {
    for (let i = mergedScene.maxNote; i >= mergedScene.minNote; i--) {
      noteRange.push(i);
    }
  }

  const w = `${100.0 / (data.length + 1)}%`;

  const eventElements = data.map((event, eventIndex) => {
    return (
      <Event
        event={event}
        index={eventIndex}
        noteRange={noteRange}
        createNote={createNote}
        deleteNote={deleteNote}
      />
    );
  });

  return <div className="event-list">{eventElements}</div>;
}
