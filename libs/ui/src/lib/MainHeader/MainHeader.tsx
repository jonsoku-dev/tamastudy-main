import React from 'react';
import ProgressBar from 'react-progressbar-on-scroll';
import { Link as ScrollLink } from 'react-scroll/modules';
import Link from 'next/link';
import { StyledHeader, StyledHeaderWrapper } from './MainHeader.styles';

import { theme } from '../Styles';
import { SCROLL_LINK_OFFSET } from '@tama/const';
import { useScrollPosition } from '@tama/hooks';
import { StyledInnerContainer } from '../Layouts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainHeaderProps {
  user: any | null;
  isActive?: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  user,
  isActive = false,
}) => {
  const scrollPosition = useScrollPosition();
  return (
    <StyledInnerContainer>
      <StyledHeaderWrapper
        isNavActive={isActive}
        isScrolled={scrollPosition > 64}
      >
        <ProgressBar color={theme.colors?.primary ?? '#6500fc'} />
        <StyledHeader>
          <img src="/t-p.svg" alt="" width={32} height={32} />
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
        </StyledHeader>
      </StyledHeaderWrapper>
    </StyledInnerContainer>
  );
};
