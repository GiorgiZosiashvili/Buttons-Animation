import { StyleSheet, Dimensions, Pressable, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useState } from "react";

const { height, width } = Dimensions.get("screen");

const Text_Smoke = ["S", "m", "o", "k", "e"];

const smokeAnimation = ({ Colors }) => {
  const xAxisTranslateValue = Text_Smoke.map(() => useSharedValue(0));

  const yAxisTranslateValue = Text_Smoke.map(() => useSharedValue(0));

  const [blur, setBlur] = useState(0);

  const Action = () => {
    runOnJS(setBlur)(10);
    for (let i = 0; i < Text_Smoke.length; i++) {
      xAxisTranslateValue[i].value = withDelay(
        i * 15,
        withRepeat(
          withTiming(190, { duration: 1300 }, () => {
            xAxisTranslateValue[i].value = -20;
            xAxisTranslateValue[i].value = withTiming(0);
            runOnJS(setBlur)(0);
          }),
          -1,
          true
        )
      );
    }
    for (let i = 0; i < Text_Smoke.length; i++) {
      yAxisTranslateValue[i].value = withDelay(
        i * 60,
        withRepeat(
          withTiming(-100, { duration: 1200 }, () => {
            yAxisTranslateValue[i].value = 0;
          }),
          -1,
          true
        )
      );
    }
  };

  const textTranslateStyle = Text_Smoke.map((t, i) =>
    useAnimatedStyle(() => {
      return {
        zIndex: -1,
        fontSize: width / 13,
        color: Colors.white,
        fontWeight: "500",
        margin: 0.5,
        transform: [
          {
            translateX: xAxisTranslateValue[i].value,
          },
          {
            translateY: yAxisTranslateValue[i].value,
          },
        ],
        opacity: interpolate(
          xAxisTranslateValue[i].value,
          [-10, 0, 60],
          [0.5, 1, 0]
        ),
      };
    })
  );

  return (
    <Pressable
      onPress={Action}
      style={[styles.pressable, { backgroundColor: Colors.dark }]}
    >
      <View intensity={3} style={styles.SmokeCont}>
        {Text_Smoke.map((text, i) => (
          <Animated.Text key={i} style={textTranslateStyle[i]}>
            {text}
          </Animated.Text>
        ))}
      </View>
      <BlurView intensity={blur} tint="dark" style={[styles.blur]} />
    </Pressable>
  );
};

export default smokeAnimation;

const styles = StyleSheet.create({
  pressable: {
    width: width / 1.9,
    height: height / 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 20,
    overflow: "hidden",
  },
  SmokeCont: {
    flexDirection: "row",
  },
  blur: {
    overflow: "hidden",
    position: "absolute",
    width: width / 2,
    height: height / 13,
    borderRadius: 100,
    marginVertical: 20,
  },
});
