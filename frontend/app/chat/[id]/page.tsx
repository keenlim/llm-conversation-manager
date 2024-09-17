"use client"
import { useState, useEffect } from 'react';
import { Box, Flex, ScrollArea, Text, Group, Textarea, Button, ActionIcon, Center, SegmentedControl } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IconMessageChatbot, IconNumber3Small, IconSend, IconUser } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { ConversationFull } from '@/types/Conversation';
import { getSpecificConversation } from '@/utils/api/conversation';
import { Prompt } from '@/types/Prompt';
import LoadingAnimation from '@/components/Loading/loading-animation';
import { generateResponse } from '@/utils/api/prompt';
import PromptSelection from '@/components/Chat/PromptSelection';

// const messages = [
//     {role: 'user', content: 'hello i am happy'},
//     {role: 'assistant', content: 'hello i am happy'},
//     {role: 'user', content: 'hello i am happy'},
//     {role: 'assistant', content: 'Knowledge Graph: A Neo4j-based graph database that stores entities (Person, Object, Location, Events) and their relationships extracted from terrorism reports and articles.'}
// ]

const ChatWindow = () => {
    const [inputValue, setInputValue] = useState('');
    const [conversation, setConversation] = useState<ConversationFull| null>(null)
    const params = useParams<{id: string}>()
    const [messages, setMessages] = useState<Prompt[]>([])
    const [loadingResponse, setLoadingResponse] = useState<boolean>(false)
    const [models, setModels] = useState<string>('GPT-4o-mini')

    // Get the messages data
    const {data, isLoading, isError} = useQuery({
        queryKey: ['conversations', params.id],
        queryFn: () => getSpecificConversation(params.id)
    })

    useEffect(() => {
        if (data) {
            console.log("new conversations")
            console.log(data)
            setConversation(data)
            console.log(data?.messages)
            setMessages(data?.messages)
        }
    }, [data])

    const handlePrompt = async (message: {role: string, content: string}) => {
        // Add User Message
        setMessages((prev) => [...prev, {role: 'user', content: message.content}])
        setInputValue('')
        setLoadingResponse(true)

        try{
            const results = await generateResponse(params.id, {role: 'user', content: message.content})

            if (results){
                setLoadingResponse(false)
                setMessages((prev) => [...prev, {role: 'assistant', content: results.response}])
            }
        } catch(e){
            console.log("Unable to get response")
        }        
    }

    const handleSend = async () => {
        // Add User Message
        setMessages((prev) => [...prev, {role: 'user', content: inputValue}])
        setInputValue('')
        setLoadingResponse(true)

        try{
            const results = await generateResponse(params.id, {role: 'user', content: inputValue})

            if (results){
                setLoadingResponse(false)
                setMessages((prev) => [...prev, {role: 'assistant', content: results.response}])
            }
        } catch(e){
            console.log("Unable to get response")
        }        
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          handleSend();
        }
      };


  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingAnimation showLoading={true} isRelative={true} />
        </div>
    )
  }


  return (
    <Flex direction="column" style = {{position: 'relative', height: '100%', width: '100%'}}>
        <div style={{flex:1, padding: '1rem', paddingBottom: '80px'}}>
            <SegmentedControl value = {models} onChange={setModels} data={['GPT-3.5-Turbo', 'GPT-4o-mini']} />
        </div>

        {messages.length !== 0 ? <ScrollArea style={{flex:1, padding: '1rem', paddingBottom: '80px'}}>
            {messages?.map((msg, index) => (
                <Box
                    key = {index}
                    mb = "sm">
                    <Text size="xs">{msg.role}:</Text>
                    <Group>
                        {msg.role === 'user' ? (<IconUser stroke={2} size={30}/>) : (<IconMessageChatbot stroke = {2} size={30}/>) }
                        <Box style={{
                            backgroundColor: msg.role === 'user' ? '#dcf8c6' : '#ccedff',
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem',
                            maxWidth: '90%',
                            }}>
                                {msg.content}
                        </Box>
                    </Group>
                </Box>
            ))}
        </ScrollArea> : <PromptSelection onSend = {handlePrompt}/>}
        
        <Box mt="auto" p="md" style = {{
            position: 'fixed',
            bottom: 0,
            left: '300px',
            width: `calc(100% - ${300}px)`,
            backgroundColor: '#f0f0f0',
            padding: '0.5rem',
            borderTop: '1px solid #ddd',
            zIndex: 1000,
        }} >
            <Flex>

                <Textarea
                    placeholder="Type your message..."
                    value = {inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autosize
                    minRows={1}
                    maxRows={4}
                    radius = "lg"
                    style={{ flex: 1, marginRight: '0.5rem'}}
                >
                </Textarea>
                <ActionIcon variant="filled"><IconSend size={18} /></ActionIcon>
                
            </Flex>
      </Box>
    </Flex>
  );
}

export default ChatWindow;
