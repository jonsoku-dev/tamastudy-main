import { Roboto } from '@next/font/google';
import {
  createGlobalStyle,
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from 'styled-components';

export const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const theme = {
  colors: {
    primary: '#6500fc',
    white: '#ffffff',
    black: '#000000',
  },
  media: {
    tablet: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
      @media (min-width: 43rem) {
        ${css(first, ...interpolations)}
      }
    `,
    laptop: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
      @media (min-width: 62rem) {
        ${css(first, ...interpolations)}
      }
    `,
    desktop: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
      @media (min-width: 82rem) {
        ${css(first, ...interpolations)}
      }
    `,
  },
} as const;

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
