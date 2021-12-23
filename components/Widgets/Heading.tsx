import { Box, Heading } from "native-base";
import React from "react";

interface HeadingRowProps {
  label: string;
}

export const HeadingRow: React.FC<HeadingRowProps> = ({ label }) => {
  return (
    <Box
      w="full"
      h="16"
      display="flex"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <Heading mr={2}>{label}</Heading>
    </Box>
  );
};
