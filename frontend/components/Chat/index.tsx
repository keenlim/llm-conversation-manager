import { useState } from 'react';
import { Box, Flex, ScrollArea, Text, Group, Textarea, Button, ActionIcon, Center } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { IconMessageChatbot, IconSend, IconUser } from '@tabler/icons-react';

const messages = [
    {role: 'user', content: 'hello i am happy'},
    {role: 'assistant', content: 'hello i am happy'},
    {role: 'user', content: 'hello i am happy'},
    {role: 'assistant', content: 'Knowledge Graph: A Neo4j-based graph database that stores entities (Person, Object, Location, Events) and their relationships extracted from terrorism reports and articles.'}
]

const ChatWindow = () => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
        }
      };


  return (
    <Flex direction="column" style = {{position: 'relative', height: '100%', width: '100%'}}>
        <ScrollArea style={{flex:1, padding: '1rem'}}>
            {messages.map((msg, index) => (
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
        </ScrollArea>
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
