export type Action = { type: string; payload: string|any };

export const addNote = (note: string): Action => ({
  type: "ADD_NOTE",
  payload: note,
});

export const addCandidate = (candidate: any): Action => ({
  type: "ADD_CANDIDATE",
  payload: candidate,
});

export const login = (isAuthenticated: any): Action => ({
  type: "LOGIN",
  payload: isAuthenticated,
});

export const signOut = (isAuthenticated: any): Action => ({
  type: "SIGNOUT",
  payload: isAuthenticated,
});
