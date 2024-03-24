import { sub } from 'date-fns';
import { useRef, useMemo, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import uuidv4 from 'src/utils/uuidv4';

import Iconify from 'src/components/iconify';

import { IChatParticipant } from '../../types/chat';

// ----------------------------------------------------------------------

type Props = {
  sendMessage: (message: string) => Promise<boolean>
  disabled?: boolean;
};

export default function ChatMessageInput({
  sendMessage,
  disabled = false,
}: Props) {

  const [message, setMessage] = useState('');

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (event.key === 'Enter') {
        if (message) {
          let result = await sendMessage(message);
          // if successful wipe the field
          if (result) {
            setMessage('');
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />
    </>
  );
}
