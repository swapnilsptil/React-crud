import { createStore, applyMiddleware, compose } from 'redux';
import {notesReducer} from './reducers/notesReducer';
import thunk from "redux-thunk";

interface ExtendedWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  declare var window: ExtendedWindow;
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  // const rootReducer:any = combineReducers(notesReducer);
  
  export const store = createStore(
    notesReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
