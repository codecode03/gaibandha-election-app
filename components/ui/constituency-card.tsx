import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConstituencyCardProps {
  code: string;
  areaName: string;
  // Center data
  totalCenters?: number;
  highRiskCenters?: number;
  riskyCenters?: number;
  normalCenters?: number;
  // Voter data
  totalVoters?: number;
  maleVoters?: number;
  femaleVoters?: number;
  thirdGenderVoters?: number;
  color?: string;
  onPress?: () => void;
}

// Colors for different constituencies - Darker, eye-catching shades
const COLORS = [
  '#047857', // Deep Emerald Green
  '#b91c1c', // Deep Ruby Red
  '#6d28d9', // Deep Violet Purple
  '#0e7490', // Deep Teal Cyan
  '#c2410c', // Deep Burnt Orange
];

export function ConstituencyCard({
  code,
  areaName,
  totalCenters,
  highRiskCenters,
  riskyCenters,
  normalCenters,
  totalVoters,
  maleVoters,
  femaleVoters,
  thirdGenderVoters,
  color = '#059669',
  onPress,
}: ConstituencyCardProps) {
  const formatNumber = (num?: number) => {
    if (num === undefined) return '—';
    // Format with commas (Indian/Bangladeshi style: 1,23,456)
    return num.toLocaleString('en-IN');
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { borderColor: color }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color }]}>
        <View style={styles.headerContent}>
          <Ionicons name="location" size={24} color="#ffffff" />
          <Text style={styles.headerCode}>{code}</Text>
        </View>
        <Ionicons name="chevron-forward" size={28} color="#ffffff" />
      </View>

      {/* Area Name */}
      <View style={styles.areaContainer}>
        <Text style={styles.areaName}>{areaName}</Text>
      </View>

      {/* Centers Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="business" size={20} color={color} />
          <Text style={[styles.sectionTitle, { color }]}>মোট কেন্দ্র সংখ্যা</Text>
          <View style={[styles.totalBadge, { backgroundColor: color }]}>
            <Text style={styles.totalBadgeText}>{totalCenters ?? '—'}</Text>
          </View>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { backgroundColor: '#fef2f2', borderColor: '#fecaca' }]}>
            <Text style={[styles.statBoxValue, { color: '#dc2626' }]}>{highRiskCenters ?? '—'}</Text>
            <Text style={styles.statBoxLabel}>অধিক ঝুঁকিপূর্ণ</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fffbeb', borderColor: '#fde68a' }]}>
            <Text style={[styles.statBoxValue, { color: '#d97706' }]}>{riskyCenters ?? '—'}</Text>
            <Text style={styles.statBoxLabel}>ঝুঁকিপূর্ণ</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]}>
            <Text style={[styles.statBoxValue, { color: '#16a34a' }]}>{normalCenters ?? '—'}</Text>
            <Text style={styles.statBoxLabel}>সাধারণ</Text>
          </View>
        </View>
      </View>

      {/* Voters Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="people" size={20} color={color} />
          <Text style={[styles.sectionTitle, { color }]}>মোট ভোটার</Text>
          <View style={[styles.totalBadge, { backgroundColor: color }]}>
            <Text style={styles.totalBadgeText}>{formatNumber(totalVoters)}</Text>
          </View>
        </View>
        
        <View style={styles.voterStats}>
          <View style={styles.voterStatItem}>
            <View style={[styles.voterIcon, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="man" size={20} color="#2563eb" />
            </View>
            <View>
              <Text style={styles.voterValue}>{formatNumber(maleVoters)}</Text>
              <Text style={styles.voterLabel}>পুরুষ</Text>
            </View>
          </View>
          
          <View style={styles.voterStatItem}>
            <View style={[styles.voterIcon, { backgroundColor: '#fce7f3' }]}>
              <Ionicons name="woman" size={20} color="#db2777" />
            </View>
            <View>
              <Text style={styles.voterValue}>{formatNumber(femaleVoters)}</Text>
              <Text style={styles.voterLabel}>নারী</Text>
            </View>
          </View>
          
          <View style={styles.voterStatItem}>
            <View style={[styles.voterIcon, { backgroundColor: '#f3e8ff' }]}>
              <Ionicons name="person" size={20} color="#9333ea" />
            </View>
            <View>
              <Text style={styles.voterValue}>{thirdGenderVoters ?? '—'}</Text>
              <Text style={styles.voterLabel}>তৃতীয় লিঙ্গ</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tap hint */}
      <View style={[styles.tapHint, { backgroundColor: `${color}15` }]}>
        <Text style={[styles.tapHintText, { color: color }]}>
          বিস্তারিত দেখতে ট্যাপ করুন
        </Text>
        <Ionicons name="hand-left" size={18} color={color} />
      </View>
    </TouchableOpacity>
  );
}

export { COLORS };

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCode: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 12,
  },
  areaContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  areaName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  totalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  totalBadgeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statBox: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statBoxLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 3,
    textAlign: 'center',
  },
  voterStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  voterStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '30%',
    flexShrink: 1,
  },
  voterIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  voterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  voterLabel: {
    fontSize: 11,
    color: '#666',
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 10,
  },
  tapHintText: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 8,
  },
});
