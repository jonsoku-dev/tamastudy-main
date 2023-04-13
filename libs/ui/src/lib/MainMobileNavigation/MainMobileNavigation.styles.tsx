import styled, { css, keyframes } from 'styled-components';
import { zIndex } from '@tama/const';

const GnaviAnime = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`;

export const StyledOpenBtn = styled.div<{ isActive?: boolean }>`
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: ${zIndex.gbBtn};
  background-color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
  cursor: pointer;
  width: 50px;
  height: 50px;

  span {
    display: inline-block;
    transition: all 0.4s;
    position: absolute;
    left: 14px;
    height: 3px;
    border-radius: 2px;
    background-color: #fff;
    width: 45%;

    &:nth-of-type(1) {
      top: 15px;
    }

    &:nth-of-type(2) {
      top: 23px;
    }

    &:nth-of-type(3) {
      top: 31px;
    }
  }

  ${({ isActive }) =>
    isActive
      ? css`
          span:nth-of-type(1) {
            top: 18px;
            left: 18px;
            transform: translateY(6px) rotate(-45deg);
            width: 30%;
          }

          span:nth-of-type(2) {
            opacity: 0;
          }

          span:nth-of-type(3) {
            top: 30px;
            left: 18px;
            transform: translateY(-6px) rotate(45deg);
            width: 30%;
          }
        `
      : css``};

  ${({ theme }) => theme.media.laptop`
    display: none;
  `};
`;

export const StyledGlobalNav = styled.nav<{ isPanelactive?: boolean }>`
  position: fixed;

  > div {
    display: none;
    position: fixed;
    z-index: ${zIndex.gbNav};
    width: 100%;
    height: 100vh;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  ul {
    opacity: 0;
    position: absolute;
    z-index: ${zIndex.gbNav};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    list-style: none;
    text-align: center;

    li a {
      display: inline-block;
      text-decoration: none;
      color: #fff;
      padding: 10px;
    }
  }

  ${({ isPanelactive }) =>
    isPanelactive &&
    css`
      z-index: ${zIndex.gbNav - 1};
      top: 0;
      width: 100%;
      height: 100vh;

      > div {
        display: block;
      }

      ul {
        opacity: 1;

        li {
          animation-name: ${GnaviAnime};
          animation-duration: 1s;
          animation-delay: 0.2s;
          animation-fill-mode: forwards;
          opacity: 0;
        }
      }
    `};
`;

export const StyledCircleBg = styled.div<{ isCircleActive?: boolean }>`
  position: fixed;
  z-index: ${zIndex.gbNav - 2};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
  transform: scale(0);
  right: -12px;
  top: -12px;
  transition: all 0.6s;

  ${({ isCircleActive }) =>
    isCircleActive &&
    css`
      transform: scale(50);
    `};
`;
