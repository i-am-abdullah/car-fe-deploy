import { Stack, Box, Group, TextInput, Textarea, Button, ActionIcon, Divider } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { FAQ } from '@/types/car';

interface FAQManagerProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}

export function FAQManager({ faqs, onChange }: FAQManagerProps) {
  const handleAddFAQ = () => {
    onChange([...faqs, { question: '', answer: '' }]);
  };

  const handleRemoveFAQ = (index: number) => {
    const newFAQs = [...faqs];
    newFAQs.splice(index, 1);
    onChange(newFAQs);
  };

  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFAQs = [...faqs];
    newFAQs[index][field] = value;
    onChange(newFAQs);
  };

  return (
    <Stack>
      {faqs.map((faq, index) => (
        <Box key={index}>
          <Group justify="space-between" mb="xs">
            <div>FAQ #{index + 1}</div>
            {faqs.length > 1 && (
              <ActionIcon 
                color="red" 
                onClick={() => handleRemoveFAQ(index)}
                variant="subtle"
              >
                <IconTrash size="1rem" />
              </ActionIcon>
            )}
          </Group>
          <TextInput
            label="Question"
            placeholder="Enter question"
            value={faq.question}
            onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
            mb="xs"
          />
          <Textarea
            label="Answer"
            placeholder="Enter answer"
            value={faq.answer}
            onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
            minRows={3}
          />
          {index < faqs.length - 1 && <Divider my="md" />}
        </Box>
      ))}
      <Button 
        leftSection={<IconPlus size="1rem" />}
        variant="outline"
        onClick={handleAddFAQ}
      >
        Add FAQ
      </Button>
    </Stack>
  );
}
