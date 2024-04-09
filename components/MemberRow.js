import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import noImage from "../assets/no-image.png";

export const MemberRow = ({ member }) => {
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
          <ListItem.Subtitle>{member.city}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const styles = StyleSheet.create({});
