import { StyleSheet, Dimensions, Pressable } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
const { height, width } = Dimensions.get("screen");

const Text_Drive = ["", "D", "r", "i", "v", "e"];

const driveAnimation = ({ Colors }) => {
  const xAxisTranslateValue = Text_Drive.map(() => useSharedValue(0));

  const skewXTranslateValue = Text_Drive.map(() => useSharedValue(0));

  const viewMotionValue = useSharedValue(15);

  const Action = () => {
    for (let i = 0; i < Text_Drive.length; i++) {
      xAxisTranslateValue[i].value = withDelay(
        i * 10,
        withDelay(
          250,
          withRepeat(
            withTiming(60, { duration: 1100 }, () => {
              xAxisTranslateValue[i].value = -40;
              xAxisTranslateValue[i].value = withTiming(0);
            }),
            -1,
            true
          )
        )
      );
    }
    for (let i = 0; i < Text_Drive.length; i++) {
      skewXTranslateValue[i].value = withDelay(
        i * 25,
        withRepeat(
          withTiming(30, { duration: 1100 }, () => {
            skewXTranslateValue[i].value = withTiming(0, { duration: 500 });
          }),
          -1,
          true
        )
      );
    }
    viewMotionValue.value = withDelay(
      300,
      withRepeat(
        withTiming(260, { duration: 950 }, () => {
          viewMotionValue.value = 15;
        }),
        -1,
        true
      )
    );
  };
  const motionStyle = useAnimatedStyle(() => {
    return {
      left: viewMotionValue.value,
      opacity: viewMotionValue.value != 15 ? 1 : 0,
    };
  });
  const textTranslateStyle = Text_Drive.map((t, i) =>
    useAnimatedStyle(() => {
      return {
        fontSize: width / 13,
        color: Colors.white,
        fontWeight: "500",
        transform: [
          {
            translateX: xAxisTranslateValue[i].value,
          },
          { skewX: ` ${skewXTranslateValue[i].value}deg` },
        ],
        opacity: interpolate(
          xAxisTranslateValue[i].value,
          [-45, 0, 45],
          [0.1, 1, 0]
        ),
      };
    })
  );

  return (
    <Pressable
      onPress={Action}
      style={[styles.pressable, { backgroundColor: Colors.white }]}
    >
      <Animated.View style={styles.SmokeCont}>
        {Text_Drive.map((text, i) => (
          <Animated.Text
            key={i}
            style={[textTranslateStyle[i], { color: Colors.sky, margin: 0.5 }]}
          >
            {text}
          </Animated.Text>
        ))}
      </Animated.View>
      <Animated.View style={[styles.fakeView, motionStyle]} />
    </Pressable>
  );
};

export default driveAnimation;

const styles = StyleSheet.create({
  pressable: {
    width: width / 1.9,
    height: height / 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 10,
    overflow: "hidden",
  },
  SmokeCont: {
    flexDirection: "row",
  },
  fakeView: {
    backgroundColor: "white",
    transform: [{ skewX: "45deg" }],
    width: 30,
    height: height / 23,
    position: "absolute",
    left: 0,
  },
});
