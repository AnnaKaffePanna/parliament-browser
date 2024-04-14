import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

export const CollapsibleSection = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={styles.header}
      >
        <View style={styles.titleSymbolContainer}>
          <Text style={styles.title}>{title}</Text>
          <AntDesign
            name={collapsed ? "rightcircleo" : "downcircleo"}
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>{children}</Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  titleSymbolContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  title: {
    marginRight: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
});
