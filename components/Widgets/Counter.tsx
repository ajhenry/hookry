import { AntDesign } from "@expo/vector-icons";
import { Box, FormControl, Heading, Input } from "native-base";
import React, { useEffect, useState } from "react";
import { WidgetSettings } from "../SettingsSheet";

interface CounterProps {
  count: number;
  label: string;
  size?: "large" | "small";
  colors?: string[];
}

interface SmallCounterProps {
  left?: CounterProps;
  right?: CounterProps;
}

export const CounterSettings = ({
  data,
  onDataChange,
}: { data: CounterProps } & WidgetSettings) => {
  // Large Counter Label
  const [counterLabel, setCounterLabel] = useState<string>();

  useEffect(() => {
    // Large Counter Label
    setCounterLabel(data.label);
  }, []);

  useEffect(() => {
    onDataChange({ ...data, label: counterLabel });
  }, [counterLabel]);

  return (
    <FormControl mt="3">
      <FormControl.Label>Counter Label</FormControl.Label>
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
          onChangeText={(text) => setCounterLabel(text)}
          autoCorrect={false}
          value={counterLabel}
        />
      </Box>
    </FormControl>
  );
};

export const Counter: React.FC<CounterProps> = ({
  label,
  count,
  size = "small",
  colors,
}) => {
  return (
    <Box
      h={size === "large" ? 32 : 24}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="2xl"
      flex={1}
      bg={{
        linearGradient: {
          colors: colors ?? ["#ffffff"],
          start: [0, 0.6],
          end: [0.8, 0.3],
        },
      }}
    >
      {size === "small" && (
        <>
          <Box
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="space-around"
            flex={1}
            width="100%"
          >
            <Box>
              <AntDesign name="minus" size={36} />
            </Box>
            <Box maxW="1/3">
              <Heading fontSize="3xl">{count}</Heading>
            </Box>
            <Box>
              <AntDesign name="plus" size={36} />
            </Box>
          </Box>
          <Heading fontSize="md" position="absolute" bottom={0} mb={2}>
            {label}
          </Heading>
        </>
      )}
      {size === "large" && (
        <>
          <Box display="flex" flexDir="row" alignItems="center">
            <Box mr={8}>
              <AntDesign name="minus" size={48} />
            </Box>
            <Box
              display="flex"
              flexDir="column"
              alignItems="center"
              maxW="1/3"
              flexWrap="nowrap"
              textAlign="center"
            >
              <Heading fontSize="5xl">{count}</Heading>
            </Box>
            <Box ml={8}>
              <AntDesign name="plus" size={48} />
            </Box>
          </Box>
          <Heading fontSize="xl" position="absolute" bottom={0} mb={2}>
            {label}
          </Heading>
        </>
      )}
    </Box>
  );
};

export const CounterAdd: React.FC<any> = ({
  drag,
  disablePressable,
  onClickAdd,
}) => {
  return (
    <Box
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="2xl"
      bg={{
        linearGradient: {
          colors: ["rgb(241, 241, 245)", "rgb(241, 241, 245)"],
          start: [1, 1],
          end: [0, 0],
        },
      }}
    >
      <AntDesign name="plus" size={32} />
      <Heading fontWeight="semibold" fontSize="md">
        Add Counter
      </Heading>
    </Box>
  );
};

export const SmallCounterSettings = ({
  data,
  onDataChange,
}: { data: SmallCounterProps } & WidgetSettings) => {
  // Large Counter Label
  const [counterLabel, setCounterLabel] = useState<string>();

  useEffect(() => {
    // Large Counter Label
    setCounterLabel(data.left?.label);
  }, []);

  useEffect(() => {
    onDataChange({ ...data, label: counterLabel });
  }, [counterLabel]);

  return (
    <Box>
      <FormControl mt="3">
        <FormControl.Label>Left Counter Label</FormControl.Label>
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
            onChangeText={(text) => setCounterLabel(text)}
            autoCorrect={false}
            value={counterLabel}
          />
        </Box>
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>Right Counter Label</FormControl.Label>
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
            onChangeText={(text) => setCounterLabel(text)}
            autoCorrect={false}
            value={counterLabel}
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export const SmallCounterRow: React.FC<any> = ({
  drag,
  disablePressable,
  data,
  onClickAdd,
}) => {
  return (
    <Box display="flex" height={24} flexDir="row">
      {data.left ? (
        <Counter {...data.left} size="small" />
      ) : (
        <CounterAdd
          drag={drag}
          disablePressable={disablePressable}
          onClickAdd={onClickAdd}
        />
      )}
      <Box w={4} />
      {data.right ? (
        <Counter {...data.right} size="small" />
      ) : (
        <CounterAdd
          drag={drag}
          disablePressable={disablePressable}
          onClickAdd={onClickAdd}
        />
      )}
    </Box>
  );
};
