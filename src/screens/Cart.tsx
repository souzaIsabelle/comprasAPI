import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, Button } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";


const ProductDetails = () => {

  const {getCart, cart} = useContext(CartContext)


  useEffect(() => {
getCart();
  }, []);


  if (!cart) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // Transformar em flatlist e renderizar cart
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button
        title="Add to Cart"
        onPress={() => {/* Implementar a lógica para adicionar ao carrinho aqui */}}
        color="#444"
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2c2c2c",  // Tela de fundo meio escura
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",  // Texto branco para melhor contraste com o fundo escuro
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "#ccc",  // Texto de preço com cor clara para contraste
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#aaa",  // Texto de descrição com cor clara para contraste
    marginBottom: 16,
  },
});
