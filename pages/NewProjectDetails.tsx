import { Box, Heading, Input } from "native-base";
import React from "react";

interface NewProjectDetailsProps {
  onProjectNameChange: (text: string) => void
}

const NewProjectDetails: React.FC<NewProjectDetailsProps> = ({
  onProjectNameChange
}) => {
  return (
    <Box>
      <Box marginX={6} mt={4}>
        <Heading fontSize="md" mb={2}>
          Project Name
        </Heading>
        <Box
          borderColor={"transparent"}
          bgColor={"rgb(239,239,239)"}
          borderRadius="2xl"
          paddingX={2}
        >
          <Input
            borderColor="transparent"
            bgColor="transparent"
            borderWidth={0}
            fontSize="lg"
            h={10}
            onChangeText={onProjectNameChange}
            autoCorrect={false}
          />
        </Box>
      </Box>
      <Box>

      </Box>
    </Box>
  );
};

export default NewProjectDetails;
