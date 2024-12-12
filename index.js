function createState(initialValue) {
  let state = initialValue; // Initialize the state

  // Getter function to access the state
  const getState = () => state;

  // Setter function to update the state
  const setState = newState => {
    state = newState;
  };

  // Return both getter and setter
  return [getState, setState];
}

// Example Usage:

// Initialize state with an initial value
const [getValue, setValue] = createState(0);

// Accessing the state
console.log(getValue()); // Outputs: 0

// Updating the state
setValue(42);

// Accessing the updated state
console.log(getValue()); // Outputs: 42
