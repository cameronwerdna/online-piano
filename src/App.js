import React, { useEffect } from 'react';
import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';
import './App.css';

const PianoApp = () => {
  useEffect(() => {
    Tone.start();
  }, []);

  const playNote = (note) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, '8n');
  };

  // initializes MIDI data with a sequence of notes
  const midi = new Midi();
  const startNote = Tone.Frequency('C4').toMidi();
  const endNote = Tone.Frequency('C5').toMidi();

  for (let midiNote = startNote; midiNote <= endNote; midiNote++) {
    midi.addTrack().addNote({
      midi: midiNote,
      time: (midiNote - startNote) + 'n',
      duration: '4n',
    });
  }

  return (
    <div className="App">
      <h1>One Octave Piano! Synth it up!</h1>
      <div className="piano">
        {midi.tracks.flatMap((track, trackIndex) => (
          track.notes.map((note, noteIndex) => (
            <button key={`${trackIndex}-${noteIndex}`} onClick={() => playNote(note.name)}>
              {note.name}
            </button>
          ))
        ))}
      </div>
    </div>
  );
};
export default PianoApp;

