export function createNoteEvent({
  perfId,
  sceneId,
  trackId,
  seqId,
  noteId,
  pitch
}) {
  fetch(
    `/performance/${perfId}/scene/${sceneId}/track/${trackId}/sequence/${seqId}/note/${noteId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pitch: pitch
      })
    }
  );
}

export function deleteNoteEvent({ perfId, sceneId, trackId, seqId, noteId }) {
  fetch(
    `/performance/${perfId}/scene/${sceneId}/track/${trackId}/sequence/${seqId}/note/${noteId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
