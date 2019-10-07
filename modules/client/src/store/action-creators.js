import ActionTypes from './action-types';


export function setSequencerDefinition (def) {
  return {
    type: ActionTypes.SET_SEQUENCER_DEFINITION,
    payload: {...def}
  }
}

export function setConnectionStatus(status) {
  return {
    type: ActionTypes.SET_CONNECTION_STATUS,
    payload: status === true
  }
}
