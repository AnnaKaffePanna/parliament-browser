import React from "react";
import { Avatar, ListItem } from "react-native-elements";

import noImage from "../assets/no-image.png";

export const MemberRow = ({ member }) => {
  // Remove numbers, "---", and the following space from the city string using regular expressions
  const formattedCity = member.city.replace(/\d+ |-{3} /g, "");

  return (
    <>
      <ListItem>
        {member.image && member.image.url ? (
          <Avatar
            size="large"
            avatarStyle={{ marginBottom: -20 }}
            rounded
            source={{ uri: member.image.url }}
          />
        ) : (
          <Avatar
            size="large"
            avatarStyle={{ marginBottom: -20 }}
            rounded
            source={noImage}
          />
        )}
        <ListItem.Content>
          <ListItem.Title>{member.name}</ListItem.Title>
          <ListItem.Subtitle>{formattedCity}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};
