import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import setShowSidebar from '../../actions/sidebar';
import {
  CHeader,
  CToggler,
  CHeaderBrand
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const UserHeader = ({title}) => {
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

      <div className="d-flex align-items-center">
        {title}
      </div>


      <div className="ml-auto mr-4 d-flex justify-content-between align-items-center">
        <span className="mr-3">John Doe</span>
        <img src="/images/prijava.jpg" alt="avatar" className="rounded-circle" style={{width: '45px', height: '45px'}} />
      </div>

    </CHeader>
  )
}

export default UserHeader;
