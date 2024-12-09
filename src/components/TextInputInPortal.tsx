import { createElement, useEffect, useState } from "react"
import { TextInput, TextInputProps } from "react-native-paper"

type TextInputInAPortalProps = TextInputProps & {
  value: string
  onChangeText: (t: string) => void

}

// Use this whenever you need a TextInput inside that appears inside of a Portal
//
// Wait what now?
// This seems to fix this bug: https://github.com/callstack/react-native-paper/issues/1668
export const TextInputInAPortal = (props: TextInputInAPortalProps) => {
  const [value, setValue] = useState(props.value)

  useEffect(() => {
    if(value !== props.value)
      setValue(props.value)
  }, [props.value])

  const onChangeText = (text: string) => {
    setValue(text)
    props.onChangeText(text)
  }
  return createElement(TextInput, {...props, value, onChangeText})
}