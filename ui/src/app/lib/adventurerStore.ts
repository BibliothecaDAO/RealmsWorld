'use client'
import create from 'zustand';

export interface Character {
    culture: string;
    sex: string;
    advClass: string;
    skin: string;
    age: string;
    expression: string;
}

type CharacterStore = {
    character: Character;
    setCharacter: (trait: keyof Character, value: string) => void;
    resetCharacter: () => void;
};

const useAdventurerStore = create<CharacterStore>((set) => ({
    character: {
        culture: '',
        sex: '',
        advClass: '',
        skin: '',
        age: '',
        expression: '',
    },
    setCharacter: (trait, value) => {
        set((state) => ({
            character: {
                ...state.character,
                [trait]: value,
            },
        }));
    },
    resetCharacter: () =>
        set({
            character: {
                culture: '',
                sex: '',
                advClass: '',
                skin: '',
                age: '',
                expression: '',
            }
        }),
}));

export default useAdventurerStore;