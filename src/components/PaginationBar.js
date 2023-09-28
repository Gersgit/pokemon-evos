import styled from "styled-components";

const PaginationBarStyled = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export const PokeBalls = styled.button`
  @keyframes shakeRotate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    75% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(10deg);
    }
  }

  background: linear-gradient(
    141deg,
    rgba(255, 0, 0, 1) 47%,
    rgba(0, 0, 0, 1) 49%,
    rgba(255, 255, 255, 1) 50%
  );
  border: 1px solid black;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  margin: 5px;
  padding: 0px;
  text-align: center;
  cursor: pointer;
  font-weight: bolder;
  font-size: 18px;
  position: relative;

  &:after {
    content: "${(props) => props.number}";
    width: 14px;
    height: 14px;
    border: 1px solid black;
    background: white;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -7px;
    margin-left: -7px;
    box-sizing: border-box;
    font-size: 10px;
  }

  &:hover {
    animation: shakeRotate 0.5s infinite;
    box-shadow: 0px 0px 5px 1px white;
  }

  &.active {
    box-shadow: 0px 0px 10px 3px #fcd000;
  }
`;

const PaginationBar = ({
  pagination,
  count,
  fetchChain,
  currentPage,
  setCurrentPage,
}) => {
  const getPage = (page, index) => {
    const offset = count * index;

    setCurrentPage(page);
    fetchChain(
      `https://pokeapi.co/api/v2/evolution-chain?offset=${offset}&limit=${count}`
    );
  };

  return (
    <PaginationBarStyled>
      {pagination.map((p, i) => {
        return (
          <PokeBalls
            number={p}
            key={p}
            onClick={() => {
              getPage(p, i);
            }}
            className={currentPage === p && "active"}
          />
        );
      })}
    </PaginationBarStyled>
  );
};

export default PaginationBar;
