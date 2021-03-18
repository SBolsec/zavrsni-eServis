import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/user/dashboard',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Poruke',
    to: '/user/messages',
    icon: 'cil-chat-bubble',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Oglasi']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Aktivni oglasi',
    to: '/user/active',
    icon: 'cil-newspaper',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Povijest oglasa',
    to: '/user/history',
    icon: 'cil-history',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pretraga servisera',
    to: '/user/servicers',
    icon: 'cil-search',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Korisnik']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profil',
    to: '/user/profile',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Odjava',
    to: '/logout',
    icon: 'cil-account-logout',
  }
]

export default _nav
