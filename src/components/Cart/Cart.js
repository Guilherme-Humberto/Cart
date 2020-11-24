import React, { useCallback } from 'react';

import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import Fetcher from '../../hooks/Fetcher';
import api from '../../services/api';

const Cart = ({ close }) => {
  // Filtrando apenas os produtos com selecionado igual a true
  const { data, mutate } = Fetcher("produtos?selecionado=true")

  // Função que remove os items do carrinho
  // Ao mudar o selecionado para false ele não é mais listado no carrinho
  const handleRemoveCart = useCallback((id) => {
    api.patch(`/produtos/${id}`, { qtd: 0, selecionado: false })

    const teste = data?.map((item) => {
      if (item.id === id) {
        return { ...item }
      }

      return item
    })

    mutate(teste, true)
  }, [data, mutate])


  if(!data) return (
    <Text>Carregando...</Text>
  )

  return (
    <View style={ styles.container }>
      <Button title="fechar" onPress={close}/>
      <Text style={ styles.title }>Cart</Text>
      <Text style={styles.precoText}>
        Total a pagar: R$
        {data.reduce((sum, value) => sum + value.preco, 0).toFixed(2)}
      </Text>
      <Button title="Fechar pedido"/>

      <FlatList 
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerList}>
            <Image style={styles.img} source={{ uri: item.img }}/>
            <Text style={styles.nameProduct}>{item.nome}</Text>
            <Text style={styles.textqtd}>Quantidade: {item.qtd}</Text>
            <Button color="red" title="Remover" onPress={() => handleRemoveCart(item.id)}/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  precoText: {
    fontSize: 25,
    fontWeight: "bold"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  img: {
    width: 100,
    height: 100,
  },
  containerList: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  nameProduct: {
    fontSize: 20
  },
  textqtd: {
    fontSize: 16,
    fontWeight: "500"
  }
});

export default Cart;
