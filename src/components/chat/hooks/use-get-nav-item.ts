import { IChatConversation } from 'src/sections/service-desk/types/chat';

// ----------------------------------------------------------------------

type Props = {
  currentUserId: string;
  conversation: IChatConversation;
};

export default function useGetNavItem({ currentUserId, conversation }: Props) {
  const { messages, participants } = conversation;

  const participantsInConversation = participants.filter(
    (participant) => participant.id !== currentUserId
  );


  const group = participantsInConversation.length > 1;

  const displayName = participantsInConversation.map((participant) => participant.name).join(', ');

  const hasOnlineInGroup = group
    ? participantsInConversation.map((item) => item.status).includes('online')
    : false;

  let displayText = '';

  return {
    group,
    displayName,
    displayText,
    participants: participantsInConversation,
    hasOnlineInGroup,
  };
}
