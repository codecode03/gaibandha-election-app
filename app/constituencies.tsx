import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ConstituencyCard, COLORS } from '@/components/ui/constituency-card';

const CONSTITUENCIES = [
  {
    id: '29',
    code: '২৯-গাইবান্ধা-০১',
    areaName: 'সুন্দরগঞ্জ',
    totalCenters: 120,
    highRiskCenters: 8,
    riskyCenters: 22,
    normalCenters: 90,
    totalVoters: 399058,
    maleVoters: 198030,
    femaleVoters: 201296,
    thirdGenderVoters: 2,
  },
  {
    id: '30',
    code: '৩০-গাইবান্ধা-০২',
    areaName: 'গাইবান্ধা সদর',
    totalCenters: 95,
    highRiskCenters: 5,
    riskyCenters: 18,
    normalCenters: 72,
    totalVoters: 387138,
    maleVoters: 190448,
    femaleVoters: 196682,
    thirdGenderVoters: 8,
  },
  {
    id: '31',
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'পলাশবাড়ী ও সাদুল্লাপুর',
    totalCenters: 110,
    highRiskCenters: 12,
    riskyCenters: 25,
    normalCenters: 73,
    totalVoters: 481695,
    maleVoters: 207001,
    femaleVoters: 244087,
    thirdGenderVoters: 7,
  },
  {
    id: '32',
    code: '৩২-গাইবান্ধা-০৪',
    areaName: 'গোবিন্দগঞ্জ',
    totalCenters: 105,
    highRiskCenters: 6,
    riskyCenters: 20,
    normalCenters: 79,
    totalVoters: 445986,
    maleVoters: 220823,
    femaleVoters: 225156,
    thirdGenderVoters: 7,
  },
  {
    id: '33',
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'সাঘাটা ও ফুলছড়ি',
    totalCenters: 98,
    highRiskCenters: 4,
    riskyCenters: 15,
    normalCenters: 79,
    totalVoters: 362880,
    maleVoters: 180202,
    femaleVoters: 180528,
    thirdGenderVoters: 2,
  },
];

export default function ConstituenciesScreen() {
  const insets = useSafeAreaInsets();
  
  const handleConstituencyPress = (id: string) => {
    router.push(`/constituency/${id}`);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#059669" />

      {/* Header with safe area padding */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable 
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]} 
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="ফিরে যান - Go back"
        >
          {({ pressed }) => (
            <>
              <Ionicons name="arrow-back" size={22} color={pressed ? "#d1fae5" : "#ffffff"} />
              <Text style={[styles.backText, pressed && styles.backTextPressed]}>ফিরে যান</Text>
            </>
          )}
        </Pressable>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>আসন সমূহ</Text>
          <Text style={styles.headerSubtitle}>গাইবান্ধা জেলা • ৫টি আসন</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Instruction */}
        <View style={styles.instructionContainer}>
          <Ionicons name="information-circle" size={24} color="#059669" />
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#059669', // Green for status bar area
  },
  header: {
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  backButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  backTextPressed: {
    color: '#d1fae5',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f0fdf4', // Light green for content
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  instructionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  instructionText: {
    fontSize: 15,
    color: '#065f46',
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
  cardsContainer: {
    // gap handled by card marginBottom
  },
});
