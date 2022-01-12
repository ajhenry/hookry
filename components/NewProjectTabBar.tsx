import { Box, Heading } from "native-base";
import * as React from "react";
import {
  Animated,
  Easing,
  I18nManager,
  StyleProp,
  ViewStyle
} from "react-native";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar as TabBarTV
} from "react-native-tab-view";
import { theme } from "../utils/theme";

export type GetTabWidth = (index: number) => number;

export type Props<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  getTabWidth: GetTabWidth;
};

export class TabBarIndicator<T extends Route> extends React.Component<
  Props<T>
> {
  componentDidMount() {
    this.fadeInIndicator();
  }

  componentDidUpdate() {
    this.fadeInIndicator();
  }

  private fadeInIndicator = () => {
    const { navigationState, layout, width, getTabWidth } = this.props;

    if (
      !this.isIndicatorShown &&
      width === "auto" &&
      layout.width &&
      // We should fade-in the indicator when we have widths for all the tab items
      navigationState.routes.every((_, i) => getTabWidth(i))
    ) {
      this.isIndicatorShown = true;

      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 150,
        easing: Easing.in(Easing.linear),
        useNativeDriver: true,
      }).start();
    }
  };

  private isIndicatorShown = false;

  private opacity = new Animated.Value(this.props.width === "auto" ? 0 : 1);

  private getTranslateX = (
    position: Animated.AnimatedInterpolation,
    routes: Route[],
    getTabWidth: GetTabWidth
  ) => {
    const inputRange = routes.map((_, i) => i);

    // every index contains widths at all previous indices
    const outputRange = routes.reduce<number[]>((acc, _, i) => {
      if (i === 0) return [0];
      return [...acc, acc[i - 1] + getTabWidth(i - 1)];
    }, []);

    const translateX = position.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp",
    });

    return Animated.multiply(translateX, I18nManager.isRTL ? -1 : 1);
  };

  render() {
    const { position, navigationState, getTabWidth, width, style, layout } =
      this.props;
    const { routes } = navigationState;

    const transform = [];

    if (layout.width) {
      const translateX =
        routes.length > 1
          ? this.getTranslateX(position, routes, getTabWidth)
          : 0;

      transform.push({ translateX });
    }

    const indicatorWidth = routes[navigationState.index].title!.length * 8 + 30;

    return (
      <Box h={layout.height / 4} display="flex" justifyContent="center">
        <Animated.View
          style={[
            {
              marginLeft:
                getTabWidth(navigationState.index) / 2 - indicatorWidth / 2,
              backgroundColor: "rgb(220,220,220)",
              height: 30,
              width: indicatorWidth,
              borderRadius: 10,
            },
            { transform },
          ]}
        />
      </Box>
    );
  }
}

export const TabBar: React.FC<
  SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  } & { onTabPress: (...props: any[]) => any }
> = (props) => {
  return (
    <TabBarTV
      {...props}
      style={{ backgroundColor: "transparent" }}
      renderLabel={({ route, focused, color }) => (
        <Heading
          {...theme.text.heading}
          fontSize="md"
          color={focused ? "rgb(0,0,0)" : "rgb(155,155,155)"}
        >
          {route.title}
        </Heading>
      )}
      renderIndicator={(props) => <TabBarIndicator {...props} />}
    />
  );
};
