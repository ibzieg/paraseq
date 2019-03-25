


export function createNoteEvent({ perfId, sceneId, trackId, seqId, noteId, pitch }) {
  fetch(
    `/performances/${perfId}/scenes/${sceneId}/tracks/${trackId}/sequences/${seqId}/data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        noteIndex: noteId,
        pitch: pitch
      })
    }
  );
}