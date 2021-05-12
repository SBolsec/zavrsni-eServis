import React, { useCallback, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Form } from "react-bootstrap";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useAuth } from "../../../contexts/AuthContext";

const OpenConversation = () => {
  const { auth } = useAuth();
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node)
      node.scrollIntoView({ smooth: true, block: "end", inline: "nearest" });
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(selectedConversation.receiver.id, text);
    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1 bg-white text-black">
      <div
        className="d-flex align-items-center border-bottom"
        style={{ minHeight: "65px", maxHeight: '65px' }}
      >
        <img src={selectedConversation.receiver.profilePicture.url} alt="avatar"
          className="rounded-circle mx-3 border"
          style={{ height: '45px', width: '45px' }}
        />
        <span className="font-weight-bold">{selectedConversation.receiver.name}</span>
      </div>
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.senderId === auth.data.userId
                  ? "align-self-end align-items-end"
                  : "align-items-start"
                  }`}
              >
                <div
                  className={`border px-2 py-1 ${message.senderId === auth.data.userId
                    ? "bg-blueAccent text-white rounded-top rounded-left"
                    : "bg-lightGray text-black rounded-top rounded-right"
                    }`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex border-top p-4">
          <TextField
            className=""
            autoComplete="false"
            fullWidth
            variant="outlined"
            id="text"
            name="text"
            value={text}
            placeholder="Upišite poruku.."
            required
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="white"
            className="no-round mx-4 text-uppercase bg-white"
            type="submit"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="bg-white text-blueAccent fa-2x"
            />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OpenConversation;
