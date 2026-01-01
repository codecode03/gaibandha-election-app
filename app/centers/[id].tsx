import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Risk level types
type RiskLevel = 'high' | 'medium' | 'normal';

// Center data type
interface Center {
  id: string;
  number: string;
  name: string;
  riskLevel: RiskLevel;
}

// Centers data per constituency
const CENTERS_DATA: Record<string, {
  code: string;
  areaName: string;
  color: string;
  centers: Center[];
}> = {
  '29': {
    code: '২৯-গাইবান্ধা-০১',
    areaName: 'সুন্দরগঞ্জ',
    color: '#047857',
    centers: [
      { id: '1', number: '০১', name: 'সুন্দরগঞ্জ পাইলট উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'সুন্দরগঞ্জ সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'দক্ষিণ সুন্দরগঞ্জ প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '4', number: '০৪', name: 'পূর্ব সুন্দরগঞ্জ উচ্চ বিদ্যালয়', riskLevel: 'medium' },
      { id: '5', number: '০৫', name: 'সুন্দরগঞ্জ কলেজিয়েট স্কুল', riskLevel: 'high' },
      { id: '6', number: '০৬', name: 'বড়বাড়ি সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '7', number: '০৭', name: 'ছোটবাড়ি প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '8', number: '০৮', name: 'হরিপুর উচ্চ বিদ্যালয়', riskLevel: 'medium' },
      { id: '9', number: '০৯', name: 'কামারপাড়া সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '10', number: '১০', name: 'নওগাঁ ইউনিয়ন পরিষদ', riskLevel: 'high' },
    ],
  },
  '30': {
    code: '৩০-গাইবান্ধা-০২',
    areaName: 'গাইবান্ধা সদর',
    color: '#b91c1c',
    centers: [
      { id: '1', number: '০১', name: 'গাইবান্ধা সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'গাইবান্ধা সরকারি বালিকা উচ্চ বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'সদর প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '4', number: '০৪', name: 'মালঞ্চী সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '5', number: '০৫', name: 'বামনডাঙ্গা উচ্চ বিদ্যালয়', riskLevel: 'medium' },
    ],
  },
  '31': {
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'পলাশবাড়ী ও সাদুল্লাপুর',
    color: '#6d28d9',
    centers: [
      { id: '1', number: '০১', name: 'পলাশবাড়ী পাইলট উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'সাদুল্লাপুর সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '3', number: '০৩', name: 'পলাশবাড়ী সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium' },
      { id: '4', number: '০৪', name: 'সাদুল্লাপুর প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '5', number: '০৫', name: 'কিশোরগাড়ি উচ্চ বিদ্যালয়', riskLevel: 'medium' },
    ],
  },
  // Palashbari Upazila (গাইবান্ধা-০৩)
  '31-palashbari': {
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'পলাশবাড়ী',
    color: '#6d28d9',
    centers: [
      { id: '1', number: '০১', name: 'পলাশবাড়ী পাইলট উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'পলাশবাড়ী সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'পলাশবাড়ী বালিকা উচ্চ বিদ্যালয়', riskLevel: 'medium' },
      { id: '4', number: '০৪', name: 'কিশোরগাড়ি উচ্চ বিদ্যালয়', riskLevel: 'normal' },
      { id: '5', number: '০৫', name: 'পলাশবাড়ী ইউনিয়ন পরিষদ', riskLevel: 'high' },
    ],
  },
  // Sadullapur Upazila (গাইবান্ধা-০৩)
  '31-sadullapur': {
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'সাদুল্লাপুর',
    color: '#6d28d9',
    centers: [
      { id: '1', number: '০১', name: 'সাদুল্লাপুর সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'সাদুল্লাপুর প্রাথমিক বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'সাদুল্লাপুর বালিকা উচ্চ বিদ্যালয়', riskLevel: 'normal' },
      { id: '4', number: '০৪', name: 'নলডাঙ্গা উচ্চ বিদ্যালয়', riskLevel: 'medium' },
      { id: '5', number: '০৫', name: 'সাদুল্লাপুর ইউনিয়ন পরিষদ', riskLevel: 'high' },
    ],
  },
  '32': {
    code: '৩২-গাইবান্ধা-০৪',
    areaName: 'গোবিন্দগঞ্জ',
    color: '#0e7490',
    centers: [
      { id: '1', number: '০১', name: 'গোবিন্দগঞ্জ পাইলট উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'গোবিন্দগঞ্জ সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'মহিমাগঞ্জ উচ্চ বিদ্যালয়', riskLevel: 'normal' },
      { id: '4', number: '০৪', name: 'রাখালবুরুজ প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
    ],
  },
  '33': {
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'সাঘাটা ও ফুলছড়ি',
    color: '#c2410c',
    centers: [
      { id: '1', number: '০১', name: 'সাঘাটা সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'ফুলছড়ি উচ্চ বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'সাঘাটা সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
      { id: '4', number: '০৪', name: 'ফুলছড়ি প্রাথমিক বিদ্যালয়', riskLevel: 'normal' },
    ],
  },
  // Saghata Upazila (গাইবান্ধা-০৫)
  '33-saghata': {
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'সাঘাটা',
    color: '#c2410c',
    centers: [
      { id: '1', number: '০১', name: 'সাঘাটা সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'সাঘাটা সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'সাঘাটা বালিকা উচ্চ বিদ্যালয়', riskLevel: 'normal' },
      { id: '4', number: '০৪', name: 'কামালপুর উচ্চ বিদ্যালয়', riskLevel: 'normal' },
    ],
  },
  // Fulchari Upazila (গাইবান্ধা-০৫)
  '33-fulchari': {
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'ফুলছড়ি',
    color: '#c2410c',
    centers: [
      { id: '1', number: '০১', name: 'ফুলছড়ি উচ্চ বিদ্যালয়', riskLevel: 'high' },
      { id: '2', number: '০২', name: 'ফুলছড়ি প্রাথমিক বিদ্যালয়', riskLevel: 'medium' },
      { id: '3', number: '০৩', name: 'ফুলছড়ি বালিকা বিদ্যালয়', riskLevel: 'normal' },
      { id: '4', number: '০৪', name: 'এড়াবিল উচ্চ বিদ্যালয়', riskLevel: 'normal' },
    ],
  },
};

const RISK_LABELS: Record<RiskLevel, string> = {
  high: 'অধিক ঝুঁকিপূর্ণ',
  medium: 'ঝুঁকিপূর্ণ',
  normal: 'সাধারণ',
};

const RISK_COLORS: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  high: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  medium: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
  normal: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
};

type FilterType = 'all' | RiskLevel;

export default function CentersListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = CENTERS_DATA[id || '29'];

  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const searchInputRef = useRef<TextInput>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(`/constituency/${id}`);
    }
  }, [id]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
    searchInputRef.current?.focus();
  }, []);

  const filteredCenters = useMemo(() => {
    if (!data) return [];
    
    let centers = data.centers;
    
    // Filter by risk level
    if (filter !== 'all') {
      centers = centers.filter(c => c.riskLevel === filter);
    }
    
    // Filter by search text
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      centers = centers.filter(c => 
        c.number.includes(search) || 
        c.name.toLowerCase().includes(search)
      );
    }
    
    return centers;
  }, [data, filter, searchText]);

  if (!data) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#065f46' }]} edges={['top']}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>Data not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: data.color }]} edges={['top']}>
      <StatusBar style="light" backgroundColor={data.color} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>কেন্দ্র সমূহ</Text>
          <Text style={styles.headerSubtitle}>{data.code} • {data.areaName}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Filter & Search Section */}
      <View style={styles.filterSearchSection}>
        {/* Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.filterContainer}>
          <Pressable
            style={[
              styles.filterButton,
              filter === 'all' && { backgroundColor: data.color },
            ]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'all' && { color: '#ffffff' },
            ]}>সকল</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              filter === 'high' && { backgroundColor: '#dc2626' },
            ]}
            onPress={() => setFilter('high')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'high' && { color: '#ffffff' },
            ]}>অধিক ঝুঁকিপূর্ণ</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              filter === 'medium' && { backgroundColor: '#d97706' },
            ]}
            onPress={() => setFilter('medium')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'medium' && { color: '#ffffff' },
            ]}>ঝুঁকিপূর্ণ</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterButton,
              filter === 'normal' && { backgroundColor: '#16a34a' },
            ]}
            onPress={() => setFilter('normal')}
          >
            <Text style={[
              styles.filterButtonText,
              filter === 'normal' && { color: '#ffffff' },
            ]}>সাধারণ</Text>
          </Pressable>
        </ScrollView>

        {/* Search Input */}
        <View style={[styles.searchContainer, { borderColor: data.color }]}>
          <Ionicons name="search" size={22} color={data.color} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="কেন্দ্র নম্বর বা নাম লিখুন..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={handleSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            keyboardType="default"
            textContentType="none"
            autoComplete="off"
            importantForAutofill="no"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          {searchText.length > 0 && (
            <Pressable onPress={handleClearSearch} hitSlop={12}>
              <Ionicons name="close-circle" size={22} color="#999" />
            </Pressable>
          )}
        </View>

        {/* Results Count */}
        <Text style={styles.resultsCountText}>
          মোট {filteredCenters.length} টি কেন্দ্র পাওয়া গেছে
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {/* Table Header */}
        <View style={[styles.tableHeader, { backgroundColor: data.color }]}>
          <Text style={[styles.tableHeaderText, { minWidth: 45 }]}>নম্বর</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, paddingHorizontal: 8 }]}>কেন্দ্রের নাম</Text>
          <Text style={[styles.tableHeaderText, { minWidth: 90, textAlign: 'center' }]}>শ্রেণী</Text>
        </View>

        {/* Table Rows */}
        {filteredCenters.map((center, index) => {
          const riskStyle = RISK_COLORS[center.riskLevel];
          return (
            <Pressable
              key={center.id}
              style={({ pressed }) => [
                styles.tableRow,
                index % 2 === 0 && styles.tableRowEven,
                pressed && styles.tableRowPressed,
              ]}
              onPress={() => router.push(`/center-details/${id}-${center.id}`)}
            >
              <Text style={styles.centerNumber}>{center.number}</Text>
              <Text style={[styles.centerName, { flex: 1 }]} numberOfLines={2}>
                {center.name}
              </Text>
              <View 
                style={[
                  styles.riskBadge, 
                  { 
                    backgroundColor: riskStyle.bg,
                    borderColor: riskStyle.border,
                  }
                ]}
              >
                <Text style={[styles.riskBadgeText, { color: riskStyle.text }]}>
                  {RISK_LABELS[center.riskLevel]}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: 8 }} />
            </Pressable>
          );
        })}

        {filteredCenters.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>কোনো কেন্দ্র পাওয়া যায়নি</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} জেলা প্রশাসন, গাইবান্ধা
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#065f46',
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  // Filter & Search
  filterSearchSection: {
    backgroundColor: '#f0fdf4',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  filterContainer: {
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 10,
    paddingVertical: 2,
    minHeight: 24,
  },
  resultsCountText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 12,
  },
  // ScrollView
  scrollView: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexWrap: 'wrap',
  },
  tableHeaderText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexWrap: 'wrap',
    gap: 6,
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
  },
  tableRowPressed: {
    backgroundColor: '#dcfce7',
  },
  centerNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    minWidth: 45,
  },
  centerName: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 8,
    flexShrink: 1,
  },
  riskBadge: {
    minWidth: 90,
    maxWidth: 120,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    flexShrink: 0,
  },
  riskBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  // Footer
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});
