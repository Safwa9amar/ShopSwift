import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { categories, products } from '@/lib/products';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.filter(p => p.category === 'Electronics').slice(0, 3);
  const { width: screenWidth } = Dimensions.get('window');

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleViewAllProducts = () => {
    router.push('/(tabs)/products');
  };

  const handleCategoryPress = (category: string) => {
    router.push('/(tabs)/products');
  };

  const quickActions = [
    { title: 'New Arrivals', icon: '🆕', action: () => router.push('/(tabs)/products'), color: '#FF6B6B' },
    { title: 'On Sale', icon: '💰', action: () => router.push('/(tabs)/products'), color: '#4ECDC4' },
    { title: 'Best Sellers', icon: '⭐', action: () => router.push('/(tabs)/products'), color: '#45B7D1' },
    { title: 'Support', icon: '💬', action: () => console.log('Support'), color: '#96CEB4' },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      comment: 'Amazing products and fast delivery! Highly recommend.',
      avatar: '👩‍💼',
      role: 'Verified Buyer'
    },
    {
      name: 'Mike R.',
      rating: 5,
      comment: 'Great quality items at reasonable prices.',
      avatar: '👨‍💻',
      role: 'Verified Buyer'
    },
    {
      name: 'Emma L.',
      rating: 4,
      comment: 'Love the variety and customer service!',
      avatar: '👩‍🎨',
      role: 'Verified Buyer'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Header Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Image
              source={require('@/assets/images/bgLogo.jpg')}
              style={styles.heroLogo}
            />
            <View style={styles.heroText}>
              <ThemedText style={styles.heroTitle}>Welcome to ShopSwift!</ThemedText>
              {user ? (
                <ThemedText style={styles.heroSubtitle}>
                  Hello, {user.email}! Ready to discover amazing products?
                </ThemedText>
              ) : (
                <ThemedText style={styles.heroSubtitle}>
                  Discover amazing products at unbeatable prices
                </ThemedText>
              )}
             
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          {/* <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText> */}
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionItem}
                onPress={action.action}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                </View>
                <ThemedText style={styles.quickActionTitle}>{action.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Offers Banner */}
        <View style={styles.bannerSection}>
          <Card style={styles.bannerCard}>
            <LinearGradient
              colors={['#FF9A9E', '#FECFEF']}
              style={styles.bannerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.bannerContent}>
                <View style={styles.bannerText}>
                  <Text style={styles.bannerIcon}>🎉</Text>
                  <ThemedText style={styles.bannerTitle}>Special Offer!</ThemedText>
                  <ThemedText style={styles.bannerSubtitle}>
                    Get 20% off on Electronics this week
                  </ThemedText>
                </View>
                <TouchableOpacity style={styles.bannerButton} onPress={handleViewAllProducts}>
                  <ThemedText style={styles.bannerButtonText}>Shop Now</ThemedText>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Card>
        </View>


        {/* Categories Showcase */}
        <View style={styles.categoriesSection}>
          <ThemedText style={styles.sectionTitle}>Shop by Category</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.filter(cat => cat !== 'All').map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
              >
                <LinearGradient
                  colors={['#a8edea', '#fed6e3']}
                  style={styles.categoryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.categoryIcon}>
                    {category === 'Electronics' && '📱'}
                    {category === 'Clothing' && '👕'}
                    {category === 'Home & Garden' && '🏠'}
                    {category === 'Accessories' && '👜'}
                    {category === 'Sports' && '⚽'}
                  </View>
                  <ThemedText style={styles.categoryName}>{category}</ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Featured Products</ThemedText>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllProducts}>
              <ThemedText style={styles.viewAllText}>View All</ThemedText>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featuredGrid}>
            {featuredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.featuredItem}
                onPress={() => handleProductPress(product.id)}
              >
                <Card style={styles.productCard}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{ uri: product.imageUrl }}
                      style={styles.productImage}
                      contentFit="cover"
                    />
                    <View style={styles.productOverlay}>
                      <View style={styles.productBadge}>
                        <Text style={styles.productBadgeText}>Featured</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.productInfo}>
                    <ThemedText style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </ThemedText>
                    <ThemedText style={styles.productPrice}>
                      ${product.price.toFixed(2)}
                    </ThemedText>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Products */}
        <View style={styles.trendingSection}>
          <ThemedText style={styles.sectionTitle}>Trending Now</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
            {trendingProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.trendingItem}
                onPress={() => handleProductPress(product.id)}
              >
                <Card style={styles.trendingCard}>
                  <View style={styles.trendingImageContainer}>
                    <Image
                      source={{ uri: product.imageUrl }}
                      style={styles.trendingImage}
                      contentFit="cover"
                    />
                    <View style={styles.trendingOverlay}>
                      <View style={styles.trendingBadge}>
                        <Text style={styles.trendingBadgeText}>🔥 Hot</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.trendingInfo}>
                    <ThemedText style={styles.trendingName} numberOfLines={1}>
                      {product.name}
                    </ThemedText>
                    <ThemedText style={styles.trendingPrice}>
                      ${product.price.toFixed(2)}
                    </ThemedText>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Customer Reviews */}
        <View style={styles.reviewsSection}>
          <ThemedText style={styles.sectionTitle}>What Our Customers Say</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewsScroll}>
            {testimonials.map((testimonial, index) => (
              <Card key={index} style={styles.reviewCard}>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  style={styles.reviewGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.reviewAvatarText}>{testimonial.avatar}</Text>
                    </View>
                    <View style={styles.reviewInfo}>
                      <ThemedText style={styles.reviewName}>{testimonial.name}</ThemedText>
                      <ThemedText style={styles.reviewRole}>{testimonial.role}</ThemedText>
                      <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, i) => (
                          <Text key={i} style={styles.star}>
                            {i < testimonial.rating ? '⭐' : '☆'}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <ThemedText style={styles.reviewComment}>{testimonial.comment}</ThemedText>
                </LinearGradient>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Newsletter Signup */}
        <View style={styles.newsletterSection}>
          <Card style={styles.newsletterCard}>
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              style={styles.newsletterGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.newsletterTitle}>
                Stay Updated! 📧
              </ThemedText>
              <ThemedText style={styles.newsletterText}>
                Get the latest deals and new product notifications
              </ThemedText>
              <View style={styles.newsletterInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#8E8E93"
                />
                <TouchableOpacity style={styles.subscribeButton} onPress={() => console.log('Subscribe')}>
                  <ThemedText style={styles.subscribeButtonText}>Subscribe</ThemedText>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Card>
        </View>

        {/* Final CTA */}
        <View style={styles.ctaSection}>
          <Card style={styles.ctaCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.ctaTitle}>
                Ready to Start Shopping? 🛍️
              </ThemedText>
              <ThemedText style={styles.ctaText}>
                Browse our extensive collection of high-quality products
              </ThemedText>
              <TouchableOpacity style={styles.ctaButton} onPress={handleViewAllProducts}>
                <ThemedText style={styles.ctaButtonText}>Explore Products</ThemedText>
              </TouchableOpacity>
            </LinearGradient>
          </Card>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heroLogo: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  heroText: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  bannerCard: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerGradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bannerText: {
    marginBottom: 10,
  },
  bannerIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  bannerButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionItem: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionEmoji: {
    fontSize: 30,
  },
  quickActionTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoriesScroll: {
    paddingVertical: 10,
  },
  categoryCard: {
    width: 140,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  categoryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  featuredSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  viewAllArrow: {
    fontSize: 18,
    marginLeft: 5,
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredItem: {
    width: '48%',
    marginBottom: 16,
  },
  productCard: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productBadge: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  productBadgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  trendingSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  trendingScroll: {
    paddingVertical: 10,
  },
  trendingItem: {
    width: 220,
    marginRight: 15,
  },
  trendingCard: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingImageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingBadge: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  trendingBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  trendingInfo: {
    padding: 12,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  reviewsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  reviewsScroll: {
    paddingVertical: 10,
  },
  reviewCard: {
    width: 320,
    marginRight: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewGradient: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    fontSize: 24,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  reviewRole: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 18,
    color: '#FFD700',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  newsletterSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  newsletterCard: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsletterGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  newsletterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  newsletterText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.9,
  },
  newsletterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  ctaCard: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.9,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  ctaButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
}); 