/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

export const actions = {
  SHOW_MODAL: "Modal/SHOW_MODAL",
  HIDE_MODAL: "Modal/HIDE_MODAL",
};

export const initialState = {
  show: false,
  withHeader: true,
  header: {
    title: "",
    icon: "",
    components: [],
  },
  body: {
    text: "",
    components: [],
  },
  footer: {
    withButtons: false,
    components: [],
  },
  containerStyle: {},
  exitable: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case actions.SHOW_MODAL: {
      return {
        ...state,
        show: true,
        ...action.payload,
      };
    }

    case actions.HIDE_MODAL: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
