import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const colors = {
  fire: "orange",
  grass: "lightgreen",
  electric: "yellow",
  water: "#70ffea",
  ground: "darkgrey",
  rock: "grey",
  fairy: "pink",
  poison: "greenyellow",
  bug: "#94ecbe",
  dragon: "orange",
  psychic: "#7c7db6",
  flying: "#fcca46",
  fighting: "darkgrey",
  normal: "lightgrey",
  ice: "#00f2f2",
  dark: "#4f7ecf",
  ghost: "#7685a7",
  steel: "steelblue",
};

const PokemonCardStyled = styled.li`
  padding: 12px;
  border-radius: 20px;
  border: 2px solid
    ${(props) => colors[props.pokemonType && props.pokemonType[0]]};
  position: relative;
  background: linear-gradient(to bottom, rgb(43, 42, 42), rgb(27, 27, 27));

  section {
    margin: 10px 0;

    &.top {
      margin-top: 0px;
      display: flex;
      justify-content: space-between;

      p {
        margin: 0;
        font-size: 12px;
        font-weight: bolder;

        &:last-child {
          font-weight: normal;
          span {
            font-weight: bolder;
            color: gold;
          }
        }
      }
    }

    &.mid {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      margin: 0 auto;
      background: linear-gradient(
        to bottom,
        rgba(214, 214, 214, 0.3),
        rgba(77, 77, 77, 0.1)
      );
      box-shadow: 0 0 10px 10px rgb(202 201 201 / 5%);

      img {
        width: 100px;
        height: 100px;
        object-fit: scale-down;
      }
    }

    p {
      color: white;
    }

    h3 {
      margin: 0px;
      color: white;
      text-transform: capitalize;
    }

    .types {
      p {
        &:first-child {
          font-size: 12px;
          margin-bottom: 2px;
          margin-top: 0px;
        }

        &:last-child {
          font-size: 12px;
          font-weight: bolder;
          margin-top: 2px;
          text-transform: capitalize;
        }
      }
    }

    .pokeSize {
      display: flex;
      justify-content: space-between;

      span {
        p {
          &:first-child {
            font-size: 12px;
            margin-bottom: 2px;
          }

          &:last-child {
            font-size: 14px;
            font-weight: bolder;
            margin-top: 2px;
          }
        }
      }
    }
  }
`;

// const imgUrl3d = `https://projectpokemon.org/images/normal-sprite/${pokemonName}.gif`

const PokemonCard = ({ pokemon }) => {
  const [imgUrl, setImgUrl] = useState();
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);

const pokemonName = pokemon[0].name;
const pokemonId = pokemon[0].id;
  
  useEffect(() => {
    setImgUrl(
      `https://projectpokemon.org/images/normal-sprite/${pokemonName}.gif`
    );

    const fetchPokemonImg = async () => {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemonData(data);
          setLoading(false);
        });
    };

    fetchPokemonImg();
  }, [pokemon]);

  const typesList = pokemonData?.types.map((t) => t.type.name);

  return (
    !loading && (
      <PokemonCardStyled pokemonType={typesList} key={uuidv4()}>
        <section className="top">
          <p>#{pokemonData?.id}</p>
          <p>
            <span>HP </span>
            {pokemonData?.stats[0].base_stat}
          </p>
        </section>
        <section className="mid">
          <img
            src={imgUrl}
            alt={pokemonName}
            onError={() => setImgUrl(pokemonData?.sprites.front_default)}
          />
        </section>
        <section className="bottom">
          <h3>{pokemonName}</h3>
          <div className="pokeSize">
            <span>
              <p>Weight</p>
              <p>{pokemonData?.weight}</p>
            </span>
            <span>
              <p>Height</p>
              <p>{pokemonData?.height}</p>
            </span>
          </div>
          <div className="types">
            <p>Type</p>
            <p>{typesList?.join(" / ")}</p>
          </div>
        </section>
      </PokemonCardStyled>
    )
  );
};

export default PokemonCard;
