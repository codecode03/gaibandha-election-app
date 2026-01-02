import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COMMITTEE_ITEMS = [
  {
    id: 'vigilance-committee',
    title: 'জেলা পর্যায়ে ভিজিল্যান্স ও অবজারভেশন কমিটি',
    subtitle: 'পর্যবেক্ষণ ও তদারকি কমিটি',
    icon: 'eye',
    color: '#059669',
    bgColor: '#ecfdf5',
  },
  {
    id: 'monitoring-committee',
    title: 'নির্বাচন মনিটরিং কমিটি',
    subtitle: 'নির্বাচন পর্যবেক্ষণ কমিটি',
    icon: 'analytics',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
  },
  {
    id: 'law-order-cell',
    title: 'আইন-শৃঙ্খলা রক্ষাকারী সেল',
    subtitle: 'নিরাপত্তা ও শৃঙ্খলা বিভাগ',
    icon: 'shield',
    color: '#dc2626',
    bgColor: '#fef2f2',
  },
];

export default function CommitteesScreen() {
  const handleNavigation = (id: string) => {
    console.log(`Navigate to: ${id}`);
    // Future: router.push(`/committee/${id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" backgroundColor="#c2410c" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>সংশ্লিষ্ট কমিটিসমূহ</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="people" size={32} color="#c2410c" />
          </View>
          <Text style={styles.infoTitle}>নির্বাচন সংশ্লিষ্ট কমিটি</Text>
          <Text style={styles.infoSubtitle}>
            গাইবান্ধা জেলার নির্বাচন পরিচালনা ও তদারকির জন্য গঠিত কমিটিসমূহ
          </Text>
        </View>

        {/* Committee List */}
        <View style={styles.menuSection}>
          {COMMITTEE_ITEMS.map((item, index) => (
            <Pressable 
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                { borderLeftColor: item.color },
                pressed && styles.menuItemPressed
              ]}
              onPress={() => handleNavigation(item.id)}
            >
              <View style={[styles.menuIconBox, { backgroundColor: item.bgColor }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.menuArrow}>
                <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Additional Info */}
        <View style={styles.noteCard}>
          <Ionicons name="information-circle" size={20} color="#0891b2" />
          <Text style={styles.noteText}>
            প্রতিটি কমিটিতে ক্লিক করে বিস্তারিত তথ্য দেখুন
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2410c',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#c2410c',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerRight: {
    width: 40,
  },
  
  // ScrollView
  scrollView: {
    flex: 1,
    backgroundColor: '#fff7ed',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Info Card
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffedd5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Menu Section
  menuSection: {
    gap: 12,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItemPressed: {
    backgroundColor: '#fafafa',
    transform: [{ scale: 0.98 }],
  },
  menuIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 14,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
  },
  menuArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Note Card
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfeff',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#0891b2',
    lineHeight: 20,
  },
});

