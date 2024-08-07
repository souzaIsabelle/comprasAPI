import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartContext } from '../contexts/CartContext';
import { ICartItem } from '../types/Product';

const Cart = () => {
  const { getCart, cart, removeProduct } = useCartContext();
  const navigation = useNavigation<any>();

  useEffect(() => {
    getCart();
  }, []);

  const handleRemove = (id: number) => {
    removeProduct(id);
  };

  const handleBuy = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos ao carrinho antes de prosseguir para a compra.');
      return;
    }
    navigation.navigate('Payment');
  };

  const renderItem = ({ item }: { item: ICartItem }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.product.title}</Text>
        <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
        <Text style={styles.total}>Total: ${(item.quantity * item.product.price).toFixed(2)}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.product.id)}>
          <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Carrinho</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginBottom: 20,
    alignSelf: 'center',
  },
  list: {
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BFAE',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
