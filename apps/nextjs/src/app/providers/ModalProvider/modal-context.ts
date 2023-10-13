"use client";

import { createContext } from 'react';

import { initialState } from './modal-reducer';

interface ModalContextValue {
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

export const ModalContext = createContext<ModalContextValue>({
    ...initialState,
    showModal: (payload: any) => ({ payload }),
    hideModal: () => { }
});