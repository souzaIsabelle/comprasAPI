import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";
import { useCartContext } from "../contexts/CartContext";

const OrderStatus = () => {
  const { cart } = useCartContext();

  // Exemplo de tempo estimado de entrega. Em um aplicativo real, isso seria dinâmico.
  const estimatedDeliveryTime = "30-45 minutos";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Status do Pedido</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.product.title}</Text>
            <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
            <Text style={styles.itemPrice}>
              Preço: R$ {(item.quantity * item.product.price).toFixed(2)}
            </Text>
          </View>
        )}
      />
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryText}>Tempo estimado de entrega:</Text>
        <Text style={styles.deliveryTime}>{estimatedDeliveryTime}</Text>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EAEAEA",
    marginBottom: 20,
    alignSelf: "center",
  },
  itemContainer: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EAEAEA",
  },
  itemQuantity: {
    fontSize: 16,
    color: "#B0B0B0",
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#B0B0B0",
    marginTop: 5,
  },
  deliveryContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  deliveryText: {
    fontSize: 16,
    color: "#EAEAEA",
  },
  deliveryTime: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginTop: 5,
  },
});
