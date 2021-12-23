import { Box, Heading } from "native-base";
import React from "react";

interface TimestampProps {}

export const Timestamp: React.FC<TimestampProps> = () => {
  return (
    <Box
      w="full"
      h="16"
      display="flex"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <Heading mr={2}>12 mins 45 secs</Heading>
    </Box>
  );
};
