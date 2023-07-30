import { useState, useEffect } from "react";
import useDefineState from "@jswork/use-define-state";

// Usage example
const MyComponent = () => {
  const { state, ...actions } = useDefineState({
    state: {
      data: { name: { firstName: "John", lastName: "Doe" } },
      isLoading: true,
    },
    getters: {
      fullName: (state: any) =>
        state.data.name.firstName + " " + state.data.name.lastName,
    },
    actions: {
      changeFirstName: (state: any, payload: any) => {
        state.data.name.firstName = payload;
      },
    },
  });

  // Simulate data fetching
  useEffect(() => {
    state.isLoading = false;
    state.data.name.firstName = "Jane";
    state.data.name.lastName = "Smith";
  }, []);

  console.log("render?", state, actions);

  return (
    <div>
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>Data: {state.data.name.firstName}</div>
      )}
      <div>Full Name: {state.fullName}</div>
      <button
        onClick={(e) => {
          state.data.name.firstName = Math.random();
        }}
      >
        Change state
      </button>
    </div>
  );
};

export default MyComponent;
