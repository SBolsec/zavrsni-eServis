import { Chip } from "@material-ui/core";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useAuth } from "../../../contexts/AuthContext";

const Conversations = () => {
  const { auth } = useAuth();
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <div>
      <ListGroup variant="flush">
        {conversations.map((conversation, index) => (
          <ListGroup.Item
            key={conversation.receiver.id}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
            variant={conversation.selected ? 'lightGray' : 'white'}
            className="border-bottom"
          >
            <div className="d-flex align-items-center">
              <img
                src={conversation.receiver.profilePicture.url}
                alt="avatar"
                className="rounded-circle mr-3 border"
                style={{ height: "30px", width: "30px" }}
              />
              <span className="text-black" style={{ fontWeight: '500' }}>
                {conversation.receiver.name}
              </span>
              { conversation.messages.filter(m => m.senderId !== auth.data.userId && m.read === false).length > 0 && 
                <Chip
                  className="ml-2 text-white bg-blueAccent font-weight-bold"
                  label={conversation.messages.filter(m => m.senderId !== auth.data.userId && m.read === false).length} 
                />
              }
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Conversations;
