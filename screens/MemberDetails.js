import yaml from "js-yaml";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import noImage from "../assets/no-image.png";
import ApiService from "../services/api";

export default function MemberDetails({ route }) {
  const [details, setDetails] = useState({});
  const [latestPeriod, setLatestPeriod] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yamlResponseData = await ApiService.getDetailsByOneMember(
          member.id
        );
        const parsedDataAsJavaScriptObject = yaml.load(yamlResponseData);
        setDetails(parsedDataAsJavaScriptObject);
        // Check if details.bindings exists before accessing it
        if (
          parsedDataAsJavaScriptObject.bindings &&
          parsedDataAsJavaScriptObject.bindings.length > 0
        ) {
          const latestPeriodData =
            parsedDataAsJavaScriptObject.bindings[
              parsedDataAsJavaScriptObject.bindings.length - 1
            ];
          setLatestPeriod(latestPeriodData);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }

  const { member } = route.params;
  const formattedPeriodEnd = formatDate(latestPeriod.period_end);
  const formattedPeriosStart = formatDate(latestPeriod.period_start);

  return (
    <SafeAreaView>
      <View style={styles.detailContainer}>
        <View style={styles.nameRoleContainer}>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.role}>Ordförande</Text>
        </View>
        {member.image && member.image.url ? (
          <Image source={{ uri: member.image.url }} style={styles.image} />
        ) : (
          <Image source={noImage} style={styles.image} />
        )}
        <Text style={styles.period}>
          Period: {formattedPeriosStart} - {formattedPeriodEnd}
        </Text>
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
  period: {
    marginTop: 20,
    fontSize: 17,
  },
  image: {
    width: windowWidth * 0.8, // Adjust the width as needed
    height: windowWidth * 0.7, // Maintain aspect ratio
    resizeMode: "contain",
  },
});
