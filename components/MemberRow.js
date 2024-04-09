import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import noImage from "../assets/no-image.png";

export const MemberRow = ({ member }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {member.image && member.image.url ? (
          <Image source={{ uri: member.image.url }} style={styles.image} />
        ) : (
          <Image source={noImage} style={styles.image} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{member.name}</Text>
        <Text style={styles.text}>{member.city}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});
