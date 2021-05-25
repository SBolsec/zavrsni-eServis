import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserContext } from '../../../contexts/UserContext';
import { useConversations } from '../../../contexts/ConversationsContext';
import setShowSidebar from '../../../actions/sidebar';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

// sidebar nav config
import navigation from './_nav';

const UserSidebar = () => {
  const { context, dispatch } = useUserContext();
  const { auth } = useAuth();
  const { conversations, selectedConversation } = useConversations();
  const [items, setItems] = useState(navigation);

  useEffect(() => {
    let unread = 0;
    conversations.forEach(conv => {
      conv.messages.forEach(m => {
        if (m.receiverId === auth.data.userId && m.read !== true) {
          unread++;
        }
      })
    });
    console.log(unread);
    if (unread > 0) {
      console.log('a');
      setItems(items.map(item => {
        if (item.name !== 'Poruke') return item;
        item.icon = <FontAwesomeIcon icon={faComments} className="c-sidebar-nav-icon text-blueAccent"/>
        return item;
      }));
    } else {
      console.log('b');
      setItems(items.map(item => {
        if (item.name !== 'Poruke') return item;
        item.icon = <FontAwesomeIcon icon={faComments} className="c-sidebar-nav-icon"/>
        return item;
      }));
    }
  }, [conversations, selectedConversation]);

  return (
    <CSidebar
      show={context.sidebarShow}
      onShowChange={(val) => setShowSidebar(val)(dispatch)}
      className="bg-darkestGray"
    >
      <CSidebarBrand className="d-md-down-none" to="/user/dashboard">
        
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={items}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default UserSidebar;
