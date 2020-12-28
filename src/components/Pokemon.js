import React from 'react';
import styled from 'styled-components/native';

export default function Pokemon({pokemon, navigation}) {
  return (
    <Main onPress={() => navigation.navigate('Details', {pokemon})}>
      <AvatarContainer>
        <Avatar
          source={{
            uri: pokemon.sprites.front_default,
          }}
          resizeMode="contain"
        />
      </AvatarContainer>
      <Info>
        <Name>{pokemon.name}</Name>
        <Number># {pokemon.id}</Number>
      </Info>
      <TypeList>
        {pokemon.types.map((type, index) => (
          <TypeContainer key={index}>
            <Type>{type.type.name}</Type>
          </TypeContainer>
        ))}
      </TypeList>
    </Main>
  );
}

const Main = styled.TouchableOpacity`
  background-color: #2f1069;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`;
const AvatarContainer = styled.View`
  width: 50px;
  height: 50px;
  background: #4b238d;
  border-radius: 50px;
  margin-right: 30px;
`;
const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`;
const Info = styled.View`
  flex: 2;
  justify-content: center;
`;
const Name = styled.Text`
  color: #eee;
  font-weight: bold;
  text-transform: capitalize;
`;
const Number = styled.Text`
  color: #ccc;
  font-weight: bold;
  margin-top: 4px;
`;
const TypeList = styled.View`
  justify-content: center;
`;
const Type = styled.Text`
  color: #eee;
  text-align: center;
  text-transform: capitalize;
`;
const TypeContainer = styled.View`
  background: #4b238d;
  border-radius: 6px;
  padding: 3px 15px;
  margin: 4px 0;
`;
