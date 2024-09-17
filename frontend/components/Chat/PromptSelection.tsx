import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
    Center,
    Button,
  } from '@mantine/core';
  import { IconGauge, IconUser, IconCookie, IconBulbFilled } from '@tabler/icons-react';
  import classes from './PromptSelection.module.css';
  import { FC } from 'react';
import { Prompt } from '@/types/Prompt';
  
  const mockdata = [
    {
      role: 'user',
      content:
        'Is a hot dog a sandwich?',
    },
    {
      role: 'user',
      content:
        'Tell me a joke',
    },
    {
      role: 'user',
      content:
        'Tell me a motivational quote',
    },
  ];

  interface Props {
    onSend: (message: Prompt) => void
  }
   
const PromptSelection: FC<Props> = ({onSend}) => {

    const handlePrompt = (message: any) => {
        onSend(message)
    }


    const theme = useMantineTheme();

  
    return (
      <Container size="md" py="xl">

        <Group justify="center">
          <Badge variant="filled" size="lg" style = {{marginTop: "64px"}}>
            Chat with me easily!
          </Badge>
        </Group>
  
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Chat with large language models easily! Try it out with these example prompts! 
        </Text>
  
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {mockdata.map((prompt) => (
            <Button key={prompt.role} radius="md" variant = "light" size = "lg" leftSection={<IconBulbFilled
                style={{ width: rem(24), height: rem(24) }}
                stroke={2}
                />} 
                onClick = {(e) => {
                    e.stopPropagation();
                    handlePrompt(prompt)
                }}>
                <Text fz="sm" c="dimmed" mt="sm" mb="sm">
                {prompt.content}
                </Text>
                
            </Button>
        ))}
        </SimpleGrid>
      </Container>
    );
  }

export default PromptSelection;