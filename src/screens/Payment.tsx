import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartContext } from '../contexts/CartContext';
import { showError, showSuccess } from '../components/Toast';

const Payment = () => {
  const { cart } = useCartContext();
  const navigation = useNavigation<any>(); // Adapte conforme o tipo de navegação utilizado
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [cpf, setCpf] = useState('');
  const [cardName, setCardName] = useState('');
  const [pixKey] = useState(Math.floor(Math.random() * 900000000 + 100000000).toString()); // Gera um número aleatório como chave PIX

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2);
  };

  /*
  const showAlert = (mensagem: string) => {
    return (
    Alert.alert('Pagamento', mensagem, [
      { text: 'OK', onPress: () => navigation.navigate('OrderStatus') },
    ])
)
  }
  */

  const handlePayment = () => {
    if (paymentMethod === 'pix') {
        showSuccess(`Utilize a chave PIX: ${pixKey} para realizar o pagamento.`)
        navigation.navigate('OrderStatus')
    } else if (paymentMethod === 'card') {
      if (cardNumber && cpf && cardName) {
        showSuccess('Pagamento com cartão realizado com sucesso!')
        navigation.navigate('OrderStatus')
      } else {
        showError('Por favor, preencha todas as informações do cartão.');
      }
    } else if (paymentMethod === 'cash') {
      showSuccess('Vá até a loja para efetuar o pagamento em dinheiro e retirar o produto.')
      navigation.navigate('OrderStatus')
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Resumo do Pedido</Text>
      {cart.map((item) => (
        <View key={item.product.id} style={styles.item}>
          <Text style={styles.itemText}>
            {item.product.title} x {item.quantity}
          </Text>
          <Text style={styles.itemText}>
            ${(item.quantity * item.product.price).toFixed(2)}
          </Text>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
      </View>

      <View style={styles.paymentMethods}>
        <Text style={styles.paymentMethodHeader}>Escolha o método de pagamento</Text>
        <TouchableOpacity
          style={[styles.paymentMethod, paymentMethod === 'pix' && styles.selectedMethod]}
          onPress={() => setPaymentMethod('pix')}
        >
          <Text style={styles.paymentMethodText}>PIX</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethod, paymentMethod === 'card' && styles.selectedMethod]}
          onPress={() => setPaymentMethod('card')}
        >
          <Text style={styles.paymentMethodText}>Cartão</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethod, paymentMethod === 'cash' && styles.selectedMethod]}
          onPress={() => setPaymentMethod('cash')}
        >
          <Text style={styles.paymentMethodText}>Dinheiro</Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === 'card' && (
        <View style={styles.cardDetails}>
          <TextInput
            style={styles.input}
            placeholder="Número do Cartão"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome no Cartão"
            placeholderTextColor="#ccc"
            value={cardName}
            onChangeText={setCardName}
          />
        </View>
      )}

      {paymentMethod === 'pix' && (
        <View style={styles.pixDetails}>
          <Text style={styles.pixText}>Chave PIX gerada: {pixKey}</Text>
        </View>
      )}

      {paymentMethod === 'cash' && (
        <View style={styles.cashDetails}>
          <Text style={styles.cashText}>Vá até a loja para efetuar o pagamento em dinheiro e retirar o produto.</Text>
        </View>
      )}

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Confirmar Pagamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Payment;

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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  itemText: {
    fontSize: 16,
    color: '#EAEAEA',
  },
  totalContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#444',
    marginTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAEAEA',
    textAlign: 'center',
  },
  paymentMethods: {
    marginTop: 20,
  },
  paymentMethodHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginBottom: 10,
  },
  paymentMethod: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedMethod: {
    borderColor: '#28a745',
    borderWidth: 2,
  },
  paymentMethodText: {
    color: '#EAEAEA',
    fontSize: 16,
  },
  cardDetails: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#EAEAEA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pixDetails: {
    marginTop: 20,
    alignItems: 'center',
  },
  pixText: {
    color: '#EAEAEA',
    fontSize: 16,
  },
  cashDetails: {
    marginTop: 20,
    alignItems: 'center',
  },
  cashText: {
    color: '#EAEAEA',
    fontSize: 16,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
