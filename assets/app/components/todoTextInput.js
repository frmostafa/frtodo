import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TodoTextInput({ icon, onAdd, ...otherProps }) {

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        {...otherProps}
      />
      <TouchableWithoutFeedback onPress={onAdd}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={25} color="#fff" />
        )}
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#3E3364",
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "#575074",
    borderWidth: 3,
    padding: 15,
    height: 65,
    alignItems: "center",
    marginVertical: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    width: "100%",
    marginLeft: 10,
    flex: 1,
    color : "#fff"
  },
});
