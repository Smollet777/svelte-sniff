import {
  writable
} from "svelte/store";

function gendersCRUD() {

  const {
    subscribe,
    set,
    update
  } = writable(["not sure", "male", "female", "both"])
  return {
    subscribe,
    add: (value) => update(arr => [...arr, value]),
    set: (arr) => set(arr)
  };
}

export const genders = gendersCRUD()
