import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/lib/products';
import { Image } from 'expo-image';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation()
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.notFound}>
          <ThemedText style={styles.notFoundText}>Product not found</ThemedText>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="primary"
            size="medium"
          />
        </View>
      </ThemedView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push('/(tabs)/cart' as any);
  };

  const handleBack = () => {
    router.back();
  };


  useEffect(()=>{
    navigation.setOptions({
      headerTitle : product.name
    })
  },[])

  return (
    <ThemedView style={styles.container}>
     

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.productImage}
            contentFit="cover"
          />
          {!product.inStock && (
            <View style={styles.outOfStockBadge}>
              <ThemedText style={styles.outOfStockText}>Out of Stock</ThemedText>
            </View>
          )}
        </View>

        <View style={styles.productInfo}>
          <ThemedText style={styles.productName}>{product.name}</ThemedText>
          <ThemedText style={styles.productPrice}>${product.price.toFixed(2)}</ThemedText>
          <ThemedText style={styles.productCategory}>{product.category}</ThemedText>
          
          <Card style={styles.descriptionCard}>
            <ThemedText style={styles.descriptionTitle}>Description</ThemedText>
            <ThemedText style={styles.descriptionText}>{product.description}</ThemedText>
          </Card>

          <Card style={styles.quantityCard}>
            <ThemedText style={styles.quantityTitle}>Quantity</ThemedText>
            <View style={styles.quantitySelector}>
              <Button
                title="-"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                variant="outline"
                size="small"
                style={styles.quantityButton}
              />
              <ThemedText style={styles.quantityText}>{quantity}</ThemedText>
              <Button
                title="+"
                onPress={() => setQuantity(quantity + 1)}
                variant="outline"
                size="small"
                style={styles.quantityButton}
              />
            </View>
          </Card>

          <Button
            title={product.inStock ? "Add to Cart" : "Out of Stock"}
            onPress={handleAddToCart}
            variant="primary"
            size="large"
            disabled={!product.inStock}
            style={styles.addToCartButton}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 0,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: width * 0.8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 30,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
  },
  descriptionCard: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  quantityCard: {
    marginBottom: 24,
  },
  quantityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 24,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    marginBottom: 40,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  notFoundText: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 20,
    textAlign: 'center',
  },
}); 