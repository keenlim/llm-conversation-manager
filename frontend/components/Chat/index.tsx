import { useState } from 'react';
import { Box, ScrollArea, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

const ChatWindow = () => {


  return (
    <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea style={{ flex: 1, padding: '1rem' }}>
        Hello
      </ScrollArea>
    </Box>
  );
}

export default ChatWindow;
