import { ChatMessage } from '@/components/ChatHistory';

// Define the interface for the OpenAI API request
interface OpenAIRequest {
  model: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
}

// Define the interface for the OpenAI API response
interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Convert our app's ChatMessage format to OpenAI's format
const formatMessagesForOpenAI = (messages: ChatMessage[]) => {
  return messages.map(message => ({
    role: message.type === 'user' ? 'user' : 'assistant' as 'system' | 'user' | 'assistant',
    content: message.content
  }));
};

// Add a system message to set the context for the AI
const addSystemMessage = (messages: { role: 'system' | 'user' | 'assistant'; content: string; }[]) => {
  return [
    {
      role: 'system' as const,
      content: 'You are a helpful government information assistant. Provide accurate, concise information about public services, policies, and procedures. Be professional and courteous.'
    },
    ...messages
  ];
};

// Send a request to the OpenAI API
export const sendChatRequest = async (messages: ChatMessage[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key is missing');
    throw new Error('API key is required');
  }

  const formattedMessages = formatMessagesForOpenAI(messages);
  const messagesWithSystem = addSystemMessage(formattedMessages);

  const requestBody: OpenAIRequest = {
    model: 'gpt-3.5-turbo',
    messages: messagesWithSystem,
    temperature: 0.7,
    max_tokens: 500
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}; 