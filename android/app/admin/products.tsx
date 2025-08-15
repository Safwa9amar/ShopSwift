import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { products } from '@/lib/products';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

export default function AdminProductsScreen() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [productList, setProductList] = useState(products);

  // Check if user is admin
  if (!user || !isAdmin()) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.unauthorized}>
          <IconSymbol name="lock.shield" size={80} color="#FF3B30" />
          <ThemedText style={styles.unauthorizedTitle}>Access Denied</ThemedText>
          <ThemedText style={styles.unauthorizedText}>
            You don't have permission to access this page
          </ThemedText>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="primary"
            size="large"
          />
        </View>
      </ThemedView>
    );
  }

  const handleAddProduct = () => {
    router.push('/admin/add-product' as any);
  };

  const handleEditProduct = (productId: string) => {
    Alert.alert('Edit Product', 'Edit functionality coming soon!');
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setProductList(prev => prev.filter(p => p.id !== productId));
            Alert.alert('Success', 'Product deleted successfully!');
          },
        },
      ]
    );
  };

  const handleToggleStock = (productId: string) => {
    setProductList(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, inStock: !p.inStock } : p
      )
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Button
          title=""
          onPress={handleBack}
          variant="outline"
          size="small"
          style={styles.backButton}
        >
          <IconSymbol name="chevron.left" size={20} color="#007AFF" />
        </Button>
        <ThemedText type="title" style={styles.headerTitle}>Manage Products</ThemedText>
        <Button
          title="Add New"
          onPress={handleAddProduct}
          variant="primary"
          size="small"
          style={styles.addButton}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>{productList.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Total Products</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {productList.filter(p => p.inStock).length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>In Stock</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {productList.filter(p => !p.inStock).length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Out of Stock</ThemedText>
            </View>
          </View>
        </Card>

        {productList.map((product) => (
          <Card key={product.id} style={styles.productCard}>
            <View style={styles.productHeader}>
              <View style={styles.productInfo}>
                <ThemedText style={styles.productName} numberOfLines={2}>
                  {product.name}
                </ThemedText>
                <ThemedText style={styles.productCategory}>{product.category}</ThemedText>
                <ThemedText style={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </ThemedText>
              </View>
              <View style={styles.productStatus}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: product.inStock ? '#34C759' : '#FF3B30' }
                ]}>
                  <ThemedText style={styles.statusText}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </ThemedText>
                </View>
              </View>
            </View>

            <ThemedText style={styles.productDescription} numberOfLines={3}>
              {product.description}
            </ThemedText>

            <View style={styles.productActions}>
              <Button
                title="Edit"
                onPress={() => handleEditProduct(product.id)}
                variant="outline"
                size="small"
                style={styles.actionButton}
              />
              <Button
                title={product.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                onPress={() => handleToggleStock(product.id)}
                variant="secondary"
                size="small"
                style={styles.actionButton}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteProduct(product.id)}
                variant="secondary"
                size="small"
                style={[styles.actionButton, styles.deleteButton]}
              />
            </View>
          </Card>
        ))}

        {productList.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="bag" size={80} color="#8E8E93" />
            <ThemedText style={styles.emptyStateTitle}>No Products</ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Start by adding your first product
            </ThemedText>
            <Button
              title="Add Product"
              onPress={handleAddProduct}
              variant="primary"
              size="large"
              style={styles.emptyStateButton}
            />
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 0,
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
  },
  addButton: {
    minWidth: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsCard: {
    marginTop: 20,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  productCard: {
    marginBottom: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 22,
  },
  productCategory: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  productStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  productDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  emptyStateButton: {
    minWidth: 200,
  },
  unauthorized: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  unauthorizedTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    color: '#FF3B30',
  },
  unauthorizedText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
}); 