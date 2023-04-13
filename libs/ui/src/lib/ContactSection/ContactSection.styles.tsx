import styled from 'styled-components';

export const StyledContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    height: 48px;
    padding: 8px;
  }

  textarea {
    width: 100%;
    height: calc(48px * 3);
    resize: none;
    font-family: sans-serif;
    padding: 8px;
  }

  /* error message */

  p {
    margin-top: 4px;
    color: red;
    font-size: 0.8rem;
  }

  > div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 0;
    min-width: 0;
    margin-bottom: 16px;

    > label {
      flex: 1;
      text-align: left;
      margin-top: 8px;
    }

    > div {
      flex: 4;
    }
  }

  button {
    margin-top: 16px;
    cursor: pointer;
    display: inline-block;
    padding: 16px;
    border-radius: 30px;
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    outline: none;
    transition: all 0.4s ease-out;
    background: inherit;

    &:hover {
      border-color: transparent;
      color: #fff;
      background: linear-gradient(
        270deg,
        ${({ theme }) => theme.colors.primary} 0%,
        #fff 60%,
        #fff 100%
      );
      background-size: 200% auto;
      background-position: right center;
      box-shadow: 0 5px 10px rgb(250, 108, 159, 0.4);
    }
  }
`;
