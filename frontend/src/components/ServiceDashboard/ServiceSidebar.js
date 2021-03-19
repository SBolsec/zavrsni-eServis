import React from 'react';
import { useServiceContext } from '../../contexts/ServiceContext';
import setShowSidebar from '../../actions/sidebar';
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

// sidebar nav config
import navigation from './_nav';

const ServiceSidebar = () => {
  const { context, dispatch } = useServiceContext();

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
          items={navigation}
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

export default React.memo(ServiceSidebar)
