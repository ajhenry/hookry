import { Button, Modal } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { BoardContext, WidgetItem } from "../store";
import { CounterSettings, SmallCounterSettings } from "./Widgets/Counter";


interface SettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChange: (id: string, data: any) => void;
  id: string;
}

export interface WidgetSettings {
  onDataChange: (data: WidgetItem["data"]) => void;
}

export const SettingsSheet: React.FC<SettingsSheetProps> = ({
  isOpen,
  onClose,
  id,
  onDataChange,
}) => {
  const { data: boardData, setData: setBoardData } = useContext(BoardContext);
  const [modifiedData, setModifiedData] = useState<WidgetItem["data"]>();
  const selectedItem = boardData.find((item) => item.id === id);
  const { data, type } = selectedItem!;

  useEffect(() => {
    setModifiedData(data);
  }, [data]);

  const onSaveClick = () => {
    onDataChange(id, modifiedData);
    onClose();
  };

  const handleDataChange = (data: WidgetItem["data"]) => {
    setModifiedData(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard size="xl">
      <Modal.Content bgColor="rgb(255, 255, 255)">
        <Modal.CloseButton />
        <Modal.Header borderBottomColor="transparent">
          {type === "large-counter" && "Edit Large Counter"}
          {type === "small-counter" && "Edit Small Counters"}
          {type === "timestamp" && "Edit Timestamp Settings"}
          {type === "notes" && "Edit Notes"}
        </Modal.Header>
        <Modal.Body
          borderWidth={0}
          bgColor="rgb(255, 255, 255)"
          px="4"
          minH="40"
        >
          {type === "large-counter" && (
            <CounterSettings
              onDataChange={handleDataChange}
              data={modifiedData}
            />
          )}
          {type === "small-counter" && (
            <SmallCounterSettings
              onDataChange={handleDataChange}
              data={modifiedData}
            />
          )}
        </Modal.Body>
        <Modal.Footer
          bgColor="rgb(255, 255, 255)"
          display="flex"
          justifyContent="center"
        >
          <Button px="12" borderRadius="2xl" onPress={onSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
