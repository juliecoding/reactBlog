import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'  //assigns reducer property to formReducer alias
import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
