function createStore(reducer) {
  let state;
  let subscribedListener;
  let betterListeners = [];
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

    betterListeners.forEach(listener => listener());
  }
  // provide a callback to run any time an action is dispatched
  // provide a way to stop running that callback when the dev decides
  function subscribe(listener) {
    subscribedListener = listener;

    return function() {
      subscribedListener = undefined;
    }
  }

  // subscribe() actually lets you add and remove multiple listeners
  // let's build that in betterSubscribe()
  function betterSubscribe(listener) {
    betterListeners.push(listener);

    return function() {
      betterListeners = betterListeners.filter(l => l !== listener);
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
    betterSubscribe
  }
}

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
