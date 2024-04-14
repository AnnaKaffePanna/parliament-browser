import yaml from "js-yaml";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import noImage from "../assets/no-image.png";
import { CollapsibleSection } from "../components/CollapsibleSection";
import ApiService from "../services/api";

export default function MemberDetails({ route }) {
  const [details, setDetails] = useState({});
  const [latestPeriod, setLatestPeriod] = useState({});
  const [birthday, setBirthday] = useState(null);
  const [roleData, setRoleData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yamlResponseData = await ApiService.getDetailsById(member.id);
        const parsedDataAsJavaScriptObject = yaml.load(yamlResponseData);
        setDetails(parsedDataAsJavaScriptObject);
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

        if (parsedDataAsJavaScriptObject.birthday) {
          setBirthday(parsedDataAsJavaScriptObject.birthday);
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (latestPeriod.role) {
      const fetchRoleData = async () => {
        try {
          const yamlAdditionalData = await ApiService.getRole(
            latestPeriod.role
          );
          if (yamlAdditionalData) {
            const parsedDataAsJavaScriptObject = yaml.load(yamlAdditionalData);
            console.log(parsedDataAsJavaScriptObject);
            setRoleData(parsedDataAsJavaScriptObject);
          }
        } catch (error) {
          // Handle errors
        }
      };
      fetchRoleData();
    }
  }, [latestPeriod.role]);

  function formatDate(dateString) {
    if (!dateString) return ""; // Handle the case where dateString is null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }

  const { member } = route.params;
  const formattedPeriodEnd = formatDate(latestPeriod.period_end);
  const formattedPeriosStart = formatDate(latestPeriod.period_start);
  const formattedCity = member.city.replace(/\d+ |-{3} /g, "");
  const formattedBirthday = birthday ? formatDate(birthday) : "";

  return (
    <SafeAreaView>
      <View style={styles.detailContainer}>
        <View style={styles.nameRoleContainer}>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.role}>{roleData.title}</Text>
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
      <CollapsibleSection title="Allmänna Uppgifter">
        <View style={styles.collapseTextContainer}>
          {details.profession && <Text>Yrke: {details.profession}</Text>}
          {formattedCity && <Text>Hemort: {formattedCity}</Text>}
          {birthday && <Text>Födelsetid: {formattedBirthday}</Text>}
        </View>
      </CollapsibleSection>
      <CollapsibleSection title="Kontaktuppgifter">
        <View style={styles.collapseTextContainer}>
          {details.phone && <Text>Telefon: {details.phone}</Text>}
          {details.email && <Text>Gmail: {details.email}</Text>}
        </View>
      </CollapsibleSection>
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
  collapseTextContainer: {
    marginLeft: 50,
    padding: 10,
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
    marginBottom: 25,
  },
  image: {
    width: windowWidth * 0.8, // Adjust the width as needed
    height: windowWidth * 0.7, // Maintain aspect ratio
    resizeMode: "contain",
  },
});
