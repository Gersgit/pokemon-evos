import styled from "styled-components";

const StyledButtons = styled.button`
  position: fixed;
  top: 50%;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: gold;
  border: 10px solid navy;
  color: navy;
  font-size: 15px;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0px 0px 20px 3px #673ab7;
  }

  &.left {
    left: 20px;
  }

  &.right {
    right: 10px;
  }
`;

const NavButtons = ({ title, handleClick, position }) => {
  return (
    <StyledButtons onClick={handleClick} className={position}>
      {title}
    </StyledButtons>
  );
};

export default NavButtons;
