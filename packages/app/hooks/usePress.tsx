interface Props {
  onPress?: (...args: any[]) => void;
  onDoublePress?: (...args: any[]) => void;
  delay?: number;
}

export const usePress = (props: Props): ((...args: any[]) => void) => {
  // time interval between double clicks
  const delayTime = props.delay ?? 200;
  // bool to check whether user tapped once
  let pressCount = 0;
  // the last time user tapped
  let lastTime = new Date().getTime();
  // a timer is used to run the single tap event
  let timer: NodeJS.Timeout | undefined;

  // get the instance of time when pressed
  let now = new Date().getTime();

  return (...args: any[]) => {
    if (pressCount === 0) {
      // set the flag indicating first press has occurred
      pressCount = 1;

      // start a timer --> if a second tap doesn't come in by the delay, trigger singleTap event handler
      timer = setTimeout(() => {
        // check if user passed in prop
        props.onPress?.(...args);

        // reset back to initial state
        pressCount = 0;
        timer = undefined;
      }, delayTime);

      // mark the last time of the press
      lastTime = now;
    } else {
      // if user pressed immediately again within span of delayTime
      if (now - lastTime < delayTime) {
        // clear the timeout for the single press
        timer && clearTimeout(timer);

        // check if user passed in prop for double click
        props.onDoublePress?.(...args);

        // reset back to initial state
        pressCount = 0;
      }
    }
  };
};
