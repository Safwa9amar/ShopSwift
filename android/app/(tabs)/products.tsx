import { ProductCard } from '@/components/ProductCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { categories, products } from '@/lib/products';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProductsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Responsive values
  const isSmallScreen = screenWidth < 375;
  const isLargeScreen = screenWidth > 768;
  const horizontalPadding = isSmallScreen ? 16 : isLargeScreen ? 24 : 20;
  const searchInputHeight = isSmallScreen ? 44 : 48;

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}` as any);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { 
        paddingTop: insets.top + 20,
        paddingHorizontal: horizontalPadding 
      }]}>
        <ThemedText type="title">Products</ThemedText>
        <TextInput
          style={[styles.searchInput, { 
            height: searchInputHeight,
            fontSize: isSmallScreen ? 15 : 16 
          }]}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8E8E93"
        />
      </View>

      <View style={styles.categoriesWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item: category }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          )}
          style={styles.categoriesContainer}
          contentContainerStyle={[styles.categoriesContent, { paddingHorizontal: horizontalPadding }]}
        />
      </View>

      <ScrollView 
        style={styles.productsContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.productsContent, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product.id)}
            />
          ))}
        </View>
        
        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateText}>
              No products found matching your criteria
            </ThemedText>
            <Button
              title="Clear Filters"
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              variant="outline"
              size="medium"
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
    
  },
  header: {
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  searchInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    color: '#000000',
  },
  categoriesWrapper: {
    height: 60,
    backgroundColor: 'transparent',
  },
  categoriesContainer: {
    backgroundColor: 'transparent',
  },
  categoriesContent: {
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  productsContainer: {
    flex: 1,
  },
  productsContent: {
    paddingBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 20,
  },
}); 