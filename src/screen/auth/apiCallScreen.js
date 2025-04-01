import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const apiCallScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // Fetch Cart Details
      const cartResponse = await axios.get('https://fakestoreapi.com/carts/2');
      const products = cartResponse.data.products;

      // Parallel API Calls for Product Details
      const productDetails = await Promise.all(
        products.map(async (product) => {
          const productResponse = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
          return { ...productResponse.data, quantity: product.quantity };
        })
      );

      setCartItems(productDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="blue" /> : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>💰 ${item.price.toFixed(2)}</Text>
                <Text style={styles.quantity}>🛒 Quantity: {item.quantity}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginVertical: 5, borderRadius: 10, elevation: 3 },
  image: { width: 80, height: 80, resizeMode: 'contain' },
  details: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green' },
  quantity: { fontSize: 14, color: '#555' },
});

export default apiCallScreen;
