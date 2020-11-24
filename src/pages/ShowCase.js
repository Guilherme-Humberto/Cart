import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity } from "react-native";
import Modal from "../components/Modals/Modal";
import Cart from "../components/Cart/Cart";

import Fetcher from "../hooks/Fetcher";

const ShowCase = () => {
  const [modal, setModal] = useState(false)
  const [cart, setCart] = useState(false)
  const [produto, setProduto] = useState(null)

  // Pegando informações do servidor
  // As informações vem no data
  const { data: cartList } = Fetcher("/produtos?selecionado=true");
  const { data: salgados } = Fetcher("/produtos?tipo=Salgado");
  const { data: frutas } = Fetcher("/produtos?tipo=Fruta");
  const { data: bebida } = Fetcher("/produtos?tipo=Bebida");

  // Pegando o id do produro para armazenar em produto
  // Abrindo modal
  function handleOpenModal(id) {
    setProduto(id)
    setModal(true)
  }

  // Se as informações foram vazias retorna um texto
  if (!cartList || !salgados || !frutas || !bebida) return (
    <Text>Carregando...</Text>
  );

  return (
    <View style={styles.container}>

      <View style={styles.containerTop}>
        <Text style={styles.textTop}>Quantidade de itens no carrinho</Text>
          <TouchableOpacity style={styles.buttonCart} onPress={() => setCart(true)}>
            <Text style={styles.qtdText}>{cartList.length}</Text>
          </TouchableOpacity>
      </View>

      {/* Lista de Salgados */}
      <Text style={styles.title}>Salgados</Text>
      <FlatList
        data={salgados}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerProduct}>
            <Image style={styles.img} source={{ uri: item.img }} />
            <Text style={styles.nameProduct}>{item.nome}</Text>
            <Button title="Comprar" onPress={() => handleOpenModal(item.id)}/>
          </View>
        )}
      />

      {/* Lista de Frutas */}
      <Text style={styles.title}>Frutas</Text>
      <FlatList
        data={frutas}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerProduct}>
            <Image style={styles.img} source={{ uri: item.img }} />
            <Text style={styles.nameProduct}>{item.nome}</Text>
            <Button title="Comprar" onPress={() => handleOpenModal(item.id)}/>
          </View>
        )}
      />

      {/* Lista de Bebidas */}
      <Text style={styles.title}>Bebidas</Text>
      <FlatList
        data={bebida}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerProduct}>
            <Image style={styles.img} source={{ uri: item.img }} />
            <Text style={styles.nameProduct}>{item.nome}</Text>
            <Button title="Comprar" onPress={() => handleOpenModal(item.id)}/>
          </View>
        )}
      />

      {/* // Modal do produto escolhido */}
      {modal && (
        <Modal 
          produto={produto}
          close={() => setModal(false)}
        />
      )}

      {/* // Modal do carrinho */}
      {cart && (
        <Cart 
          close={() => setCart(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  buttonCart: {
    borderRadius: "100%",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  },
  textTop: {
    fontSize: 20,
    marginHorizontal: 20
  },
  qtdText: {
    fontSize: 20,
    color: "#eee",
    fontWeight: "bold"
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 22,
    color: "#000",
  },
  containerProduct: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10
  },
  nameProduct: {
    fontSize: 20,
    color: "#000",
    marginVertical: 10,
  },
  img: {
    width: 100,
    height: 100,
  },
});

export default ShowCase;
