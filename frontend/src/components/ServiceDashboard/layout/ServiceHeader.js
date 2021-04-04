import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useServiceContext } from '../../../contexts/ServiceContext';
import { useAuth } from '../../../contexts/AuthContext';
import setShowSidebar from '../../../actions/sidebar';
import {
  CHeader,
  CHeaderBrand
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import fetchService from '../../../actions/service/fetchService';

const ServiceHeader = () => {
  const { auth } = useAuth();
  const { context, dispatch } = useServiceContext();
  const [showDropdown, setShowDropdown] = useState(false);

  // fetch service info
  useEffect(() => {
    fetchService({ userId: auth.data.userId })(dispatch);
  }, [auth.data]);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(context.sidebarShow) ? false : 'responsive'
    setShowSidebar(val)(dispatch);
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(context.sidebarShow) ? true : 'responsive'
    setShowSidebar(val)(dispatch);
  }

  let title = '';
  switch (window.location.pathname) {
    case '/service/dashboard': title = 'Nadzorna ploča'; break;
    case '/service/messages': title = 'Poruke'; break;
    case '/service/profile': title = 'Profil'; break;
    case '/service/active': title = 'Aktivne ponude'; break;
    case '/service/history': title = 'Povijest ponuda'; break;
    case '/service/servicers': title = 'Pretraga servisera'; break;
    case '/service/search': title = 'Pretraga oglasa'; break;
    default: break;
  }
  document.title = 'e-servis | ' + title;

  return (
    <CHeader className="bg-gray">
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
        <div
          style={{ borderLeft: '1px solid white', width: '10px' }}
        >&nbsp;</div>

        <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
          <Dropdown.Toggle variant="gray" id="dropdown-basic" className="no-border-radius">
            {context.data.name}
          </Dropdown.Toggle>

          <Dropdown.Menu className="no-border-radius p-0" onClick={() => setShowDropdown(false)}>
            <Link to="/service/profile" style={{ color: 'black', textDecoration: 'none' }} >
              <div className=" px-3 py-1 header-dropdown-item">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-darkGray" />
                <span>Profil</span>
              </div>
            </Link>
            <Link to="/logout" style={{ color: 'black', textDecoration: 'none' }}>
              <div className=" px-3 py-1 header-dropdown-item">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-darkGray" />
                <span>Odjava</span>
              </div>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
        <img src={auth.data.profilePictureURL} alt="avatar" className="rounded-circle ml-2" style={{ width: '35px', height: '35px' }} />
      </div>

    </CHeader>
  )
}

export default ServiceHeader;
