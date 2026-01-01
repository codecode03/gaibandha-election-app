import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { OfficerCard } from '@/components/ui/officer-card';
import { ExpandableSection } from '@/components/ui/expandable-section';

// DC Image
const DC_IMAGE = require('@/assets/images/dc.jpeg');

// Person type for expandable sections
interface Person {
  name: string;
  designation: string;
  mobile: string;
}

// Constituency data
const CONSTITUENCY_DATA: Record<string, {
  code: string;
  areaName: string;
  totalCenters: number;
  highRiskCenters: number;
  riskyCenters: number;
  normalCenters: number;
  totalVoters: number;
  maleVoters: number;
  femaleVoters: number;
  thirdGenderVoters: number;
  ro: Person;
  aro: Person;
  color: string;
  responsibleOfficers: Person[];
  coordinator: Person[];
  magistrates: Person[];
  committee: Person[];
}> = {
  '29': {
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
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'মোঃ রফিকুল ইসলাম', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01812-456789' },
    color: '#059669',
    responsibleOfficers: [
      { name: 'মোঃ আব্দুল করিম', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '01712-345678' },
      { name: 'মোঃ রফিকুল ইসলাম', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01812-456789' },
      { name: 'মোঃ শফিকুল ইসলাম', designation: 'উপজেলা শিক্ষা অফিসার', mobile: '01712-345680' },
    ],
    coordinator: [
      { name: 'মোঃ আলমগীর হোসেন', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01713-456789' },
    ],
    magistrates: [
      { name: 'মোঃ তারিকুল ইসলাম', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01714-567890' },
      { name: 'মোঃ সাইফুল ইসলাম', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01714-567891' },
    ],
    committee: [
      { name: 'মোঃ জাহিদুল ইসলাম', designation: 'কমিটি চেয়ারম্যান', mobile: '01715-678901' },
      { name: 'মোঃ রাশেদুল ইসলাম', designation: 'কমিটি সদস্য', mobile: '01715-678902' },
      { name: 'মোঃ আনিসুর রহমান', designation: 'কমিটি সদস্য', mobile: '01715-678903' },
    ],
  },
  '30': {
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
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'মোঃ জাহিদুল ইসলাম', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01813-678901' },
    color: '#dc2626',
    responsibleOfficers: [
      { name: 'মোঃ শাহাদাত হোসেন', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '01713-567890' },
      { name: 'মোঃ জাহিদুল ইসলাম', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01813-678901' },
      { name: 'মোঃ রফিকুল ইসলাম', designation: 'উপজেলা শিক্ষা অফিসার', mobile: '01713-567891' },
    ],
    coordinator: [
      { name: 'মোঃ কামরুল হাসান', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01714-678901' },
    ],
    magistrates: [
      { name: 'মোঃ নজরুল ইসলাম', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01715-789012' },
      { name: 'মোঃ আলমগীর হোসেন', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01715-789013' },
    ],
    committee: [
      { name: 'মোঃ শফিকুল ইসলাম', designation: 'কমিটি চেয়ারম্যান', mobile: '01716-890123' },
      { name: 'মোঃ মনিরুল ইসলাম', designation: 'কমিটি সদস্য', mobile: '01716-890124' },
    ],
  },
  '31': {
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
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'মোঃ কামরুল হাসান', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01814-890123' },
    color: '#7c3aed',
    responsibleOfficers: [
      { name: 'মোঃ নজরুল ইসলাম', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '01714-789012' },
      { name: 'মোঃ কামরুল হাসান', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01814-890123' },
      { name: 'মোঃ শামসুল আলম', designation: 'উপজেলা শিক্ষা অফিসার', mobile: '01714-789013' },
    ],
    coordinator: [
      { name: 'মোঃ আব্দুল করিম', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01715-890123' },
    ],
    magistrates: [
      { name: 'মোঃ রাশেদুল ইসলাম', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01716-901234' },
      { name: 'মোঃ ফারুক হোসেন', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01716-901235' },
    ],
    committee: [
      { name: 'মোঃ হাসান মাহমুদ', designation: 'কমিটি চেয়ারম্যান', mobile: '01717-012345' },
      { name: 'মোঃ জাকির হোসেন', designation: 'কমিটি সদস্য', mobile: '01717-012346' },
    ],
  },
  '32': {
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
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'মোঃ মাহবুবুর রহমান', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01815-012345' },
    color: '#0891b2',
    responsibleOfficers: [
      { name: 'মোঃ আনিসুর রহমান', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '01715-901234' },
      { name: 'মোঃ মাহবুবুর রহমান', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01815-012345' },
      { name: 'মোঃ সোহেল রানা', designation: 'উপজেলা শিক্ষা অফিসার', mobile: '01715-901235' },
    ],
    coordinator: [
      { name: 'মোঃ তানভীর আহমেদ', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01716-012345' },
    ],
    magistrates: [
      { name: 'মোঃ মাসুদ রানা', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01717-123456' },
      { name: 'মোঃ ইকবাল হোসেন', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01717-123457' },
    ],
    committee: [
      { name: 'মোঃ রাজিব আহমেদ', designation: 'কমিটি চেয়ারম্যান', mobile: '01718-234567' },
      { name: 'মোঃ জামিল হোসেন', designation: 'কমিটি সদস্য', mobile: '01718-234568' },
    ],
  },
  '33': {
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
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'মোঃ সাইফুল ইসলাম', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01816-234567' },
    color: '#ea580c',
    responsibleOfficers: [
      { name: 'মোঃ তারিকুল ইসলাম', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '01716-123456' },
      { name: 'মোঃ সাইফুল ইসলাম', designation: 'সহকারী কমিশনার (ভূমি)', mobile: '01816-234567' },
      { name: 'মোঃ বেলাল হোসেন', designation: 'উপজেলা শিক্ষা অফিসার', mobile: '01716-123457' },
    ],
    coordinator: [
      { name: 'মোঃ ফয়সাল আহমেদ', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01717-234567' },
    ],
    magistrates: [
      { name: 'মোঃ আতিকুর রহমান', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01718-345678' },
      { name: 'মোঃ রেজাউল করিম', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01718-345679' },
    ],
    committee: [
      { name: 'মোঃ সালাউদ্দিন', designation: 'কমিটি চেয়ারম্যান', mobile: '01719-456789' },
      { name: 'মোঃ আকবর আলী', designation: 'কমিটি সদস্য', mobile: '01719-456790' },
    ],
  },
};

export default function ConstituencyDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = CONSTITUENCY_DATA[id || '29'];

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/constituencies');
    }
  };

  if (!data) {
    return (
      <View style={[styles.container, { backgroundColor: data?.color || '#059669' }]}>
        <Text>Data not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: data.color }]}>
      <StatusBar style="light" backgroundColor={data.color} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: data.color, paddingTop: insets.top + 8 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="ফিরে যান"
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
          <Text style={styles.backText}>ফিরে যান</Text>
        </Pressable>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerCode}>{data.code}</Text>
          <Text style={styles.headerArea}>{data.areaName}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Officer Cards */}
        <View style={styles.officerSection}>
          <View style={styles.officerRow}>
            <OfficerCard
              title="রিটার্নিং অফিসার"
              name={data.ro.name}
              designation={data.ro.designation}
              mobile={data.ro.mobile}
              color={data.color}
              image={DC_IMAGE}
            />
            <View style={styles.officerGap} />
            <OfficerCard
              title="সহকারী রিটার্নিং অফিসার"
              name={data.aro.name}
              designation={data.aro.designation}
              mobile={data.aro.mobile}
              color={data.color}
            />
          </View>
        </View>

        {/* Important Numbers Button */}
        <Pressable
          style={({ pressed }) => [
            styles.importantButton,
            { backgroundColor: data.color },
            pressed && { opacity: 0.9 },
          ]}
          onPress={() => router.push(`/important-numbers/${id}`)}
        >
          <Ionicons name="call" size={24} color="#ffffff" />
          <Text style={styles.importantButtonText}>গুরুত্বপূর্ণ মোবাইল নম্বরসমূহ</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>

        {/* Center Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Ionicons name="business" size={22} color={data.color} />
            <Text style={[styles.statsTitle, { color: data.color }]}>মোট কেন্দ্র সংখ্যা</Text>
            <View style={[styles.statsBadge, { backgroundColor: data.color }]}>
              <Text style={styles.statsBadgeText}>{data.totalCenters}</Text>
            </View>
          </View>

          <View style={styles.centerStatsGrid}>
            <View style={[styles.centerStatBox, { backgroundColor: '#fef2f2', borderColor: '#fecaca' }]}>
              <Text style={[styles.centerStatValue, { color: '#dc2626' }]}>{data.highRiskCenters}</Text>
              <Text style={styles.centerStatLabel}>অধিক ঝুঁকিপূর্ণ</Text>
            </View>
            <View style={[styles.centerStatBox, { backgroundColor: '#fffbeb', borderColor: '#fde68a' }]}>
              <Text style={[styles.centerStatValue, { color: '#d97706' }]}>{data.riskyCenters}</Text>
              <Text style={styles.centerStatLabel}>ঝুঁকিপূর্ণ</Text>
            </View>
            <View style={[styles.centerStatBox, { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]}>
              <Text style={[styles.centerStatValue, { color: '#16a34a' }]}>{data.normalCenters}</Text>
              <Text style={styles.centerStatLabel}>সাধারণ</Text>
            </View>
          </View>

          {/* Search Center Button */}
          <Pressable
            style={({ pressed }) => [
              styles.centerSearchButton,
              { backgroundColor: data.color },
              pressed && { opacity: 0.9 },
            ]}
            onPress={() => router.push(`/centers/${id}`)}
          >
            <Ionicons name="search" size={20} color="#ffffff" />
            <Text style={styles.centerSearchButtonText}>কেন্দ্র খুঁজুন</Text>
          </Pressable>
        </View>

        {/* Voter Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Ionicons name="people" size={22} color={data.color} />
            <Text style={[styles.statsTitle, { color: data.color }]}>মোট ভোটার</Text>
            <View style={[styles.statsBadge, { backgroundColor: data.color }]}>
              <Text style={styles.statsBadgeText}>{formatNumber(data.totalVoters)}</Text>
            </View>
          </View>

          <View style={styles.voterStatsGrid}>
            <View style={styles.voterStatItem}>
              <View style={[styles.voterIcon, { backgroundColor: '#dbeafe' }]}>
                <Ionicons name="man" size={24} color="#2563eb" />
              </View>
              <Text style={styles.voterStatValue}>{formatNumber(data.maleVoters)}</Text>
              <Text style={styles.voterStatLabel}>পুরুষ</Text>
            </View>
            <View style={styles.voterStatItem}>
              <View style={[styles.voterIcon, { backgroundColor: '#fce7f3' }]}>
                <Ionicons name="woman" size={24} color="#db2777" />
              </View>
              <Text style={styles.voterStatValue}>{formatNumber(data.femaleVoters)}</Text>
              <Text style={styles.voterStatLabel}>নারী</Text>
            </View>
            <View style={styles.voterStatItem}>
              <View style={[styles.voterIcon, { backgroundColor: '#f3e8ff' }]}>
                <Ionicons name="person" size={24} color="#9333ea" />
              </View>
              <Text style={styles.voterStatValue}>{data.thirdGenderVoters}</Text>
              <Text style={styles.voterStatLabel}>হিজড়া</Text>
            </View>
          </View>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionGroupTitle}>আরও তথ্য দেখুন</Text>
          
          <ExpandableSection
            title="দায়িত্বপ্রাপ্ত কর্মকর্তাবৃন্দ"
            subtitle="সকল দায়িত্বপ্রাপ্ত কর্মকর্তাদের তালিকা"
            color={data.color}
            data={data.responsibleOfficers}
          />
          
          <ExpandableSection
            title="সমন্বয়কারী কর্মকর্তা"
            subtitle="অতিরিক্ত জেলা প্রশাসক"
            color={data.color}
            data={data.coordinator}
          />
          
          <ExpandableSection
            title="নির্বাচনকালীন দায়িত্বপ্রাপ্ত ম্যাজিস্ট্রেট"
            subtitle="নির্বাচনকালীন ম্যাজিস্ট্রেটদের তালিকা"
            color={data.color}
            data={data.magistrates}
          />
          
          <ExpandableSection
            title="নির্বাচনকালীন অনুসন্ধান ও বিচারক কমিটির সদস্য"
            subtitle="তদন্ত ও বিচার কমিটির সদস্যবৃন্দ"
            color={data.color}
            data={data.committee}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#059669',
  },
  header: {
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
    alignSelf: 'flex-start',
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
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerCode: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerArea: {
    fontSize: 16,
    fontWeight: '500',
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
  officerSection: {
    marginBottom: 16,
  },
  officerRow: {
    flexDirection: 'row',
  },
  officerGap: {
    width: 12,
  },
  importantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 16,
  },
  importantButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 12,
    flex: 1,
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  statsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statsBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  centerStatsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  centerStatBox: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  centerStatValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  centerStatLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  centerSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 4,
  },
  centerSearchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  voterStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  voterStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  voterIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  voterStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  voterStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  sectionsContainer: {
    marginTop: 8,
  },
  sectionGroupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

