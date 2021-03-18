import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import setShowSidebar from '../../actions/sidebar';
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const UserHeader = () => {
  const { context, dispatch } = useUserContext();

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(context.sidebarShow) ? false : 'responsive'
    setShowSidebar(val)(dispatch);
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(context.sidebarShow) ? true : 'responsive'
    setShowSidebar(val)(dispatch);
  }

  return (
    <CHeader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto my-1 d-lg-none" to="/user/dashboard">
        <CIcon name="logo" height="35" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
      </CHeaderNav>

    </CHeader>
  )
}

export default UserHeader;
