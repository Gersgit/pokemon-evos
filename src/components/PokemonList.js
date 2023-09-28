import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonCard from "./PokemonCard";
import NavButtons from "./NavButtons";
import { v4 as uuidv4 } from "uuid";
import PaginationBar from "./PaginationBar";
import PokemonTitle from "./PokemonTitle";

const PokemonListStyled = styled.div`
  width: 500px;
  margin: 0 auto;

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    padding: 0;
    list-style: none;
    padding: 20px;
    border-bottom: 5px solid #232323;
    border-radius: 20px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const PokemonList = () => {
  const [chainData, setChainData] = useState([]);
  const [count, setCount] = useState(20);
  const [loading, setLoading] = useState(true);
  let evoChain = [];
  let evoList = [];

  const [chainAmount, setChainAmount] = useState(0);
  const [chainNext, setChainNext] = useState("");
  const [chainPrev, setChainPrev] = useState("");
  const [chains, setChains] = useState([]);
  const [chainPath, setChainPath] = useState(
    "https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=20"
  );

  const [pagination, setPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getEvolutions = (chain) => {
    const pokemonId = chain.species.url
      .split("pokemon-species/")[1]
      .split("/")[0];

    evoChain.push({ name: chain.species.name, id: pokemonId });

    if (!chain.evolves_to.length > 0) {
      return;
    }

    chain.evolves_to.forEach((pc) => {
      const pokemonId = pc.species.url
        .split("pokemon-species/")[1]
        .split("/")[0];

      evoChain.push({ name: pc.species.name, id: pokemonId });
      // evoChain.push(pc.species.name);

      if (pc.evolves_to.length > 0) {
        pc.forEach((pce) => getEvolutions(pce));
      }
    });
  };

  const fetchChain = (url) => {
    console.log("fetch chain", url);

    setChainPath(url);
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data1", data);
        setChainAmount(data.count);
        setChainNext(data.next);
        setChainPrev(data.previous);
        setChains(data.results);
      })
      .catch((err) => {
        // Do something for an error here
        // Maybe add a click again message
        console.log("Error Reading data " + err);
      });
  };

  useEffect(() => {
    console.log("chain path changed");
    setLoading(true);
    fetchChain(chainPath);
  }, []);

  useEffect(() => {
    console.log("fetching chains..");

    setPagination(
      Array.from(
        { length: parseInt(chainAmount / count) + 1 },
        (_, index) => index + 1
      )
    );

    const fetchChains = () => {
      const fetchPromises = chains.map((chain) => {
        return fetch(chain.url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok for ${chain.url}`);
            }
            return response.json();
          })
          .catch((error) => {
            console.error(error);
            return null; // Handle the error and return an appropriate value
          });
      });

      Promise.all(fetchPromises)
        .then((data) => {
          data.forEach((d) => {
            const pokemonId = d.chain.species.url
              .split("pokemon-species/")[1]
              .split("/")[0];

            evoChain.push({ name: d.chain.species.name, id: pokemonId });

            if (d.chain.evolves_to.length > 0) {
              d.chain.evolves_to.forEach((pc) => {
                getEvolutions(pc);
              });
            }
            evoList.push(evoChain);
            setChainData(evoList);
            evoChain = [];
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchChains();
  }, [chains]);

  const countVals = ["20", "40", "60", "80", "100"];
  const setUrlLimit = (url) => url.replace(/limit=\d+/, `limit=${count}`);

  const handleFetchLimit = (e) => {
    setCount(e.target.value);
    fetchChain(
      chainPath.toString().replace(`limit=${count}`, `limit=${e.target.value}`)
    );
  };

  return (
    <div>
      <PokemonTitle title="Pokémon Evolutions" />
      <select value={count} onChange={handleFetchLimit}>
        {countVals.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>

      <PaginationBar
        pagination={pagination}
        count={count}
        fetchChain={fetchChain}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {chainNext && (
        <NavButtons
          title="Next"
          position="right"
          handleClick={() => fetchChain(setUrlLimit(chainNext))}
        />
      )}
      {chainPrev && (
        <NavButtons
          title="Previous"
          position="left"
          handleClick={() => fetchChain(setUrlLimit(chainPrev))}
        />
      )}

      <PokemonListStyled>
        {!loading &&
          chainData.map((chain) => {
            return (
              <ul key={uuidv4()}>
                {chain.map((p) => (
                  <PokemonCard key={uuidv4()} pokemon={[p]} />
                ))}
              </ul>
            );
          })}
      </PokemonListStyled>
    </div>
  );
};

export default PokemonList;
