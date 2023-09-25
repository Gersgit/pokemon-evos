import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonCard from "./PokemonCard";
import NavButtons from "./NavButtons";
import { v4 as uuidv4 } from "uuid";
const PokemonListStyled = styled.div`
  width: 500px;
  margin: 0 auto;

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    padding: 0;
    list-style: none;
  }
`;

const PokemonList = () => {
  const [chainData, setChainData] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  let evoChain = [];
  let evoList = [];

  const getEvolutions = (chain) => {
    evoChain.push(chain.species.name);
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      getEvolutions(chain.evolves_to[0]);
    } else {
      evoList.push(evoChain);
      evoChain = [];
    }
  };

  useEffect(() => {
    const pokemonChains = [];

    const fetchPokemon = async () => {
      for (let i = 0; i < 20; i++) {
        await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i + count}/`)
          .then((res) => res.json())
          .then((data) => pokemonChains.push(data))
          .catch((err) => {
            // Do something for an error here
            // Maybe add a click again message
            console.log("Error Reading data " + err);
          });
      }

      pokemonChains.forEach((p) => {
        evoChain.push(p.chain.species.name);

        if (p.chain.evolves_to[0]) {
          getEvolutions(p.chain.evolves_to[0]);
        } else {
          evoList.push(evoChain);
          evoChain = [];
        }
      });

      setChainData(evoList);
    };

    fetchPokemon();
  }, [count]);

  const handleClick = (next) => {
    setLoading(true);
    setCount(next ? count + 20 : count - 20);
  };

  return (
    <div>
      <h1>Pokémon Evolutions</h1>
      <NavButtons
        title="Next"
        position="right"
        handleClick={() => handleClick(true)}
      />
      {count > 20 && (
        <NavButtons
          title="Previous"
          position="left"
          handleClick={() => handleClick(false)}
        />
      )}

      <PokemonListStyled>
        {chainData.map((chain) => {
          return (
            <ul key={uuidv4()}>
              {chain.map((p) => (
                <PokemonCard
                  key={uuidv4()}
                  pokemonName={p}
                  setLoading={setLoading}
                  loading={loading}
                />
              ))}
            </ul>
          );
        })}
      </PokemonListStyled>
    </div>
  );
};

export default PokemonList;