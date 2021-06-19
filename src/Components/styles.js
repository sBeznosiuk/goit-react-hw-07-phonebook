import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & button {
    height: 35px;
    background-color: white;
    outline: none;
    border-radius: 3px;
  }

  & button:hover {
    color: white;
    background-color: black;
    transition: 250ms;
  }

  & button:active {
    background-color: blue;
  }
  & input {
    margin-bottom: 30px;
    border-radius: 3px;
  }
`;

const StyledList = styled.ul`
  list-style: none;

  & li {
    margin-bottom: 20px;
  }

  & li button {
    height: 25px;
    background-color: white;
    outline: none;
    border-radius: 3px;
    margin-left: 30px;
  }

  & li button:hover {
    color: white;
    background-color: black;
    transition: 250ms;
  }

  & li button:active {
    background-color: blue;
  }
`;

export { StyledForm, StyledList };
