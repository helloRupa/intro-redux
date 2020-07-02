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

const addOwner = owner => ({
  type: 'ADD_OWNER',
  owner
});