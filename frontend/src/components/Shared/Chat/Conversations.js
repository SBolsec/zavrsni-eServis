import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../../../contexts/ConversationsContext';

const Conversations = () => {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <div>
            <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item 
                    key={index}
                    action
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected}
                >
                    {conversation.receiver.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
        </div>
    );
}
 
export default Conversations;