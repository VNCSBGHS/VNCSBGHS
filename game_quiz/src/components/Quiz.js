import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import Pergunta from './Pergunta';
import perguntas from '../assets/perguntas';

const Quiz = () => {
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [verificouResposta, setVerificouResposta] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState('');

  const avancarPergunta = () => {
    setIndicePergunta(indicePergunta + 1);
    setRespostaSelecionada(null);
    setVerificouResposta(false);
    setRespostaCorreta('');
  };

  const selecionarResposta = (resposta) => {
    if (!verificouResposta) {
      setRespostaSelecionada(resposta);
    }
  };

  const verificarResposta = () => {
    setVerificouResposta(true);
    const respostaCorretaAtual = perguntas[indicePergunta].resposta;
    if (respostaSelecionada === respostaCorretaAtual) {
      setRespostaCorreta('Correta! Parabéns!');
    } else {
      setRespostaCorreta('Incorreta. Siga para próxima pergunta.');
    }
  };

  return (
    <View>
      <Pergunta pergunta={perguntas[indicePergunta].pergunta} />
      {perguntas[indicePergunta].opcoes.map((opcao, index) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.botao,
            backgroundColor:
              respostaSelecionada === opcao
                ? respostaCorreta
                  ? respostaSelecionada === perguntas[indicePergunta].resposta
                    ? '#8bc34a' // Cor verde para resposta correta
                    : '#f44336' // Cor vermelha para resposta incorreta
                  : '#e0e0e0' // Cor padrão quando não foi selecionada
                : '#e0e0e0', // Cor padrão quando não foi selecionada
          }}
          onPress={() => selecionarResposta(opcao)}
          disabled={verificouResposta}
        >
          <Text>{opcao}</Text>
        </TouchableOpacity>
      ))}
      {verificouResposta && (
        <Text style={{ color: respostaCorreta.includes('Correta') ? '#8bc34a' : '#f44336', marginVertical: 10 }}>
          {respostaCorreta}
        </Text>
      )}
      <Button title="Verificar Resposta" onPress={verificarResposta} disabled={!respostaSelecionada || verificouResposta} />
      <Button title="Próxima Pergunta" onPress={avancarPergunta} disabled={!verificouResposta} />
    </View>
  );
};

const styles = StyleSheet.create({
  botao: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Quiz;
