// store.js
// A simple in-memory array to hold users
export const usersInMemory = [];

// A helper to add a new user
export function addUser(user) {
  usersInMemory.push(user);
}

