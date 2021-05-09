import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useAuth } from "../../../contexts/AuthContext";
import axiosInstance from "../../../helpers/axiosInstance";
import { TextField } from "@material-ui/core";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

const NewConversationModal = ({ closeModal }) => {
  const history = useHistory();
  const { auth } = useAuth();
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);
  const { createConversation } = useConversations();

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    if (!search) return;

    axiosInstance(history)
      .get(`/messages/contacts?id=${auth.data.userId}&name=${search}`)
      .then(res => {
        setContacts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const create = (contact) => {
    createConversation(contact);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Započni novi razgovor</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleChange} className="d-flex align-items-center">
          <TextField
            fullWidth
            placeholder="Pronađi osobu ili servis za razgovor"
            variant="outlined"
            value={search}
            onChange={handleChange}
          />
          <Button
            variant="white" className="no-round mx-4 text-uppercase"
            type="submit"
          >
            <FontAwesomeIcon icon={faSearch} className="bg-white text-blueAccent fa-1x" />
          </Button>
        </Form>
        {contacts.length !== 0 && <hr />}
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="d-flex align-items-center border-bottom py-2 my-2"
            onClick={() => create(contact)}
          >
              <img
                src={contact.profilePicture.url}
                alt="avatar"
                className="rounded-circle mr-3 border"
                style={{ height: "30px", width: "30px" }}
              />
              <span className="font-weight-bold">
                {contact.name}
              </span>
            </div>
        ))}
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
