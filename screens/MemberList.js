import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MemberRow } from "../components/MemberRow";
import { Search } from "../components/Search";
import ApiService from "../services/api";

export default function MemberList({ navigation }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await ApiService.getAllMembers();
        setMembers(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  let filteredMembers = members;

  if (searchText.trim() !== "") {
    // Should priorities first names
    const filteredStartsWith = members.filter((member) =>
      member.name.toLowerCase().startsWith(searchText.toLowerCase())
    );

    // Second priority is items which have the searchText ex. if
    // we search L, Lars should be first but Albert should still
    // be visible in the list
    let remainingMembers = members.filter((member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Remove duplicated from the list
    remainingMembers = remainingMembers.filter(
      (member) => !filteredStartsWith.includes(member)
    );

    // Combine the search results
    filteredMembers = [...filteredStartsWith, ...remainingMembers];
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Laddar...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Search searchText={searchText} onSearch={handleSearch} />
      <FlatList
        data={filteredMembers}
        renderItem={({ item }) => (
          <MemberRow
            member={item}
            onPress={() =>
              navigation.navigate("MemberDetails", { member: item })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
