import styled from "styled-components";

const PokemonTitleStyle = styled.h1`
  @font-face {
    font-family: "pokemonSolid";
    src: url("../assets/PokemonSolid.ttf") format("truetype");
  }

  @font-face {
    font-family: "pokemonHollow";
    src: url("../assets/PokemonHollow.ttf") format("truetype");
  }

  font-family: "pokemonSolid", sans-serif;
  color: #fccf00;

  &:after {
    content: "${(props) => props.title}";
    font-family: "pokemonHollow", sans-serif;
    color: #2468b1;    
    margin-top: -45px;
    display: block;
  }
`;

const PokemonTitle = ({ title }) => {
  return <PokemonTitleStyle title={title}>{title}</PokemonTitleStyle>;
};

export default PokemonTitle;
