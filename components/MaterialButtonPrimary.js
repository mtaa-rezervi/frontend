import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonPrimary(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.login}>Login</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "rgba(54,110,255,1)",
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center"
  },
  login: {
    color: "#fff",
    fontSize: 14,
    height: 17,
    width: 55,
    textAlign: "center",
    alignSelf: "center"
  }
});

export default MaterialButtonPrimary;
