const redux = require("redux");

//Bikin reducer -> kaya setState versi redux
const rootReducer = (currentState = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return currentState + 1;
    case "DECREMENT":
      return currentState - 1;
    default:
      return currentState;
  }
};

//inisialisasi -> bikin store atau storagenya
const redStore = redux.createStore(rootReducer);

console.log("State default : ", redStore.getState());

redStore.dispatch({ type: "INCREMENT" });

console.log("State after : ", redStore.getState());
