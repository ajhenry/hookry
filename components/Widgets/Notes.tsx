import { Flex, Input, KeyboardAvoidingView, ScrollView } from "native-base";
import React, { useRef } from "react";
import { Dimensions, Platform } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

interface NotesProps {
  title?: string;
  notes: string;
}

export const Notes: React.FC<NotesProps> = ({ title, notes }) => {
  let richText = useRef(null);
  let scrollRef = useRef(null);
  const { height } = Dimensions.get("window");

  const handleCursor = (scrollY: number) => {
    console.log(scrollY);
    const ref = scrollRef.current as any;
    //if (height / 3 > scrollY) return;
    ref.scrollTo({ y: scrollY - 30, duration: 100, animated: true });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height: "100%",
      }}
    >
      <Flex w="full" h="full" flexDir="row" bgColor="white" safeAreaBottom>
        <Flex bgColor="rgb(240,240,240)" px="4" pt="4">
          <Input
            fontSize="2xl"
            borderColor="transparent"
            _focus={{
              borderColor: "transparent",
            }}
            placeholder="Title your work"
          >
            This is a title
          </Input>
        </Flex>
        <Flex w="full">
          <RichToolbar editor={richText} />
        </Flex>
        <ScrollView flex={1} ref={scrollRef} mb={12}>
          <RichEditor
            ref={richText}
            style={{
              display: "flex",
              flex: 1,
            }}
            useContainer
            onCursorPosition={handleCursor}
            placeholder="Write to your heart's content"
          />
        </ScrollView>
      </Flex>
    </KeyboardAvoidingView>
  );
};
