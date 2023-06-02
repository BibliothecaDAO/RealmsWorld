"use client";

import React, { ReactNode, useReducer } from 'react';
import { actions, initialState, reducer } from './bridge-modal-reducer';
import { BridgeModalContext } from './bridge-modal-context';

interface BridgeModalProviderProps {
    children: ReactNode;
}

export const BridgeModalProvider: React.FC<BridgeModalProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const showModal = payload => {
        hideModal();
        dispatch({
            type: actions.SHOW_MODAL,
            payload
        });
    };

    const hideModal = () => {
        dispatch({
            type: actions.HIDE_MODAL
        });
    };

    const value = {
        ...state,
        showModal,
        hideModal
    };

    return <BridgeModalContext.Provider value={ value }> { children } < /BridgeModalContext.Provider>;
};
