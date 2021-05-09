import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../../contexts/AuthContext";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../../../contexts/ConversationsContext";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const { auth } = useAuth();
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: "91vh" }}>
      <Sidebar id={auth.data.userId} />
      {selectedConversation && <OpenConversation />}
      {!selectedConversation && (
        <div className="flex-grow-1 bg-white text-black d-flex flex-column align-items-center justify-content-center">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="bg-white text-blueAccent fa-4x"
          />
          <h5 className="pt-3">Vaše poruke</h5>
          <p>Šaljite privatne poruke</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
