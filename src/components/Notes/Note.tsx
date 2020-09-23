import React from "react";
import  NewNoteInput  from "./NewNoteInput";
import { useSelector, useDispatch, connect } from "react-redux";
import { NotesState } from "../../store/reducers/notesReducer";
import { addNote } from "../../store/actions/actions";

const Note = () => {
  const notes = useSelector<NotesState, NotesState["notes"]>(
    (state) => state.notes
  );
  const dispatch = useDispatch();

  const onAddNote = (note: string) => {
    dispatch(addNote(note));
  };

  return (
    <>
      <NewNoteInput addNote={onAddNote} />
      <hr />
      <ul>
        {(notes||[]).map((note) => {
          return <li key={note}>{note}</li>;
        })}
      </ul>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isSubscribed: state
  };
};

export default connect(mapStateToProps, null)(Note);
