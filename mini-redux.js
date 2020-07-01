function createStore(reducer) {
  let state = {};

  // 1. return the state from the store
  function getState() {
    return 'Getting the state';
  }

  // 3. use dispatch to call the reducer and update the state, test that you can set the initial state
  // 4. how can we set the initial state as soon as the store is created?
  function dispatch(action) {
    return 'Dispatching an action';
  }

  // BONUS 1: subscribe provides the ability to run a function any time the state might have changed
  // Once you get that working, add the ability to unsubscribe so that the function is no longer called
  function subscribe(listener) {
    
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

const initialCatState = {
  cats: ['Meowser', 'Charlie', 'Fluffanilla'],
  selectedCat: 'Meowser',
  owner: 'Meee'
};

// 2. Using a switch statement, return the state by default, then test that this works by providing a nonsense action
// 6. Update this to add a cat to cats in the state, i.e. make it respond to our action
function catReducer(state=initialCatState, action) {
  
}

// 5. Create the addCat action to add a cat to cats in the state
//    Can we make this flexible? So that we can add a cat with any name?

// 7. Add code to change the selectedCat in the relevant places in this file

const store = createStore(catReducer);

// BONUS 2: Uncomment the code below, use combineReducers() to combine the catReducer
// and dogReducer into a rootReducer. Make a second store called mulitStore using that.
// If you've gotten that working, when you call multiStore.getState(), the state will
// contain cat and dog info. Next, create a new addOwner action, and make both cats and
// dogs respond to it.

/**********************************************/
/***  DOG STUFF TO UNCOMMENT IF WE GET HERE ***/
/**********************************************/

// const dogState = {
//   dogs: ['Chi Chi', 'Paw Paw'],
//   selectedDog: 'Chi Chi',
//   owner: 'You'
// };

// const dogReducer = (state=dogState, action) => {
//   switch(action.type) {
//     case 'ADD_DOG':
//       return {
//         ...state,
//         dogs: [...state.dogs, action.dog]
//       };
//     case 'SELECT_DOG':
//       if (state.dogs.includes(action.dog)) {
//         return {
//           ...state,
//           selectedDog: action.dog
//         }
//       } else {
//         return state;
//       }
//     case 'ADD_OWNER':
//       return {
//         ...state,
//         owner: action.owner
//       }
//     default:
//       return state;
//   }
// };

// const addDog = dog => ({
//   type: 'ADD_DOG',
//   dog
// });

// const selectDog = dog => ({
//   type: 'SELECT_DOG',
//   dog
// });


// function combineReducers(reducerPOJO) {
//   return function(state, action) {
//     let combinedState = {};
//     let hasChanged = false; 

//     for (const key in reducerPOJO) {
//       const stateSlice = state ? state[key] : undefined;
//       const newSlice = reducerPOJO[key](stateSlice, action);

//       combinedState[key] = newSlice;

//       if (stateSlice !== newSlice) {
//         hasChanged = true;
//       }
//     }

//     return (hasChanged) ? combinedState : state;
//   };
// }

