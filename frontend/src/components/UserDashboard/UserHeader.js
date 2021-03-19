import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import setShowSidebar from '../../actions/sidebar';
import {
  CHeader,
  CHeaderBrand
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const UserHeader = ({ title }) => {
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
    <CHeader className="bg-gray" >
      <div 
        className="ml-3 d-flex align-items-center d-lg-none header-toggler" 
        onClick={toggleSidebarMobile}
      >
        <FontAwesomeIcon icon={faBars} className="fa-2x" />
      </div>

      <div 
        className="ml-3 d-none d-lg-flex align-items-center header-toggler" 
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} className="fa-2x" />
      </div>

      <div className="d-none d-md-flex align-items-center ml-4">
        {title}
      </div>

      <CHeaderBrand className="mx-auto my-1 d-lg-none" to="/user/dashboard">
        <CIcon name="logo-negative" height="35" alt="Logo" />
      </CHeaderBrand>

      <div className="d-none ml-auto mr-4 d-sm-flex justify-content-between align-items-center">
        <span className="mr-3 pl-2" style={{ borderLeft: '1px solid white' }}>John Doe</span>
        <img src="/images/prijava.jpg" alt="avatar" className="rounded-circle" style={{ width: '45px', height: '45px' }} />
      </div>

    </CHeader>
  )
}

export default UserHeader;
