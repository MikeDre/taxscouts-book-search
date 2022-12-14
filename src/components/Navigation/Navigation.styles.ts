import styled from 'styled-components';

const NavWrapper = styled.nav`
  background-color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;

  & > div {
    display: flex;
  }
`;

export { NavWrapper };
