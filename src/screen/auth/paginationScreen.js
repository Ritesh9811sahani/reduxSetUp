import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const API_URL = 'https://jsonplaceholder.typicode.com/photos'; // Dummy API (5000 photos)

const paginationScreen = () => {
  const [photos, setPhotos] = useState([]); // Store photos
  const [page, setPage] = useState(1); // Pagination
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  // ✅ Fetch Photos with Pagination
  const fetchPhotos = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}?_limit=50&_page=${page}`); // 50 Photos Per Page
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]); // Append new photos
      setPage(page + 1);
    } catch (err) {
      setError('Error fetching photos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load More Photos on Scroll
  const handleLoadMore = () => {
    if (!loading) fetchPhotos();
  };

  // ✅ Render Each Photo
  const renderItem = useCallback(({ item }) => (
    <View style={styles.photoContainer}>
      <FastImage source={{ uri: item.url }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📸 Photo Gallery</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore} // Load more on scroll end
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
        numColumns={3} // 3 Photos per row
      />
    </View>
  );
};

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  photoContainer: { flex: 1, margin: 5, alignItems: 'center' },
  image: { width: 100, height: 100, borderRadius: 10 },
  title: { fontSize: 12, textAlign: 'center', marginTop: 5 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default paginationScreen;
