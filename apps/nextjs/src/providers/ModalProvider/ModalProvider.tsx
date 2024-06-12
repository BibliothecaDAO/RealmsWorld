/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import type { ReactNode } from "react";
import React, { useReducer } from "react";

import { ModalContext } from "./modal-context";
import { actions, initialState, reducer } from "./modal-reducer";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showModal = (payload: any) => {
    hideModal();
    dispatch({
      type: actions.SHOW_MODAL,
      payload,
    });
  };

  const hideModal = () => {
    dispatch({
      type: actions.HIDE_MODAL,
    });
  };

  const value = {
    ...state,
    showModal,
    hideModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
