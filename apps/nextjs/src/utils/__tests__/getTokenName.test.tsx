
import { getTokenName } from "../utils";
import { tokenDetailsMock } from "./mocks/tokenDetailsMock";
import { expect, test } from 'vitest'



test("getTokenName returns decoded name", () => {
    expect(getTokenName(tokenDetailsMock)).toEqual('"Bramble Sun" Troll');
});


test("getTokenName returns token id if name does not exist", () => {
    expect(getTokenName({ ...tokenDetailsMock, name: null })).toEqual('#1795');
});
