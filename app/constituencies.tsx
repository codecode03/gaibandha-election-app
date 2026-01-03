import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ConstituencyCard, COLORS } from '@/components/ui/constituency-card';

const CONSTITUENCIES = [
  {
    id: '29',
    code: '২৯-গাইবান্ধা-০১',
    areaName: 'সুন্দরগঞ্জ',
    totalCenters: 123,
    highRiskCenters: 11,
    riskyCenters: 30,
    normalCenters: 82,
    totalVoters: 419111,
    maleVoters: 207573,
    femaleVoters: 211535,
    thirdGenderVoters: 3,
  },
  {
    id: '30',
    code: '৩০-গাইবান্ধা-০২',
    areaName: 'গাইবান্ধা সদর',
    totalCenters: 118,
    highRiskCenters: 11,
    riskyCenters: 40,
    normalCenters: 67,
    totalVoters: 411460,
    maleVoters: 202034,
    femaleVoters: 209415,
    thirdGenderVoters: 11,
  },
  {
    id: '31',
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'পলাশবাড়ী ও সাদুল্লাপুর',
    totalCenters: 146,
    highRiskCenters: 17,
    riskyCenters: 70,
    normalCenters: 59,
    totalVoters: 506185,
    maleVoters: 248901,
    femaleVoters: 257275,
    thirdGenderVoters: 9,
  },
  {
    id: '32',
    code: '৩২-গাইবান্ধা-০৪',
    areaName: 'গোবিন্দগঞ্জ',
    totalCenters: 142,
    highRiskCenters: 5,
    riskyCenters: 105,
    normalCenters: 32,
    totalVoters: 468384,
    maleVoters: 231616,
    femaleVoters: 236758,
    thirdGenderVoters: 10,
  },
  {
    id: '33',
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'সাঘাটা ও ফুলছড়ি',
    totalCenters: 146,
    highRiskCenters: 35,
    riskyCenters: 55,
    normalCenters: 56,
    totalVoters: 385260,
    maleVoters: 192277,
    femaleVoters: 192980,
    thirdGenderVoters: 3,
  },
];

// Constituencies that have multiple upazilas and need upazila selection
const MULTI_UPAZILA_CONSTITUENCIES = ['31', '33'];

export default function ConstituenciesScreen() {
  const handleConstituencyPress = (id: string) => {
    // For constituencies with multiple upazilas, go to upazila selection page
    if (MULTI_UPAZILA_CONSTITUENCIES.includes(id)) {
      router.push(`/upazila-select/${id}`);
    } else {
      router.push(`/constituency/${id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" backgroundColor="#065f46" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>আসন সমূহ</Text>
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
            <Ionicons name="location" size={32} color="#059669" />
          </View>
          <Text style={styles.infoTitle}>গাইবান্ধা জেলার আসন সমূহ</Text>
          <Text style={styles.infoSubtitle}>৫টি সংসদীয় আসনের বিস্তারিত তথ্য</Text>
          
          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>৫</Text>
              <Text style={styles.statLabel}>আসন</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>৬৭৫</Text>
              <Text style={styles.statLabel}>কেন্দ্র</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>২১,৯০,৪০০</Text>
              <Text style={styles.statLabel}>ভোটার</Text>
            </View>
          </View>
        </View>

        {/* Instruction */}
        <View style={styles.instructionCard}>
          <Ionicons name="hand-left" size={18} color="#0891b2" />
          <Text style={styles.instructionText}>
            যেকোনো আসনে ট্যাপ করে বিস্তারিত তথ্য দেখুন
          </Text>
        </View>

        {/* Constituency Cards */}
        <View style={styles.cardsContainer}>
          {CONSTITUENCIES.map((constituency, index) => (
            <ConstituencyCard
              key={constituency.id}
              code={constituency.code}
              areaName={constituency.areaName}
              totalCenters={constituency.totalCenters}
              highRiskCenters={constituency.highRiskCenters}
              riskyCenters={constituency.riskyCenters}
              normalCenters={constituency.normalCenters}
              totalVoters={constituency.totalVoters}
              maleVoters={constituency.maleVoters}
              femaleVoters={constituency.femaleVoters}
              thirdGenderVoters={constituency.thirdGenderVoters}
              color={COLORS[index % COLORS.length]}
              onPress={() => handleConstituencyPress(constituency.id)}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© ২০২৫ গাইবান্ধা জেলা প্রশাসন</Text>
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
    backgroundColor: '#065f46',
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
    backgroundColor: '#f0fdf4',
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
    marginBottom: 16,
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
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },

  // Instruction Card
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfeff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 10,
  },
  instructionText: {
    flex: 1,
    fontSize: 13,
    color: '#0891b2',
    fontWeight: '500',
  },

  // Cards Container
  cardsContainer: {
    gap: 12,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
