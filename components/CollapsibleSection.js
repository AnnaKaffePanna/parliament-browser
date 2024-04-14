import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

export const CollapsibleSection = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>{children}</Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "bold",
  },
});
