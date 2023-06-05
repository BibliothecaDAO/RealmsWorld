'use client'
import { createContext } from 'react';

export const TransfersLogContext = createContext({
    transfers: [],
    addTransfer: (newTransfer: any) => newTransfer,
    updateTransfers: (updatedTransfers: any) => updatedTransfers
});