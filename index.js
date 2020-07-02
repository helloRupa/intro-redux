const rootReducer = combineReducers({
  cat: catReducer,
  dog: dogReducer
});

const store = createStore(catReducer);
const multiStore = createStore(rootReducer);