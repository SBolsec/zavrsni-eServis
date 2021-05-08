import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useConversations } from '../../../contexts/ConversationsContext';
import { useContacts } from '../../../contexts/ContactsContext';

const NewConversationModal = ({ closeModal }) => {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { createConversation } = useConversations();
    const { contacts } = useContacts();

    const handleSubmit = (e) => {
        e.preventDefault();

        createConversation(selectedContactIds);
        closeModal();
    }

    const handleCheckBoxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => contactId !== prevId);
            } else {
                return [...prevSelectedContactIds, contactId];
            }
        });
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check 
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckBoxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}
 
export default NewConversationModal;