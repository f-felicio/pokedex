import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import styled from 'styled-components/native';

// ## COMPONENTS ##
import Pokemon from '../components/Pokemon';

// ## SERVICES ##
import api from '../services/api';

export default function Home({navigation}) {
  const [list, setList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTxt]);

  const handleFilter = () => {
    if (searchTxt.length >= 3) {
      let listFiltered = [];
      let search = searchTxt.toLowerCase();
      listFiltered = list.filter((pokemon) => {
        return pokemon.name.toLowerCase().indexOf(search) !== -1;
      });
      setFilterList(listFiltered);
    } else {
      setFilterList(list);
    }
  };

  const getList = async () => {
    await api
      .get('pokedex/2')
      .then((response) => {
        const primaryList = response.data.pokemon_entries;
        const sorted = primaryList.sort((a, b) => {
          return a.id - b.id;
        });
        sorted.map((pokemon) => {
          api.get('pokemon/' + pokemon.entry_number).then((res) => {
            let completePokemon = res.data;
            setList((old) => [...old, completePokemon]);
            setFilterList((old) => [...old, completePokemon]);
          });
        });
        // setList((old) => [...old].sort((a, b) => a.id - b.id));
        // setFilterList((old) => [...old].sort((a, b) => a.id - b.id));
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  return (
    <MainContainer>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderImage
          source={require('../assets/img/header.jpg')}
          resizeMode="cover"
        />
      </Header>

      <PokemonList>
        <SearchContainer>
          <Input
            onChangeText={(text) => setSearchTxt(text)}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor={'#fff'}
            underlineColorAndroid={'transparent'}
            value={searchTxt}
          />
        </SearchContainer>
        <FlatList
          data={filterList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <Pokemon pokemon={item} navigation={navigation} />
          )}
          overScrollMode="never"
        />
      </PokemonList>
    </MainContainer>
  );
}

const MainContainer = styled.SafeAreaView`
  background-color: #2a072c;
  height: 100%;
`;
const Header = styled.View`
  background-color: #2a072c;
  height: 130px;
  width: 100%;
  justify-content: center;
`;

const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const SearchContainer = styled.View`
  width: 100%;
  height: 60px;
  background: #2a072c;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  height: 30px;
  width: 80%;
  align-self: center;
  background: transparent;
  color: #fff;
  font-size: 24px;
  font-weight: 100;
  text-align: center;
`;

const PokemonList = styled.View`
  background-color: #26075e;
  width: 100%;
  height: 100%;
`;
