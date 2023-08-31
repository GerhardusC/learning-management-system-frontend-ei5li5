"use client";
import { Provider } from "react-redux";
import { store } from "./store";
// The providers have to be built like this in the Next.js app router.
export const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
