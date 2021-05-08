import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import OpenConversation from './OpenConversation';
import { useConversations } from '../../../contexts/ConversationsContext';

const Dashboard = () => {
    const { auth } = useAuth();
    const { selectedConversation } = useConversations();

    return (
        <div className="d-flex" style={{ height: '75vh' }}>
            <Sidebar id={auth.data.userId} />
            {selectedConversation && <OpenConversation />}
        </div>
    );
}
 
export default Dashboard;