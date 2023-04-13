import styled, { css } from 'styled-components';
import { zIndex } from '@tama/const';

export const StyledHeaderWrapper = styled.header<{
  isNavActive?: boolean;
  isScrolled?: boolean;
}>`
  position: fixed;
  z-index: ${zIndex.gbHeader};
  padding-top: 4px;
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 86%,
    rgba(255, 255, 255, 0.7553396358543417) 92%,
    rgba(255, 255, 255, 0) 100%
  );
  ${({ isScrolled }) => isScrolled && css``};
  ${({ isNavActive, theme }) => isNavActive && css``};
  ${({ theme }) => theme.media.laptop`
    width: 62rem;
    margin: 0 auto;
  `};
`;

export const StyledHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px 16px 32px;
  transition: all 500ms ease-in-out;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  > div {
    display: none;

    ${({ theme }) => theme.media.laptop`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `};

    ul {
      display: flex;
      list-style: none;

      li {
        cursor: pointer;

        &:not(:last-of-type) {
          margin-right: 32px;
        }

        a {
          &.active {
            font-weight: 700;
            color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
          }
        }
      }
    }
  }
`;
