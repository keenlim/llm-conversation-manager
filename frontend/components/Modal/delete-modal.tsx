import { useState } from 'react';
import { Modal, Button, TextInput, Group, Text } from '@mantine/core';
import { FC } from 'react';
import { Conversation, ConversationPUT } from '@/types/Conversation';

interface Props {
    opened: boolean, 
    onClose: () => void;
    conversation: Conversation | null;
    onConfirm: () => void;
}

const DeleteModal: FC<Props> = ({opened, onClose, conversation, onConfirm}) => {

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Delete Conversation" centered>
        <Text>Are you sure you want to delete the conversation "{conversation?.name}"?</Text>
        <Group mt="md">
            <Button variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button color="red" onClick={onConfirm}>
                Delete
            </Button>
      </Group>
      </Modal>
    </>
  );
}

export default DeleteModal