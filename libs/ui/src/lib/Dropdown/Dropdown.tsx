import { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import styled from 'styled-components';
import { SCROLL_LINK_OFFSET } from '@tama/const';

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <StyledDropdownWrapper ref={dropdownRef}>
        <ul>
          <StyledGrandParentLi
            onClick={() => setIsOpen(!isOpen)}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            HOME
          </StyledGrandParentLi>
        </ul>

        {isOpen && (
          <StyledAbsoluteWrapper>
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
            </ul>
          </StyledAbsoluteWrapper>
        )}
      </StyledDropdownWrapper>
    </>
  );
};

export default Dropdown;

const StyledDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  text-align: left;
`;
const StyledGrandParentLi = styled.li`
  all: unset;
  height: 48px;
  display: flex;
  align-items: center;
`;
const StyledAbsoluteWrapper = styled.div`
  position: absolute;
  top: calc(48px);

  > ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: #fff;
    padding: 32px;
    border-radius: 10px;
    border: 1px solid #eaeaea;
  }
`;
