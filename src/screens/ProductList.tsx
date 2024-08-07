// src/screens/ProductList.tsx
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { CartContext } from "../contexts/CartContext"; // ajuste o caminho conforme necessário
import { ProductDTO } from "../types/Product";


const ProductList = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);

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

  const handleAddToCart = (item: ProductDTO) => {
    if (cartContext) {
      cartContext.addProduct(item);
    }
  };

  const renderItem = ({ item }: { item: ProductDTO }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Adicionar no Carrinho</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductList;
