import React, { useState, useEffect } from 'react';

import { View, Text, FlatList } from 'react-native';

import styles from './styles';

import api from '../../services/api';

export default function Games(props) {
  const { route } = props;

  const { stageId, championshipId } = route.params;

  const [games, setGames] = useState([]);

  useEffect(() => {
    api
      .get(`${championshipId}/fases/${stageId}`)
      .then((response) => {
        let keys = response.data.chaves;

        let newGames = [];
        for (let key in keys) {
          // chave_01
          for (let game in keys[key]) {
            for (let dataObj in keys[key][game]) {
              newGames.push(keys[key][game][dataObj]);
            }
          }
        }

        setGames(newGames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={({ item }) => (
          <View style={styles.gameContainer}>
            <Text>Jogo: {item.placar}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        keyExtractor={(item) => `${item.partida_id}`}
      />
    </View>
  );
}
