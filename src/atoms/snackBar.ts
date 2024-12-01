import { atom } from "jotai";

interface snackBar{
  visible: boolean
  message: string
}

export const snackBarAtom = atom<snackBar>({visible: false, message: ""});
