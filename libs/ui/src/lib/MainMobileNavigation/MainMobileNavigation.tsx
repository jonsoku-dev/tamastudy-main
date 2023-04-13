import React from 'react';
import { Link as ScrollLink } from 'react-scroll/modules';
import Link from 'next/link';
import {
  StyledCircleBg,
  StyledGlobalNav,
  StyledOpenBtn,
} from './MainMobileNavigation.styles';
import { SCROLL_LINK_OFFSET } from '@tama/const';

interface MainMobileNavigationProps {
  user: any | null;
  isActive?: boolean;
  onClickButton?: () => void;
}

export const MainMobileNavigation: React.FC<MainMobileNavigationProps> = ({
  user,
  isActive = false,
  onClickButton,
}) => {
  return (
    <React.Fragment>
      <StyledOpenBtn
        role="button"
        aria-pressed="false"
        onClick={onClickButton}
        isActive={isActive}
      >
        <span></span>
        <span></span>
        <span></span>
      </StyledOpenBtn>
      <StyledGlobalNav isPanelactive={isActive}>
        <div>
          <ul>
            <li>
              <ScrollLink
                activeClass={'active'}
                spy={true}
                smooth={true}
                duration={500}
                to="top"
                offset={SCROLL_LINK_OFFSET}
                role="link"
                aria-label={`internal scroll link`}
                onClick={onClickButton}
              >
                <span>TOP</span>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass={'active'}
                spy={true}
                smooth={true}
                duration={500}
                to="about"
                offset={SCROLL_LINK_OFFSET}
                role="link"
                aria-label={`internal scroll link`}
                onClick={onClickButton}
              >
                <span>ABOUT</span>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass={'active'}
                spy={true}
                smooth={true}
                duration={500}
                to="members"
                offset={SCROLL_LINK_OFFSET}
                role="link"
                aria-label={`internal scroll link`}
                onClick={onClickButton}
              >
                <span>MEMBERS</span>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass={'active'}
                spy={true}
                smooth={true}
                duration={500}
                to="news"
                offset={SCROLL_LINK_OFFSET}
                role="link"
                aria-label={`internal scroll link`}
                onClick={onClickButton}
              >
                <span>NEWS</span>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass={'active'}
                spy={true}
                smooth={true}
                duration={500}
                to="gallery"
                offset={SCROLL_LINK_OFFSET}
                role="link"
                aria-label={`internal scroll link`}
                onClick={onClickButton}
              >
                <span>GALLERY</span>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass={'active'}
                spy={true}
                smooth={true}
                duration={500}
                to="faq"
                offset={SCROLL_LINK_OFFSET}
                role="link"
                aria-label={`internal scroll link`}
                onClick={onClickButton}
              >
                <span>FAQ</span>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass={'active'}
                spy={true}
                smooth={true}
                duration={500}
                to="contact"
                offset={SCROLL_LINK_OFFSET}
                role="link"
                aria-label={`internal scroll link`}
                onClick={onClickButton}
              >
                <span>CONTACT</span>
              </ScrollLink>
            </li>
            {user ? (
              <li>
                <Link href="/api/auth/logout">LOGOUT</Link>
              </li>
            ) : (
              <li>
                <Link href="/api/auth/login">LOGIN</Link>
              </li>
            )}
          </ul>
        </div>
      </StyledGlobalNav>
      <StyledCircleBg isCircleActive={isActive} />
    </React.Fragment>
  );
};
