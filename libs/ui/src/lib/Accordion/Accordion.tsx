import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import { CSSTransition } from 'react-transition-group';

interface AccordionProps {
  title: string;
  description: string;
}

export const Accordion: React.FC<AccordionProps> = ({ title, description }) => {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  return (
    <li>
      <section>
        <StyledAccordionTitle
          isClose={inProp}
          onClick={() => setInProp((prev) => !prev)}
        >
          {title}
        </StyledAccordionTitle>
        <CSSTransition
          nodeRef={nodeRef}
          in={inProp}
          timeout={300}
          classNames="accordion"
          unmountOnExit
        >
          <StyledAccordionBox ref={nodeRef}>
            <p>{parse(description)}</p>
          </StyledAccordionBox>
        </CSSTransition>
      </section>
    </li>
  );
};

const StyledAccordionTitle = styled.h4<{ isClose?: boolean }>`
  position: relative;
  cursor: pointer;
  font-size: 1rem;
  font-weight: normal;
  padding: 3% 3% 3% 50px;
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.colors?.white ?? '#ffffff'};
  font-weight: 700;

  &::before,
  &::after {
    position: absolute;
    content: '';
    width: 15px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors?.white ?? '#ffffff'};
  }

  &::before {
    top: 48%;
    left: 15px;
    transform: rotate(0deg);
    ${({ isClose }) =>
      isClose
        ? css`
            transform: rotate(45deg);
          `
        : css``}
  }

  &::after {
    top: 48%;
    left: 15px;
    transform: rotate(90deg);
    ${({ isClose }) =>
      isClose
        ? css`
            transform: rotate(-45deg);
          `
        : css``}
  }
`;
const StyledAccordionBox = styled.div`
  background: ${({ theme }) => theme.colors?.white ?? '#ffffff'};

  height: 160px;
  max-height: 160px;

  &.accordion-enter {
    height: 0px;
  }

  &.accordion-enter-active {
    height: 160px;
    transition: all 0.3s ease;
  }

  &.accordion-exit {
    height: 160px;
  }

  &.accordion-exit-active {
    height: 0px;
    transition: all 0.3s ease;
  }

  p {
    padding: 24px;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
  }
`;
