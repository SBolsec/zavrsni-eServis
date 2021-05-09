import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

const CONVERATIONS_KEY = "converations";
const CONTACTS_KEY = "contacts";

const Sidebar = ({id}) => {
  const [activeKey, setActiveKey] = useState(CONVERATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERATIONS_KEY;

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column bg-white text-black border-right">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="overflow-auto flex-grow-1">
            <Tab.Pane eventKey={CONVERATIONS_KEY}>
                <Conversations />
            </Tab.Pane>
            <Tab.Pane eventKey={CONTACTS_KEY}>
              <Contacts />
            </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top small">
          Your id: <span className="text-muted">{id}</span>
        </div>
        <Button className="rounded-0" onClick={() => setModalOpen(true)}>
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ?
          <NewConversationModal closeModal={closeModal} /> : 
          <NewContactModal closeModal={closeModal} />
        }
      </Modal>
    </div>
  );
};

export default Sidebar;
