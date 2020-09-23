import { Action } from "../actions/actions"

export interface NotesState {
  notes: string[],
  candidate: any,
  isAuthenticated: string[]
}

const initialState = {
  notes: [],
  candidate: [],
  isAuthenticated: []
}

export const notesReducer = (state:NotesState = initialState, action: Action) => {
  switch(action.type){
    case "ADD_NOTE": {
      return {...state, notes: [...state.notes, action.payload]}
    }
    case "ADD_CANDIDATE": {
      return {...state, candidate: [...state.candidate, action.payload]}
    }
    case "LOGIN": {
      return {...state, isAuthenticated: [...state.isAuthenticated, action.payload]}
    }
    case "SIGNOUT" : {
      state.isAuthenticated = []
      return {...state, isAuthenticated: [...state.isAuthenticated, action.payload]}
    }
    default:
      return state
  }
}