import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboardState = (
  config = { useWillShow: true, useWillHide: true }
): [boolean, () => void] => {
  const { useWillShow, useWillHide } = config;
  const [visible, setVisible] = useState(false);
  const showEvent = useWillShow ? "keyboardWillShow" : "keyboardDidShow";
  const hideEvent = useWillHide ? "keyboardWillHide" : "keyboardDidHide";

  function dismiss() {
    Keyboard.dismiss();
    setVisible(false);
  }

  useEffect(() => {
    function onKeyboardShow() {
      setVisible(true);
    }

    function onKeyboardHide() {
      setVisible(false);
    }

    const showSubscription = Keyboard.addListener(showEvent, onKeyboardShow);
    const hideSubscription = Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [useWillShow, useWillHide]);

  return [visible, dismiss];
};
