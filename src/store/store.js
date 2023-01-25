import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
      email: (state = "", action) => {
        switch (action.type) {
          case "SET_EMAIL":
            return action.payload;
          default:
            return state;
        }
      },
      password: (state = "", action) => {
        switch (action.type) {
          case "SET_PASSWORD":
            return action.payload;
          default:
            return state;
        }
      }
    }
  });
  
  export default store;