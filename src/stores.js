import {
  writable
} from "svelte/store";

export const genders = writable(["not sure", "male", "female", "both"]);
