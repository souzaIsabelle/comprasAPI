import "setimmediate";
import { RootSiblingParent } from "react-native-root-siblings";
import Routes from "./src/routes";
import React from "react";
import { UserProvider } from "./src/contexts/UserContext";
import { CartProvider } from "./src/contexts/CartContext";

export default function App() {
  return (
    <RootSiblingParent>
      <UserProvider>
        <CartProvider>
        <Routes />
        </CartProvider>
      </UserProvider>
    </RootSiblingParent>
  );
}
