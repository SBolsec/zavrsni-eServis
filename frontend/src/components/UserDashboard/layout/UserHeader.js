import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';
import { useAuth } from '../../../contexts/AuthContext';
import setShowSidebar from '../../../actions/sidebar';
import {
  CHeader,
  CHeaderBrand
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import fetchUser from '../../../actions/user/fetchUser';

const UserHeader = () => {
  const { auth } = useAuth();
  const { context, dispatch } = useUserContext();
  const [showDropdown, setShowDropdown] = useState(false);

  // fetch user info
  useEffect(() => {
    fetchUser({ userId: auth.data.userId })(dispatch);
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
    case '/user/dashboard': title = 'Nadzorna ploča'; break;
    case '/user/messages': title = 'Poruke'; break;
    case '/user/profile': title = 'Profil'; break;
    case '/user/create': title = 'Stvorite novi oglas'; break;
    case '/user/active': title = 'Aktivni oglasi'; break;
    case '/user/history': title = 'Povijest oglasa'; break;
    case '/user/servicers': title = 'Pretraga servisera'; break;
    case '/user/search': title = 'Pretraga oglasa'; break;
    default: break;
  }
  document.title = 'e-servis | ' + title;

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
        <div
          style={{ borderLeft: '1px solid white', width: '10px' }}
        >&nbsp;</div>

        <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
          <Dropdown.Toggle variant="gray" id="dropdown-basic" className="no-border-radius" >
            {context.loading && <span>Profil</span>}
            {!context.loading && context.data.firstName + " " + context.data.lastName}
          </Dropdown.Toggle>

          <Dropdown.Menu className="no-border-radius p-0" onClick={() => setShowDropdown(false)}>
            <div className=" px-3 py-1 header-dropdown-item">
              <Link to="/user/profile" style={{ color: 'black', textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faUser} className="mr-2 text-darkGray"/>
                <span>Profil</span>
              </Link>
            </div>
            <div className=" px-3 py-1 header-dropdown-item">
              <Link to="/logout" style={{ color: 'black', textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-darkGray"/>
                <span>Odjva</span>
              </Link>
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <img src={auth.data.profilePictureURL} alt="avatar" className="rounded-circle ml-2" style={{ width: '45px', height: '45px' }} />
      </div>

    </CHeader>
  )
}

export default UserHeader;
