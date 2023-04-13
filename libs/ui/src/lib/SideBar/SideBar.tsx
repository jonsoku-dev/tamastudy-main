import React from 'react';
import styled from 'styled-components';

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
  return (
    <StyledSubArea>
      <nav>
        <ul id="g-navi">
          <li>
            <a
              href="https://www.instagram.com/tamastudy__tokyo/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/insta.svg" alt="instagram" />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noreferrer">
              <img src="/twitter-outlined.svg" alt="twitter" />
            </a>
          </li>
        </ul>
      </nav>
    </StyledSubArea>
  );
};

/**
 * Aside
 */
const StyledSubArea = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 16px;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;

      li {
        a {
          img {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
`;
