"use client";

import { createContext } from 'react';

import { initialState } from './bridge-modal-reducer';

interface BridgeModalContextValue {
    showModal: (payload: any) => void;
    hideModal: () => void;
    show: boolean;
    withHeader: boolean,
    header: {
        title: string,
        icon: any,
        components: Array<string>
    },
    body: {
        text: string,
        components: Array<string>
    },
    footer: {
        withButtons: boolean,
        components: Array<string>
    },
    containerStyle: object,
    exitable: boolean
}

export const BridgeModalContext = createContext<BridgeModalContextValue>({
    ...initialState,
    showModal: (payload: any) => ({ payload }),
    hideModal: () => { }
});