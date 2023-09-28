import { useEffect, useState } from "react";
import PokemonTitle from "./PokemonTitle";
import PaginationBar from "./PaginationBar";
import styled from "styled-components";
import { PokeBalls } from "./PaginationBar";

const StickyHeader = styled.header`
  position: sticky;
  top: -200px;
  z-index: 999;
`;

const PaginationBarStyled = styled.div`
  position: sticky;
  top: 10px;
  max-width: 500px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 100px 1fr 40px 100px;
  grid-gap: 10px;
  background: #232323;
  color: white;
  padding: 5px;
  border-radius: 50px;

  select {
    padding: 10px;
  }

  button {
    &.left {
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }

    &.right {
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }

    &.left,
    &.right {
      background: none;
      border: none;
      color: white;
      font-size: 20px;

      &:hover {
        box-shadow: inset -1px 0px 20px 0px #673ab7;
      }
    }
  }
`;

const Header = ({
  count,
  setCount,
  fetchChain,
  chainPath,
  chainNext,
  chainPrev,
  pagination,
}) => {
  const countVals = ["20", "40", "60", "80", "100"];
  const setUrlLimit = (url) => url.replace(/limit=\d+/, `limit=${count}`);

  const handleFetchLimit = (e) => {
    setCount(e.target.value);
    fetchChain(
      chainPath.toString().replace(`limit=${count}`, `limit=${e.target.value}`)
    );
  };

  const [currentPage, setCurrentPage] = useState(1);

  pagination.length < currentPage && setCurrentPage(pagination.length);

  return (
    <StickyHeader>
      <PokemonTitle title="Pokémon Evolutions" />
      <PaginationBar
        pagination={pagination}
        count={count}
        fetchChain={fetchChain}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <PaginationBarStyled>
        <button
          onClick={() => fetchChain(setUrlLimit(chainPrev))}
          className="left"
          disabled={!chainPrev}
        >
          Previous
        </button>

        <select value={count} onChange={handleFetchLimit}>
          {countVals.map((v) => (
            <option value={v}>View {v} evolutions.</option>
          ))}
        </select>

        <PokeBalls number={currentPage} />

        <button
          onClick={() => fetchChain(setUrlLimit(chainNext))}
          className="right"
          disabled={!chainNext}
        >
          Next
        </button>
      </PaginationBarStyled>
    </StickyHeader>
  );
};

export default Header;
