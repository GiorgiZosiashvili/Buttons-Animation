import React from "react";

import { StyleSheet, Dimensions, Pressable } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const Text_Jumping = ["J", "u", "m", "p", "i", "n", "g"];

const { height, width } = Dimensions.get("screen");

const jumpingAnimation = ({ Colors }) => {
  const yAxisTranslateValue = Text_Jumping.map(() => useSharedValue(0));

  const textTranslateStyle = Text_Jumping.map((text, i) =>
    useAnimatedStyle(() => {
      return {
        fontSize: width / 13,
        color: Colors.white,
        fontWeight: "500",
        margin: 0.5,
        transform: [
          {
            translateY: yAxisTranslateValue[i].value,
          },
        ],
      };
    })
  );

  const Action = () => {
    for (let i = 0; i < Text_Jumping.length; i++) {
      yAxisTranslateValue[i].value = withDelay(
        i * 70,
        withTiming(-10, {}, () => {
          yAxisTranslateValue[i].value = withTiming(0);
        })
      );
    }
  };
  return (
    <Pressable
      onPress={Action}
      style={[styles.pressable, { backgroundColor: Colors.sky }]}
    >
      <Animated.View style={styles.JumpingCont}>
        {Text_Jumping.map((text, i) => (
          <Animated.Text key={i} style={textTranslateStyle[i]}>
            {text}
          </Animated.Text>
        ))}
      </Animated.View>
    </Pressable>
  );
};

export default jumpingAnimation;

const styles = StyleSheet.create({
  pressable: {
    width: width / 1.9,
    height: height / 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 20,
  },
  JumpingCont: {
    flexDirection: "row",
  },
});
