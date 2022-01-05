import {
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";

export const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
