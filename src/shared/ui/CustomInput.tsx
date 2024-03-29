import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ImageRequireSource,
  Pressable,
} from "react-native";
import VectorImage from "react-native-vector-image";
import { Colors } from "#styles";
import { formIcons } from "#constants";

interface InputProps {
  label: string;
  keyboardType: KeyboardTypeOptions;
  secure: boolean;
  onUpdateValue: (text: string) => void;
  value: string;
  placeholder: string;
  isInvalid: boolean;
  source?: ImageRequireSource;
  onUpdateSecure?: () => void;
  isPassword?: boolean;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  placeholder,
  isInvalid,
  source,
  onUpdateSecure,
  isPassword,
}) => {
  return (
    <View style={styles.CustomInputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          isInvalid && styles.inputContainerInvalid,
        ]}>
        {source && <VectorImage style={styles.vectorImage} source={source} />}
        <TextInput
          style={[styles.input, isInvalid && styles.inputInvalid]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          placeholder={placeholder}
          value={value}
        />
        {isPassword && (
          <Pressable onPress={onUpdateSecure}>
            {secure ? (
              <VectorImage source={formIcons.Secure} />
            ) : (
              <VectorImage source={formIcons.Unprotected} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CustomInputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.grey,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.grey,
  },
  inputContainer: {
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.grey4,
  },
  inputContainerInvalid: {
    backgroundColor: Colors.pastelPink,
    borderColor: Colors.pinkSalmon,
  },
  vectorImage: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.white,
    color: Colors.royalBlue,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.pastelPink,
  },
});

export default CustomInput;
