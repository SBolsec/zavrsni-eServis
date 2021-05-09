import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../../contexts/ConversationsContext";

const Conversations = () => {
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
              <span className="font-weight-bold">
                {conversation.receiver.name}
              </span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Conversations;
