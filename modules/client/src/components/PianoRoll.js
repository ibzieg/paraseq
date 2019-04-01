import React, { Component } from 'react';
import { first } from 'lodash';


import ReactJson from 'react-json-view';

import '../styles/track.css';

import NoteQuantizer from '../linked-classes/note-quantizer';

export default class PianoRoll extends Component {

  state = { selectedNoteIndex: null };

  setNoteIndex = (index) => {
    this.setState({ selectedNoteIndex: index });
  };

  getNoteText(value) {
    const { scene, track } = this.props;

    const scale = NoteQuantizer.getSceneScale(scene);
    const hasConstantNote = Number.isFinite(track.note);
    let chord;
    if (!hasConstantNote) {
      let note = (value-1) % 12;
      let octave = Math.floor(value / 12);
      note = note % 6; // keep it on a 7 note scale

      // Use incoming note 0-11 as an index into the current master scale;
      note = NoteQuantizer.getNoteIndexFromName(scale[note]);
      chord = NoteQuantizer.getHarmonizedChord(note, scale);
    }


    return `${value}` + (chord ? ` (${first(chord)})` : '');
  }

  render() {
    let noteRange = [];
    if (this.props.track.note) {
      noteRange.push(this.props.track.note);
    } else {
      for (let i = this.props.scene.maxNote; i >= this.props.scene.minNote; i--) {
        noteRange.push(i);
      }
    }

    const { noteSet } = this.props.scene;

    let w = `${100.0 / (this.props.data.length+1)}%`;

    return (
      <div className="piano-roll">
        {noteRange.map((v, i) => {

          return (
            <div className="piano-roll-row">
              <div
                className="piano-roll-cell piano-cell-highlight"
                style={{
                  width: w,
                  maxWidth: w,

                }}
              >
                {this.getNoteText(v)}
              </div>
              {this.props.data.map((note, j) => {

                //let className = `piano-roll-cell ${note && note[0] === v ? 'piano-cell-note' : ''}`;
                let className = `piano-roll-cell`;

                const hasNoteEvent = note && note.pitch === v;

                if (hasNoteEvent) {
                  className += ` piano-cell-note`;
                } else {
                  if (this.state.selectedNoteIndex === j) {
                    className += ` piano-cell-selected`;
                  } else if ((j % 4) === 0) {
                    className += ` piano-cell-quarter`;
                  }
                }

                return (
                  <div
                    onMouseLeave={() => { this.setNoteIndex(null) }}
                    onMouseEnter={() => { this.setNoteIndex(j) }}
                    onMouseDown={() => {
                      if (hasNoteEvent) {
                        this.props.deleteNote(j);
                      } else {
                        this.props.createNote(j, v);
                      }
                    }}
                    className={className}
                    style={{
                      width: w,
                      maxWidth: w
                    }}
                  >
                    <span>
                      {note && note.pitch === v
                        ? this.getNoteText(note.pitch)
                        : '-'
                      }
                    </span>
                  </div>
                )
              })}
            </div>
          );
        })}
      </div>
    );
  }
}