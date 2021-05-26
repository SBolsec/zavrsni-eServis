import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComments, faSearch, faHistory, faUser, faSignOutAlt, faNewspaper, faBuilding, faPlus } from '@fortawesome/free-solid-svg-icons';

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/user/dashboard',
    icon: <FontAwesomeIcon icon={faHome} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Poruke',
    to: '/user/messages',
    icon: <FontAwesomeIcon icon={faComments} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Oglasi']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Novi oglas',
    to: '/user/create',
    icon: <FontAwesomeIcon icon={faPlus} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Aktivni oglasi',
    to: '/user/active',
    icon: <FontAwesomeIcon icon={faNewspaper} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Povijest oglasa',
    to: '/user/history',
    icon: <FontAwesomeIcon icon={faHistory} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pretraga']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pretraga oglasa',
    to: '/user/search',
    icon: <FontAwesomeIcon icon={faSearch} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pretraga servisa',
    to: '/user/services',
    icon: <FontAwesomeIcon icon={faBuilding} className="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Korisnik']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profil',
    to: '/user/profile',
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
