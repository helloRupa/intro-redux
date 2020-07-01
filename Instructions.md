# Build Mini Redux
Let's build an even lighter version of Redux to understand how it works and why it works that way.

## 1. createStore(reducer)
This function returns an object (POJO) that has some methods available on it. Typically, we store the object returned in a variable called `store`. The `store` gives us access to the state of our app and allows us to update that state using functional programming.

- `createStore()` is a function. It stores a reference to the store's state as a POJO ({}). The state is reassignable.
- It takes a single argument: `reducer`.
- It returns a POJO that makes some methods available to us. The methods are `getState()` and `dispatch()`. Stub those out for now and have them return a string containing the name of the function. You'll fill them in later.

> Test your code by creating a store, and then calling methods upon it to check that there are no errors.

## 2. getState()
- `getState()` returns the state of the store. That's it.

> Test that the state is being returned.

## 3. Stub out the catReducer()
Reducers are pure functions. That means they have no side effects and are entirely reliant on their inputs to produce an output. This makes them wonderfully predictable. Reducers are called reducers because they reduce their inputs to a single value (the new state), similar to Array.prototype.reduce().

All code will be written outside of `createStore()` since this code is specific to each app. In other words, Redux requires you to write this code yourself anyway.

1. Declare the initial state you want to use for your app by storing it in an object like so:
```
const initialCatState = {
  cats: ['Meowser', 'Charlie', 'Fluffanilla'],
  selectedCat: 'Meowser'
};
```
2. Declare a reducer called `catReducer()`. It should be a function that takes two arguments: state, action.
3. Create a `switch` statement that determines which code runs based on the action type. For now, just add a default case that returns the state.

> Test that the reducer returns the initial state when invoked with the following arguments: `undefined`, `{ type: 'QUICK_MAFFS_INIT' }`.

## 4. dispatch(action)
This function calls the reducer with the current state in the store and an action. It then uses the returned value from the reducer to update the store with the new state.

- `dispatch()` takes a single argument (action).
- It sets the store's state by calling the `reducer` with the current state of the store and the action.

> Test your code by updating the call to `createStore` by passing in the `catReducer`. Next, call `dispatch()` on the `store` with the same action as before. Call `store.getState()` to check if the store's state was updated correctly.

## 5. Update createStore() to set the initial state as soon as it's invoked with a reducer
When successful, you should be able to do this:
```
const store = createStore(catReducer);
store.getState(); // returns initialCatState
```

## 6. Create an action that adds a cat to the state
An action is a POJO. It has one mandatory key: `type`, and one optional key that is referred to as payload. The payload actually goes by many names in practice and its name is usually determined by what the payload is.

Actions are like HTTP requests. The `type` tells the reducer what you want to do: Do you want to add a cat? Do you want to select a cat? Delete a cat, you monster!? This is similar to the HTTP verb or method, like PATCH or POST. The payload contains data that is necessary to complete the action. For example, it might contain the name of a cat. The payload is similar to the body of an HTTP request, which contains the information needed to complete the request when making a POST or PATCH request.

1. Declare an action called `addCat`. Its `type` will be `'ADD_CAT'` and the payload can be any name you like. Give the payload a key of `cat`.

> How can we make this more flexible? What if we wanted to add a cat with any name of our choosing? What can we do? Action creator!

## 7. Update the catReducer to respond to our ADD_CAT action type
The reducer currently has a default case, which returns the current state. We need to make it add a cat to our cats array. Keep the following in mind:

- Reducers are pure functions, so they cannot mutate state.
- They must always return the state.

> Test your code by dispatching an action to the store, and then checking if the cat has been added.

## 8. Add the ability to select a cat
Our state contains a key: `selectedCat`. What can we do to select a new cat? How can we make sure that only existing cats are selected (e.g. cats in the cats Array)?

> Test to see that you can select a cat. And that you can't select a non-existent cat.

# ---------- BONUS ----------

## 9. subscribe(listener)
Add the `subscribe()` method to `createStore()`. `subscribe()` is used to run a callback any time the store's state _might_ have changed.

1. This method is called on the store with a callback called `listener`. 
2. That callback is automatically run any time an action is dispatched.

> Test your code. Dispatch an action, there should be no errors. Subscribe a listener that logs a string to the console, maybe 'You\ve subscribed!'. Dispatch several actions. Your string should print every time.

## 10. Add the ability to unsubscribe
1. When calling `subscribe()` on the store, it should return a method that allows you to unsubscribe the listener.

> Test your code. Run the following code:
```
const unsubscribe = store.subscribe(() => { console.log('Subscribed to the Dispatch Daily!'); });
store.dispatch(selectCat('Charlie')); // should print the string
unsubscribe();
store.dispatch(selectCat('Charlie')); // Nothing should print
```
