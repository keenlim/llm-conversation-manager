import { useState } from 'react';
import { Modal, Button, TextInput, Group } from '@mantine/core';
import { FC } from 'react';
import { Conversation, ConversationPUT } from '@/types/Conversation';

interface Props {
    opened: boolean, 
    onClose: () => void;
    conversation: Conversation | null;
    onSubmit: (name:string) => void;
}

const EditModal: FC<Props> = ({opened, onClose, conversation, onSubmit}) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();

    if (onSubmit) {
        onSubmit(newName)
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Edit Conversation" centered>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Conversation Name"
          value={newName}
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