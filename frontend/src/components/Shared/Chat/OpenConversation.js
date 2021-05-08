import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useAuth } from '../../../contexts/AuthContext';

const OpenConversation = () => {
    const { auth } = useAuth();
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.receiver.id,
      text
    );
    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.senderId === auth.data.userId ? "align-self-end align-items-end" : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.senderId === auth.data.userId ? "bg-blueAccent text-white" : "bodrder"
                  }`}
                >
                  {message.content}
                </div>
                <div
                  className={`text-muted small ${
                    message.senderId === auth.data.userId ? "text-right" : ""
                  }`}
                >
                  {message.senderId === auth.data.userId ? "You" : selectedConversation.receiver.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="m-2">
          <InputGroup>
            <Form.Control
              type="text"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
};

export default OpenConversation;
