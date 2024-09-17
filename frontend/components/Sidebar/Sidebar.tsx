"use client"
import { useState, useEffect } from 'react';
import { Group, Text, Button, ActionIcon, Flex } from '@mantine/core';
import {
  IconRobot,
  IconBrandWechat,
  IconMessagePlus,
  IconEdit,
  IconTrash
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import { Conversation, ConversationPOST, ConversationPUT } from '@/types/Conversation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewConversation, deleteConversationbyId, getAllConversation, updateConversationbyId } from '@/utils/api/conversation';
import LoadingAnimation from '../Loading/loading-animation';
import EditModal from '../Modal/edit-modal';
import { useDisclosure } from '@mantine/hooks';
import DeleteModal from '../Modal/delete-modal';
import { useParams, useRouter } from 'next/navigation';

export default function Sidebar() {
  const params = useParams<{id: string}>()
  const [opened, {open, close}] = useDisclosure(false)
  const [active, setActive] = useState(params?.id);
  const [conversations, setConversations] = useState<Conversation[] | []>([])
  const [editingConversation, setEditingConversation] = useState<Conversation | null>(null)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  // Deleted Modal
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [deletingConversation, setDeletingConversation] = useState<Conversation | null>(null);

  const router = useRouter()

  
  const {data, isLoading, isError} = useQuery({
    queryFn: getAllConversation,
    queryKey: ['conversations']
  })

  useEffect(() => {
    if (data) {
        setConversations(data)
    }
  }, [data, isEdited])

  const queryClient = useQueryClient();

  // Handle Edit update
  const mutation = useMutation({
    mutationFn: ({ id, editedConversation } : {id: string; editedConversation: ConversationPUT}) => updateConversationbyId(id, editedConversation),
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({queryKey: ['conversations']});
      // Optionally update local state
      setIsEdited((prev) => !prev);
      // Close the modal or perform any other actions
      close();
    },
    onError: (error) => {
      // Handle error (e.g., show a notification)
      console.error('Update failed:', error);
    },
  });

  const handleEditClick = (conversation: Conversation) => {
    setEditingConversation(conversation)
    open()
  }

  const handleEditSubmit = async (editedName: string) => {
    const editConversation: ConversationPUT = {
        name: editedName
    }
    const edit_conversation_id = editingConversation?._id
    if (edit_conversation_id) {
        mutation.mutate({
            id: edit_conversation_id, 
            editedConversation: editConversation
        })
    }
  }

  // Handle Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteConversationbyId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      closeDeleteModal();
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      // Optionally show a notification to the user
    },
  });

  const handleDeleteClick = (conversation: Conversation) => {
    setDeletingConversation(conversation);
    openDeleteModal()
  }

  const handleDeleteConfirm = () => {
    if (deletingConversation?._id) {
        deleteMutation.mutate(deletingConversation._id)
    }
  }

  const handleNewConversation = async () => {
    const newConversation: ConversationPOST = {
        name: 'New Conversation'
    }

    const new_conversation = await addNewConversation(newConversation)
    setConversations((prev) => [...prev, new_conversation])
    setActive(new_conversation._id)

    const baseString = '/chat/'
    if (new_conversation._id) {
        const urlString = baseString.concat(new_conversation._id)
        router.push(urlString)
    }

  }

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingAnimation showLoading={true} isRelative={true} />
        </div>
    )
  }

  return (
    <nav className={classes.navbar}>
        <EditModal opened={opened} onClose={close} conversation = {editingConversation} onSubmit = {handleEditSubmit} />
        <DeleteModal opened={deleteModalOpened} onClose={closeDeleteModal} conversation={deletingConversation} onConfirm={handleDeleteConfirm} />

      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="start">
          <IconRobot stroke = {2} className = {classes.linkIcon}/>
          <Text size="xl"
                fw = {900}
                variant="gradient"
                gradient = {{from:'blue', to: 'cyan', deg:90}}>Chat with me!</Text>
        </Group>
        <Group mb={20}>
            <Button
                size = "md"
                justify = "center"
                color = "teal"
                fullWidth
                variant="light"
                leftSection={<IconMessagePlus size={16} />}
                onClick = {handleNewConversation}
            >
                New Conversation
            </Button>
        </Group>
        {conversations && conversations.map((item) => (
            <a
            className={classes.link}
            data-active={item._id === active || undefined}
            href={`/chat/${item._id}`}
            key={item._id}
            onClick={(event) => {
                event.preventDefault();
                setActive(item._id);
                router.push(`/chat/${item._id}`)
            }}
            >
            <Flex align="center" justify="space-between" w="100%">
                <Flex align = "center">
                    <IconBrandWechat className={classes.linkIcon} stroke={1.5} />
                    <span>{item.name}</span>
                </Flex>
                <ActionIcon.Group>
                    <ActionIcon variant="default" size="sm" aria-label="Edit" onClick = {(e) => {
                        e.stopPropagation();
                        handleEditClick(item)
                    }}>
                        <IconEdit stroke={1}/>
                    </ActionIcon>
                    <ActionIcon variant="default" size="sm" aria-label="Delete" onClick = {(e) => {
                        e.stopPropagation();
                        handleDeleteClick(item)
                    }}>
                        <IconTrash  stroke={1}/>
                    </ActionIcon>
                </ActionIcon.Group>
            </Flex>
            </a>
        ))}
      </div>

    </nav>
  );
}