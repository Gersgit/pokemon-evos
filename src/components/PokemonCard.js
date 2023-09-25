import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const PokemonCardStyled = styled.li`
  padding: 20px;
  box-shadow: 0px 8px 8px 0px #e7e7e7;
  border-radius: 20px;
  border: 1px solid #f5f5f5;
  height: 118px;

  h3 {
    margin: 0px;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: scale-down;
  }
`;

// const imgUrl3d = `https://projectpokemon.org/images/normal-sprite/${pokemonName}.gif`

const PokemonCard = ({ pokemonName, setLoading, loading }) => {
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    setImgUrl(
      `https://projectpokemon.org/images/normal-sprite/${pokemonName}.gif`
    );
  }, [pokemonName]);

  const fetchPokemonImg = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setImgUrl(data.sprites.front_default);
      });
  };

  return (
    // !loading && (
    <PokemonCardStyled key={uuidv4()}>
      <img src={imgUrl} alt={pokemonName} onError={() => fetchPokemonImg()} />
      <h3>{pokemonName}</h3>
    </PokemonCardStyled>
    // )
  );
};

export default PokemonCard;
