/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext } from "react";

import { initialState } from "./modal-reducer";

interface ModalContextValue {
  showModal: (payload: any) => void;
  hideModal: () => void;
  show: boolean;
  withHeader: boolean;
  header: {
    title: string;
    icon: any;
    components: string[];
  };
  body: {
    text: string;
    components: string[];
  };
  footer: {
    withButtons: boolean;
    components: string[];
  };
  containerStyle: object;
  exitable: boolean;
}

export const ModalContext = createContext<ModalContextValue>({
  ...initialState,
  showModal: (payload: any) => ({ payload }),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideModal: () => {},
});
