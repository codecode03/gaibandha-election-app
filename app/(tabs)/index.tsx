import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { MenuButton } from '@/components/ui/menu-button';

export default function HomeScreen() {
  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'constituencies':
        router.push('/constituencies');
        break;
      default:
        console.log(`Navigate to: ${screen}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          
          {/* Title */}
          <Text style={styles.headerTitle}>গাইবান্ধা জেলা</Text>
          <Text style={styles.headerSubtitle}>১৩তম জাতীয় সংসদ নির্বাচন</Text>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>মেনু</Text>
          
          <MenuButton 
            title="আসন সমূহ দেখুন" 
            subtitle="৫টি আসনের তথ্য দেখুন"
            badge="5"
            icon="location"
            color="#059669"
            onPress={() => handleNavigation('constituencies')}
          />
          
          <MenuButton 
            title="গুরুত্বপূর্ণ নম্বর দেখুন" 
            subtitle="জরুরি যোগাযোগ নম্বর"
            icon="call"
            color="#dc2626"
            onPress={() => handleNavigation('important-numbers')}
          />
          
          <MenuButton 
            title="আচরণ বিধি দেখুন" 
            subtitle="নির্বাচনী আচরণ বিধি"
            icon="book"
            color="#7c3aed"
            onPress={() => handleNavigation('code-of-conduct')}
          />
          
          <MenuButton 
            title="মোবাইল কোর্ট আইন দেখুন" 
            subtitle="আইন ও বিধিমালা"
            icon="document-text"
            color="#0891b2"
            onPress={() => handleNavigation('mobile-court-law')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4', // Light green background
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSection: {
    backgroundColor: '#059669', // Emerald green
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 6,
  },
  logo: {
    width: 56,
    height: 56,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
