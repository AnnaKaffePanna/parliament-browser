import { View, Text } from "react-native";

export const MembersRow = ({ member }) => {
  return (
    <View>
      <Text>{member.name}</Text>
    </View>
  );
};
