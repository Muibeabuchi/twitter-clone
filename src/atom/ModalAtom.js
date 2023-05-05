import {atom} from "recoil";

export const modalAtom = atom({
key:'modalatom',
default:false,
})

export const postIdAtom = atom({
    key:'postIdAtom',
    default: 'id',
})