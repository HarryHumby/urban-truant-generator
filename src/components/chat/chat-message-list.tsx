import Box from '@mui/material/Box';

import Scrollbar from 'src/components/scrollbar';

import { IChatMessage, IChatParticipant } from '../../types/chat';

import { useMessagesScroll } from './hooks';
import ChatMessageItem from './chat-message-item';

// ----------------------------------------------------------------------

type Props = {
  messages: IChatMessage[];
  participants: IChatParticipant[];
  forwardToEmail: string
};

export default function ChatMessageList({ messages = [], participants, forwardToEmail }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);
  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              participants={participants}
              forwardToEmail={forwardToEmail}
            />
          ))}
        </Box>
      </Scrollbar>
    </>
  );
}
