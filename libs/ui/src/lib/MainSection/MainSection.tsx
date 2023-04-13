import React from 'react';
import { Element } from 'react-scroll';
import styled, { css } from 'styled-components';

interface MainSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  elementName: string;
  hasTitle?: boolean;
  isFirst?: boolean;
}

export const MainSection: React.FC<MainSectionProps> = ({
  elementName,
  hasTitle = false,
  isFirst = false,
  children,
  ...rest
}) => {
  return (
    <Element name={elementName}>
      <StyledSection {...rest} isFirst={isFirst}>
        {hasTitle ? (
          <h2>
            <strong>{elementName.slice(0, 1).toUpperCase()}</strong>
            {elementName.slice(1).toUpperCase()}
          </h2>
        ) : null}
        {children}
      </StyledSection>
    </Element>
  );
};

export default MainSection;

const StyledSection = styled.section<{ isFirst?: boolean }>`
  ${({ isFirst }) =>
    isFirst
      ? css`
          height: 100vh;
          padding-top: 248px;
        `
      : css`
          margin-bottom: 320px;
        `};

  h2 {
    color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
    font-size: 2rem;
    margin-bottom: 48px;
    ${({ theme }) => theme.media.laptop`
      text-align: center;
    `};

    strong {
      font-size: 2.8rem;
    }
  }

  p {
    line-height: 2;
    word-break: break-all;
  }
`;
