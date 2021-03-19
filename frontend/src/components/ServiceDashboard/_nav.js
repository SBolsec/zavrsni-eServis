import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/service/dashboard',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Poruke',
    to: '/service/messages',
    icon: 'cil-chat-bubble',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pretraga']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pretraga oglasa',
    to: '/service/search',
    icon: 'cil-search',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pretraga servisera',
    to: '/service/servicers',
    icon: 'cil-search',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Ponude']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Aktivne ponude',
    to: '/service/active',
    icon: 'cil-newspaper',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Povijest ponuda',
    to: '/service/history',
    icon: 'cil-history',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Korisnik']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profil',
    to: '/service/profile',
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
