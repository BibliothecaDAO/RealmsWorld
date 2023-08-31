"use client";

import React, { ReactNode, useReducer } from "react";
import { actions, initialState, reducer } from "./modal-reducer";
import { ModalContext } from "./modal-context";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
