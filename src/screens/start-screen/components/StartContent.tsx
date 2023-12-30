import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "#ui";
import { Colors, CommonStyles } from "#styles";
import { IStartContentData } from "#constants";
import { StartContentNavigationProp } from "#navigation/types";

interface StartContentProps {
  item: IStartContentData;
}

const StartContent: React.FC<StartContentProps> = ({ item }) => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<StartContentNavigationProp>();

  const goSignupHandler = () => {
    navigation.navigate("Signup");
  };

  const goLoginHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[CommonStyles.center, { width }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{item.title}</Text>
        <CustomButton style={styles.button} onPress={goSignupHandler}>
          Sign Up
        </CustomButton>
        <View style={styles.textContainer}>
          <Text style={styles.text2}>Already have an account? </Text>
          <CustomButton mode="flat" onPress={goLoginHandler}>
            Login
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 24,
    color: Colors.black,
    lineHeight: 36,
    textAlign: "center",
    paddingTop: 12,
    paddingBottom: 25,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text2: {
    paddingVertical: 12,
    color: Colors.grey,
  },
  button: {
    width: 310,
  },
});

export default StartContent;
