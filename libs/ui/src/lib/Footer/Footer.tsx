import { Link as ScrollLink } from 'react-scroll/modules';
import styled from 'styled-components';
import { SCROLL_LINK_OFFSET } from '@tama/const';

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <div role="button">
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
          TOP
        </ScrollLink>
      </div>
      <img src="/logo-small.svg" width={240} height={120} alt="footer-logo" />
    </StyledFooter>
  );
};

/**
 * Footer
 */

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
  position: relative;

  > div {
    position: absolute;
    top: calc(-50px - 16px);
    right: 16px;
    width: 50px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
    cursor: pointer;
    font-size: 0.8rem;

    &:hover {
      color: #fff;
      background-color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
    }
  }
`;
