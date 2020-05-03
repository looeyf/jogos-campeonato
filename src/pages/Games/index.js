import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import styles from './styles';

import api from '../../services/api';

export default function Games(props) {
  const { route, navigation } = props;

  const { stageId, championshipId, stageName } = route.params;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: `Jogos - ${stageName}` });
    api
      .get(`${championshipId}/fases/${stageId}`)
      .then((response) => {
        let keys = response.data.chaves;

        let newGames = [];
        for (let key in keys) {
          for (let game in keys[key]) {
            for (let dataObj in keys[key][game]) {
              let data = {
                chave: key.split('-').pop(),
                jogo: game,
                partida_id: keys[key][game][dataObj].partida_id,
                placar: keys[key][game][dataObj].placar,
                status: keys[key][game][dataObj].status,
              };
              newGames.push(data);
            }
          }
        }

        setGames(newGames);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0D98BA' animating />
        </View>
      ) : (
        <FlatList
          data={games}
          renderItem={({ item }) => (
            <View style={styles.gameContainer}>
              <Text>
                Chave: {item.chave} - Jogo de {item.jogo}
              </Text>
              <Text>Jogo: {item.placar}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
          keyExtractor={(item) => `${item.partida_id}`}
        />
      )}
    </View>
  );
}
