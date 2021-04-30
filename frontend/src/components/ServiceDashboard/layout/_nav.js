import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComments, faSearch, faHistory, faUser, faSignOutAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/service/dashboard',
    icon: <FontAwesomeIcon icon={faHome} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Poruke',
    to: '/service/messages',
    icon: <FontAwesomeIcon icon={faComments} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pretraga']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pretraga oglasa',
    to: '/service/search',
    icon: <FontAwesomeIcon icon={faSearch} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pretraga servisera',
    to: '/service/servicers',
    icon: <FontAwesomeIcon icon={faBuilding} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Ponude']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Aktivne ponude',
    to: '/service/active',
    icon: <FontAwesomeIcon icon={faNewspaper} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Povijest ponuda',
    to: '/service/history',
    icon: <FontAwesomeIcon icon={faHistory} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Korisnik']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profil',
    to: '/service/profile',
    icon: <FontAwesomeIcon icon={faUser} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Odjava',
    to: '/logout',
    icon: <FontAwesomeIcon icon={faSignOutAlt} className="c-sidebar-nav-icon"/>
  }
]

export default _nav
