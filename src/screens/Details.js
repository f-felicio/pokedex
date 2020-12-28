import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

// ## SERVICES ##
import api from '../services/api';

export default function Home({route, navigation}) {
  const [intro, setIntro] = useState('');
  const pokemon = route.params?.pokemon ?? null;

  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = async () => {
    await api
      .get(pokemon.species.url)
      .then((response) => {
        const text = response.data.flavor_text_entries[0].flavor_text;
        const textFormat = text.replace(/[\t\n\s\s]+/g, ' ');
        setIntro(textFormat);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  return (
    <MainContainer>
      <Header>
        <HeaderImage
          source={require('../assets/img/header-2.jpg')}
          resizeMode="cover"
        />
        <BtnBack onPress={() => navigation.navigate('Home')}>
          <BtnBackTxt>X</BtnBackTxt>
        </BtnBack>
        <HeaderRow>
          <AvatarContainer>
            <Avatar
              source={{
                uri: pokemon.sprites.front_default,
              }}
              resizeMode="cover"
            />
          </AvatarContainer>
          <InfoContainer>
            <Number># {pokemon.id}</Number>
            <Title>{pokemon.name}</Title>
            <TypesRow>
              {pokemon.types.map((type, index) => (
                <TypeContainer key={index}>
                  <TypeName>{type.type.name}</TypeName>
                </TypeContainer>
              ))}
            </TypesRow>
          </InfoContainer>
        </HeaderRow>
        <AboutContainer>
          <About>{intro}</About>
        </AboutContainer>
        <Resume>
          <Row>
            <Info>
              <Label>Weight</Label>
              <Value>{pokemon.weight}</Value>
            </Info>
            <Info>
              <Label>Height</Label>
              <Value>{pokemon.height}</Value>
            </Info>
          </Row>
          <Row>
            <Info>
              <Label>HP</Label>
              <Value>{pokemon.stats[0].base_stat}</Value>
            </Info>
            <Info>
              <Label>Attack</Label>
              <Value>{pokemon.stats[1].base_stat}</Value>
            </Info>
            <Info>
              <Label>Defence</Label>
              <Value>{pokemon.stats[2].base_stat}</Value>
            </Info>
          </Row>
          <Row>
            <Info>
              <Label>Speed</Label>
              <Value>{pokemon.stats[5].base_stat}</Value>
            </Info>
            <Info>
              <Label>S.Attack</Label>
              <Value>{pokemon.stats[3].base_stat}</Value>
            </Info>
            <Info>
              <Label>S.Defence</Label>
              <Value>{pokemon.stats[4].base_stat}</Value>
            </Info>
          </Row>
        </Resume>
      </Header>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  background-color: #21064d;
  height: 100%;
`;
const Header = styled.View`
  height: 180px;
  width: 100%;
`;
const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;
const BtnBack = styled.TouchableOpacity`
  align-self: flex-end;
  width: 40px;
  height: 40px;
  background: #c93bd6;
  border-radius: 75px;
  top: 50px;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 10px;
`;
const BtnBackTxt = styled.Text`
  color: #f6f6f6;
  font-size: 20px;
  font-weight: bold;
`;
const HeaderRow = styled.View`
  flex-direction: row;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  margin: 120px 0 30px 0;
`;

const AvatarContainer = styled.View`
  align-self: center;
  width: 90px;
  height: 90px;
  background: #4b238d;
  border-radius: 75px;
`;

const Avatar = styled.Image`
  height: 100%;
  width: 100%;
`;

const InfoContainer = styled.View`
  flex: 1;
  padding-left: 15px;
  justify-content: center;
`;
const Title = styled.Text`
  color: #f0e7fd;
  font-weight: bold;
  font-size: 24px;
  text-transform: capitalize;
`;
const Number = styled.Text`
  color: #f0e7fd;
  font-weight: bold;
  font-size: 18px;
`;
const TypesRow = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const TypeContainer = styled.View`
  padding: 5px 25px;
  align-items: center;
  justify-content: center;
  background: #4b238d;
  border-radius: 6px;
  margin: 0 15px 0 0;
`;
const TypeName = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-transform: capitalize;
`;
const Resume = styled.View`
  background: #150330;
  margin-top: 30px;
  padding: 20px 0;
  border-radius: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
const Info = styled.View`
  padding: 5px 25px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Label = styled.Text`
  color: #84e3eb;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;
const Value = styled.Text`
  color: #c93bd6;
  font-weight: 100;
  font-size: 42px;
  margin-top: 4px;
  text-align: center;
`;
const AboutContainer = styled.View`
  padding: 15px 15px;
  align-items: center;
  justify-content: center;
  background: #150330;
  border-radius: 8px;
  align-self: center;
  width: 95%;
`;
const About = styled.Text`
  color: #f0e7fd;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  letter-spacing: 1px;
  text-align: center;
`;
