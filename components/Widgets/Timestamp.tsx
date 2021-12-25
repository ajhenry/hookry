import { Box, Heading } from "native-base";
import React, { useState } from "react";

interface TimestampProps {}

export const Timestamp: React.FC<TimestampProps> = () => {
  const [time, setTime] = useState()
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
