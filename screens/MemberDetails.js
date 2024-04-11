import React, {useState, useEffect} from "react";
import { View, Text, Image, StyleSheet, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import noImage from "../assets/no-image.png";
import ApiService from "../services/api";

export default function MemberDetails({ route }) {
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await ApiService.getDetailsByOneMember();
        setDetails(responseData);
      } catch (error) {}
    };
    fetchData();
  }, "");

  const { member } = route.params;
  return (
    <SafeAreaView>
      <View style={styles.detailContainer}>
        <View style={styles.nameRoleContainer}>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.role}>Orförande</Text>
        </View>
        {member.image && member.image.url ? (
          <Image source={{ uri: member.image.url }} style={styles.image} />
        ) : (
          <Image source={noImage} style={styles.image} />
        )}
      </View>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  detailContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nameRoleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  role: {
    marginTop: 5,
    fontSize: 17,
  },

  image: {
    width: windowWidth * 0.8, // Adjust the width as needed
    height: windowWidth * 0.7, // Maintain aspect ratio
    resizeMode: "contain",
  },
});
