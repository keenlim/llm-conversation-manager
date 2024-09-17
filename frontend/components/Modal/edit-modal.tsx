import { useState } from 'react';
import { Modal, Button, TextInput, Group } from '@mantine/core';
import { FC } from 'react';
import { Conversation } from '@/types/Conversation';

interface Props {
    opened: boolean, 
    onClose: () => void;
    conversation: Conversation | null;
    onSubmit: (name:string) => void;
}

const EditModal: FC<Props> = ({opened, onClose, conversation, onSubmit}) => {
  const [newName, setNewName] = useState(conversation?.name);

  const handleSubmit = (event:any) => {
    event.preventDefault();

    if (onSubmit) {
        if (newName){
            onSubmit(newName)
        }
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Edit Conversation" centered>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Conversation Name"
          onChange={(event) => setNewName(event.currentTarget.value)}
          required
        />
        <Group mt="md">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Modal>
    </>
  );
}

export default EditModal