import React, { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';

import api from '../../services/api';

export default function ChampionshipStages(props) {
  const { navigation, route } = props;

  const { championshipId, championshipName } = route.params;

  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [championshipInitialized, setChampionshipInitialized] = useState(true);

  useEffect(() => {
    api
      .get(`${championshipId}`)
      .then((response) => {
        setStages(response.data.fases);
        if (stages && stages.length == 0) {
          setChampionshipInitialized(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleStage(id, stageName) {
    navigation.navigate('Games', {
      championshipId: championshipId,
      stageId: id,
      stageName: stageName,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{championshipName}</Text>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0D98BA' animating />
        </View>
      ) : championshipInitialized ? (
        <Text style={styles.aviso}>Campeonato não iniciado!</Text>
      ) : (
        stages.map((stage) => (
          <TouchableOpacity
            key={stage.fase_id}
            style={styles.button}
            onPress={() => handleStage(stage.fase_id, stage.nome)}
          >
            <Text>{stage.nome}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}
