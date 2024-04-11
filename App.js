import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { MemberRow } from "./components/MemberRow";
import { Search } from "./components/Search";
import ApiService from "./services/api";

export default function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await ApiService.getAllMembers();
        setMembers(responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
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
    // First name search should be priority
    const filteredStartsWith = members.filter((member) =>
      member.name.toLowerCase().startsWith(searchText.toLowerCase())
    );

    // Includes if the search text appears any where in the name, so ex. If we search on L
    // Lars comes up first but Alarik and even later Lundberg is still included.
    let remainingMembers = members.filter((member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Exclude members that were already included in the first filter
    remainingMembers = remainingMembers.filter(
      (member) => !filteredStartsWith.includes(member)
    );

    // Combine the two filtered lists
    filteredMembers = [...filteredStartsWith, ...remainingMembers];
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Search searchText={searchText} onSearch={handleSearch} />
        <FlatList
          data={filteredMembers}
          renderItem={({ item }) => <MemberRow member={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
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
