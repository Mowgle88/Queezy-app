import React from "react";
import { StyleSheet } from "react-native";
import {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "#styles";

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
      style={styles.toast}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      renderLeadingIcon={() => (
        <Icon name="checkmark-circle-outline" size={35} color={Colors.green} />
      )}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
      style={[styles.toast, styles.errorToast]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      renderLeadingIcon={() => (
        <Icon name="alert-circle-outline" size={35} color={Colors.red} />
      )}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    width: "90%",
    backgroundColor: Colors.mintTulip,
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
    height: "auto",
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderLeftColor: Colors.green,
    borderRightColor: Colors.green,
  },
  errorToast: {
    backgroundColor: Colors.pastelPink,
    borderLeftColor: Colors.pinkSalmon,
    borderRightColor: Colors.pinkSalmon,
  },
  text1Style: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.grey,
  },
  text2Style: {
    fontSize: 14,
    color: Colors.grey,
  },
});

export default toastConfig;
