"use client"

import { Button, Card, Center, Text } from '@mantine/core'
import { IconRobot } from '@tabler/icons-react'
import { ConversationPOST } from '@/types/Conversation'
import { addNewConversation } from '@/utils/api/conversation'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  const handleNewConversation = async () => {
    const newConversation: ConversationPOST = {
        name: 'New Conversation'
    }
    const baseString = '/chat/'
    const new_conversation = await addNewConversation(newConversation)
    if (new_conversation._id) {
      const urlString = baseString.concat(new_conversation._id)
      router.push(urlString)
    }
  }
  return (
    <div>
      {/* Center the card vertically and horizontally */}
      <Center style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
        {/* Card component replaces the inner div with bg-white, rounded, shadow, padding, width */}
        <Card
          shadow="md"
          padding="lg"
          radius="lg"
          withBorder
          style={{ width: 384 }} // 384px is equivalent to w-96 in Tailwind
        >
          {/* Title Text */}
          <Text size="xl" fw={700} style = {{marginBottom: '16px'}}>🤖 Start Chatting! </Text>
          
          {/* Start Chat Button */}
          <Button
            fullWidth
            color="blue"
            radius="lg"
            size="md"
            leftSection={<IconRobot size={16} />} // Optional: Add an icon
            onClick={handleNewConversation}
          >
            Start Chat
          </Button>
        </Card>
      </Center>
    </div>
    
  )
}

export default Home
