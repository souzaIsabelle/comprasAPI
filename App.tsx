import React from 'react';
import { CartProvider } from './src/contexts/CartContext'; 
import Routes from './src/routes';
import { UserProvider } from './src/contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
    <CartProvider>
      <Routes />
    </CartProvider>
    </UserProvider>
  );
};

export default App;
