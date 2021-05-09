import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import NewConversationModal from "./NewConversationModal";

const Sidebar = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{ width: "250px" }}
      className="d-flex flex-column bg-white text-black border-right"
    >
      <div
        className="border-bottom p-2 d-flex justify-content-center align-items-center"
        style={{ height: "65px" }}
      >
        <Button variant="blueAccent" className="rounded-0" onClick={() => setModalOpen(true)}>
          Novi razgovor
        </Button>
      </div>
      <div className="overflow-auto flex-grow-1">
        <Conversations />
      </div>

      <Modal show={modalOpen} onHide={closeModal}>
        <NewConversationModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default Sidebar;
