import styled from 'styled-components';

export const StyledInnerContainer = styled.div`
  box-sizing: border-box;
  padding: 0 16px;
  ${({ theme }) => theme.media.laptop`
    width: 62rem;
    margin: 0 auto;
    padding: 0;
  `};
`;

export const StyledMain = styled.main`
  flex-grow: 1;
  /* comment and uncomment the next line to see the effect */
  min-width: 0;
  margin-left: 8px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
`;
