import React, { useState, useEffect } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

import api from '../../services/api';

export default function Homepage(props) {
  const { navigation } = props;

  const [championships, setChampionships] = useState([]);

  useEffect(() => {
    api
      .get('')
      .then((response) => {
        setChampionships(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChampionship(id, championshipName) {
    navigation.navigate('ChampionshipStages', {
      championshipId: id,
      championshipName: championshipName,
    });
  }

  return (
    <View style={styles.container}>
      {championships.map((championship) => (
        <TouchableOpacity
          key={championship.campeonato_id}
          style={styles.button}
          onPress={() =>
            handleChampionship(
              championship.campeonato_id,
              championship.edicao_atual.nome_popular
            )
          }
        >
          <Text>{championship.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
