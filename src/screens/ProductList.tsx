import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";  // ajuste o caminho conforme necessário
import { ProductDTO } from "../types/Product";
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);
  const navigation = useNavigation<any>()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/category/electronics");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = (item: ProductDTO ) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
      <Button
        title="Add to Cart"
        onPress={() => cartContext?.addToCart(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2c2c2c",  // Tela de fundo meio escura
  },
  card: {
    backgroundColor: "#3c3c3c",  // Itens da lista com fundo um pouco mais claro que o fundo
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,  // Botões mais arredondados
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"  // Texto branco para melhor contraste com o fundo escuro
  },
  price: {
    fontSize: 16,
    color: "#ccc",  // Texto de preço com cor clara para contraste
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#aaa",  // Texto de descrição com cor clara para contraste
  },
  itemButton: {
    backgroundColor: "#444",  // Botão com fundo escuro
    padding: 10,
    borderRadius: 16,  // Botões mais arredondados
    alignItems: "center",
    marginTop: 10,
  },
  itemButtonText: {
    color: "#fff",  // Texto do botão com cor clara
    fontWeight: "bold",
  },
});

