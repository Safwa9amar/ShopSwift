import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

export default function AddProductScreen() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';

    // Validate price
    if (formData.price.trim() && isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const enhanceDescriptionWithAI = async () => {
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description first to enhance it with AI.');
      return;
    }

    setIsEnhancing(true);

    try {
      // Simulate AI API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would call the AI API
      const enhancedDescription = `Enhanced with AI: ${formData.description}\n\nThis product offers exceptional quality and value. Our AI analysis suggests highlighting the following benefits:\n\n• Premium materials and craftsmanship\n• Innovative design features\n• Excellent customer satisfaction ratings\n• Competitive pricing in the market\n• Reliable performance and durability`;
      
      setFormData(prev => ({ ...prev, description: enhancedDescription }));
      
      Alert.alert(
        'AI Enhancement Complete',
        'Your product description has been enhanced with AI-powered insights!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to enhance description. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSaveProduct = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Product added successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 1000);
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
        <ThemedText type="title" style={styles.headerTitle}>Add New Product</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.formCard}>
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            error={errors.name}
          />

          <View style={styles.descriptionSection}>
            <View style={styles.descriptionHeader}>
              <ThemedText style={styles.descriptionLabel}>Description</ThemedText>
              <Button
                title={isEnhancing ? "Enhancing..." : "Enhance with AI"}
                onPress={enhanceDescriptionWithAI}
                variant="outline"
                size="small"
                loading={isEnhancing}
                style={styles.aiButton}
              />
            </View>
            <Input
              placeholder="Enter product description"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={6}
              error={errors.description}
            />
            <ThemedText style={styles.aiHint}>
              💡 Use the "Enhance with AI" button to get AI-powered suggestions for your description
            </ThemedText>
          </View>

          <Input
            label="Price"
            placeholder="Enter price (e.g., 29.99)"
            value={formData.price}
            onChangeText={(value) => handleInputChange('price', value)}
            keyboardType="numeric"
            error={errors.price}
          />

          <Input
            label="Category"
            placeholder="Enter product category"
            value={formData.category}
            onChangeText={(value) => handleInputChange('category', value)}
            error={errors.category}
          />

          <Input
            label="Image URL"
            placeholder="Enter product image URL"
            value={formData.imageUrl}
            onChangeText={(value) => handleInputChange('imageUrl', value)}
            error={errors.imageUrl}
          />
        </Card>

        <View style={styles.actions}>
          <Button
            title="Cancel"
            onPress={handleBack}
            variant="outline"
            size="large"
            style={styles.cancelButton}
          />
          <Button
            title="Save Product"
            onPress={handleSaveProduct}
            loading={isLoading}
            style={styles.saveButton}
          />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formCard: {
    marginTop: 20,
    marginBottom: 24,
  },
  descriptionSection: {
    marginBottom: 16,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  aiButton: {
    minWidth: 120,
  },
  aiHint: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 8,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    marginRight: 12,
  },
  saveButton: {
    flex: 1,
    marginLeft: 12,
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