import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

import { AppBreadcrumb } from './index';

const AppHeader = () => {
  const headerRef = useRef();
  const { setColorMode } = useColorModes('coreui-free-react-admin-template-theme'); // Corrected line
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
    });
  }, []);

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <h1
              style={{
                color: 'inherit', // Use inherited color from the theme
                fontSize: '1.6rem', // Adjust as needed
                fontWeight: 'bold',
                margin: 0, // Reset default h1 margin
                lineHeight: 'inherit', // Important for vertical alignment
              }}
            >
              Research Job Recruitment Portal
            </h1>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          {/* */}
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
