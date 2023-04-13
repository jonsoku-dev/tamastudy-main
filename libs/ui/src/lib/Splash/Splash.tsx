import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTimeout } from '@tama/hooks';

interface SplashProps {
  active?: boolean;
  children: React.ReactNode;
}

export const Splash: React.FC<SplashProps> = ({ active = false, children }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [fullFadeOut, setFullFadeOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [appear, setAppear] = useState(false);

  useTimeout(() => setFadeOut(true), 300);
  useTimeout(() => setFullFadeOut(true), 800);
  useTimeout(() => setAppear(true), 1000);
  useTimeout(() => setIsRemoved(true), 1200);

  if (!active) return <>{children}</>;

  return (
    <StyledBody appear={appear}>
      {isRemoved ? null : (
        <StyledSplash isFadeOut={fullFadeOut}>
          <StyledLogo>
            <StyledImage
              src="/splash-logo.svg"
              alt="loading"
              isFadeOut={fadeOut}
            />
          </StyledLogo>
        </StyledSplash>
      )}
      <StyledBg></StyledBg>
      <StyledAnimateContainer>{children}</StyledAnimateContainer>
    </StyledBody>
  );
};

const PageAnime = keyframes`
  0% {
    transform-origin: left;
    transform: translateX(-300%) skewX(-45deg);
  }
  100% {
    transform-origin: left;
    transform: translateX(500%) skewX(-45deg);
  }
`;

const PageAnimeAppear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledBody = styled.div<{ appear?: boolean }>`
  ${({ appear }) =>
    appear
      ? css`
          ${StyledBg} {
            display: block;
            animation-name: ${PageAnime};
            animation-duration: 1.2s;
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;
            content: '';
            position: fixed;
            z-index: 999;
            width: 50%;
            height: 100vh;
            top: 0;
            left: 0;
            transform: translateX(-300%) skewX(-45deg);
            background: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
          }

          ${StyledAnimateContainer} {
            animation-name: ${PageAnimeAppear};
            animation-duration: 1s;
            animation-delay: 0.6s;
            animation-fill-mode: forwards;
            opacity: 0;
          }
        `
      : css``}
`;

const fullFadeOutAnime = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const fadeUpAnime = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledSplash = styled.div<{ isFadeOut?: boolean }>`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
  text-align: center;
  color: #fff;

  ${({ isFadeOut }) =>
    isFadeOut
      ? css`
          animation-name: ${fullFadeOutAnime};
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
          opacity: 0;
        `
      : css``};
`;
const StyledLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledImage = styled.img<{ isFadeOut?: boolean }>`
  width: 260px;
  ${({ isFadeOut }) =>
    isFadeOut
      ? css``
      : css`
          animation-name: ${fadeUpAnime};
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
          opacity: 0;
        `};
`;

const StyledBg = styled.div`
  display: none;
`;

const StyledAnimateContainer = styled.div`
  opacity: 0;
`;
