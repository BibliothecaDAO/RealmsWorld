
export interface WizardContext {
    race: CreationObject,
    sex: CreationObject,
    class: CreationObject,
    skin: CreationObject,
    age: CreationObject,
    expression: CreationObject,
}

export interface CreationObject {
    id: 'race' | 'sex' | 'class' | 'skin' | 'age' | 'expression',
    content: string,
    value: string,
}

export interface Image {
    url: string,
    uuid: string,
    id: number,
    user_id?: string,
    label?: string
}