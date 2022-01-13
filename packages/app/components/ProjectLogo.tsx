import { Avatar, Image } from "native-base";
import React from "react";
import { generateAvatarInitials } from "../utils/defaults";

interface Props {
  projectImage: string | null | undefined;
  projectName: string | undefined;
  color: string;
  size?: number;
}

export const ProjectLogo = ({
  projectImage,
  projectName,
  color,
  size,
}: Props) => {
  return projectImage ? (
    <Image
      size={size ?? 24}
      bg={color}
      key={Date.now()}
      source={{
        uri: projectImage,
      }}
      borderRadius="full"
      alt="Project Image"
    />
  ) : (
    <Avatar size={size ?? 24} bg={color} fontSize="2xl">
      {generateAvatarInitials(projectName ?? "E D")}
    </Avatar>
  );
};
