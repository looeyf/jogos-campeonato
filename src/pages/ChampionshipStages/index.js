import React, { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import api from '../../services/api';

export default function ChampionshipStages(props) {
  const { navigation, route } = props;

  const { championshipId, championshipName } = route.params;

  const [stages, setStages] = useState([]);

  useEffect(() => {
    api
      .get(`${championshipId}`)
      .then((response) => {
        setStages(response.data.fases);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleStage(id) {
    navigation.navigate('Games', {
      championshipId: championshipId,
      stageId: id,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{championshipName}</Text>
      {stages.map((stage) => (
        <TouchableOpacity
          key={stage.fase_id}
          style={styles.button}
          onPress={() => handleStage(stage.fase_id)}
        >
          <Text>{stage.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
