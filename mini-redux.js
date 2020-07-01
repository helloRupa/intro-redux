function createStore(reducer) {
  let state;
  let subscribedListener;
  // Set the initial state by dispatching a nonsense action
  // This causes the initialState to be used as the value of the
  // default parameter in the reducer (some naughty hoisting going on in here!)
  dispatch({ type: "LOVE_THEM_QUICK_MAFFS_INIT" });

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    if (typeof subscribedListener === 'function') {
      subscribedListener();
    }
  }
  // provide a callback to run any time an action is dispatched
  // provide a way to stop running that callback when the dev decides
  function subscribe(listener) {
    subscribedListener = listener;

    return function() {
      subscribedListener = undefined;
    }
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

const initialState = {
  cats: ['Meowser', 'Charlie', 'Fluffanilla'],
  selectedCat: 'Meowser',
  owner: 'Meee'
};

const catReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ADD_CAT': // convention is all caps w/ underscores for action type
      return {
        ...state,
        cats: [...state.cats, action.cat]
      };
    case 'SELECT_CAT':
      if (state.cats.includes(action.cat)) {
        return {
          ...state,
          selectedCat: action.cat
        }
      } else {
        return state;
      }
    case 'ADD_OWNER':
      return {
        ...state,
        owner: action.owner
      }
    default:
      return state;
  }
};

// plain action, not flexible
// const addCat = {
//   type: 'ADD_CAT',
//   cat: 'Algernon'
// };

// Let's make a more flexible/dynamic action: AN ACTION CREATOR!!
const addCat = cat => ({
  type: 'ADD_CAT',  // convention is all caps and underscore, start w/ verb cuz action
  cat
});

const selectCat = cat => ({
  type: 'SELECT_CAT',
  cat
});

// Use this when you have multiple reducers, one per concern, like cats and dogs
// OR books and authors OR posts and comments and users OR pineapple pizzas and edible pizzas
// OR stuff, ya know
function combineReducers(reducerPOJO) {
  return function(state, action) {
    let combinedState = {};  // a target object to populate w/ beautiful state
    let hasChanged = false;  // track whether reduced slice is different from og slice

    // iterate through the keys
    for (const key in reducerPOJO) {
      // if there is state at the key, use that, otherwise undefined
      // undefined will cause the initial state associated with the specific reducer
      // to return from the reducer (few lines down)
      const stateSlice = state ? state[key] : undefined;
      // call the reducer stored at the key. if multiple reducers respond to the same
      // action, they will do so
      const newSlice = reducerPOJO[key](stateSlice, action);
      // combine state from multiple reducers, put that state in the associated key
      combinedState[key] = newSlice;

      if (stateSlice !== newSlice) {
        hasChanged = true;
      }
    }
    // return the old state object if nothing changed
    return (hasChanged) ? combinedState : state;
  };
}

const dogState = {
  dogs: ['Chi Chi', 'Paw Paw'],
  selectedDog: 'Chi Chi',
  owner: 'You'
};

const dogReducer = (state=dogState, action) => {
  switch(action.type) {
    case 'ADD_DOG':
      return {
        ...state,
        dogs: [...state.dogs, action.dog]
      };
    case 'SELECT_DOG':
      if (state.dogs.includes(action.dog)) {
        return {
          ...state,
          selectedDog: action.dog
        }
      } else {
        return state;
      }
    case 'ADD_OWNER':
      return {
        ...state,
        owner: action.owner
      }
    default:
      return state;
  }
};

// Let's make a more flexible/dynamic action: AN ACTION CREATOR!!
const addDog = dog => ({
  type: 'ADD_DOG',
  dog
});

const selectDog = dog => ({
  type: 'SELECT_DOG',
  dog
});

const rootReducer = combineReducers({
  cat: catReducer,
  dog: dogReducer
});

const multiStore = createStore(rootReducer);

const addOwner = owner => ({
  type: 'ADD_OWNER',
  owner
})
