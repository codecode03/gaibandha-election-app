import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Risk level types
type RiskLevel = 'high' | 'medium' | 'normal';

// Road type
type RoadType = 'paved' | 'hbb' | 'muddy';

// Center details data
interface CenterDetails {
  id: string;
  number: string;
  name: string;
  riskLevel: RiskLevel;
  upazila: string;
  union: string;
  distanceFromUpazila: string;
  landmark: string;
  latitude: number;
  longitude: number;
  roadType: RoadType;
  isRemote: boolean;
  hasElectricity: boolean;
  hasBoundaryWall: boolean;
  hasCCCamera: boolean;
  roomCount: number;
  buildingType: 'pucca' | 'semi-pucca';
  hasWashBlock: boolean;
  hasAllocation: boolean;
  allocationAmount?: string;
  presidingOfficer: { name: string; mobile: string };
  assistantPresidingOfficer: { name: string; mobile: string };
  pollingOfficer: { name: string; mobile: string };
  principal: { name: string; mobile: string };
  alternativeContact: { name: string; mobile: string };
  nightGuard: { name: string; mobile: string };
  permanentBooths: number;
  temporaryBooths: number;
}

// Road type labels
const ROAD_LABELS: Record<RoadType, string> = {
  paved: 'পাকা',
  hbb: 'HBB',
  muddy: 'কাঁচা',
};

// Center basic info
const CENTERS_LIST: Record<string, { name: string; riskLevel: RiskLevel; number: string; upazila: string; union: string }[]> = {
  '29': [
    { name: 'সুন্দরগঞ্জ পাইলট উচ্চ বিদ্যালয়', riskLevel: 'high', number: '০১', upazila: 'সুন্দরগঞ্জ', union: 'সুন্দরগঞ্জ পৌরসভা' },
    { name: 'সুন্দরগঞ্জ সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium', number: '০২', upazila: 'সুন্দরগঞ্জ', union: 'সুন্দরগঞ্জ পৌরসভা' },
    { name: 'দক্ষিণ সুন্দরগঞ্জ প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৩', upazila: 'সুন্দরগঞ্জ', union: 'দক্ষিণ সুন্দরগঞ্জ' },
    { name: 'পূর্ব সুন্দরগঞ্জ উচ্চ বিদ্যালয়', riskLevel: 'medium', number: '০৪', upazila: 'সুন্দরগঞ্জ', union: 'পূর্ব সুন্দরগঞ্জ' },
    { name: 'সুন্দরগঞ্জ কলেজিয়েট স্কুল', riskLevel: 'high', number: '০৫', upazila: 'সুন্দরগঞ্জ', union: 'সুন্দরগঞ্জ পৌরসভা' },
    { name: 'বড়বাড়ি সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৬', upazila: 'সুন্দরগঞ্জ', union: 'বড়বাড়ি' },
    { name: 'ছোটবাড়ি প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৭', upazila: 'সুন্দরগঞ্জ', union: 'ছোটবাড়ি' },
    { name: 'হরিপুর উচ্চ বিদ্যালয়', riskLevel: 'medium', number: '০৮', upazila: 'সুন্দরগঞ্জ', union: 'হরিপুর' },
    { name: 'কামারপাড়া সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৯', upazila: 'সুন্দরগঞ্জ', union: 'কামারপাড়া' },
    { name: 'নওগাঁ ইউনিয়ন পরিষদ', riskLevel: 'high', number: '১০', upazila: 'সুন্দরগঞ্জ', union: 'নওগাঁ' },
  ],
  '30': [
    { name: 'গাইবান্ধা সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high', number: '০১', upazila: 'গাইবান্ধা সদর', union: 'গাইবান্ধা পৌরসভা' },
    { name: 'গাইবান্ধা সরকারি বালিকা উচ্চ বিদ্যালয়', riskLevel: 'medium', number: '০২', upazila: 'গাইবান্ধা সদর', union: 'গাইবান্ধা পৌরসভা' },
    { name: 'সদর প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৩', upazila: 'গাইবান্ধা সদর', union: 'সদর' },
    { name: 'মালঞ্চী সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৪', upazila: 'গাইবান্ধা সদর', union: 'মালঞ্চী' },
    { name: 'বামনডাঙ্গা উচ্চ বিদ্যালয়', riskLevel: 'medium', number: '০৫', upazila: 'গাইবান্ধা সদর', union: 'বামনডাঙ্গা' },
  ],
  '31': [
    { name: 'পলাশবাড়ী পাইলট উচ্চ বিদ্যালয়', riskLevel: 'high', number: '০১', upazila: 'পলাশবাড়ী', union: 'পলাশবাড়ী পৌরসভা' },
    { name: 'সাদুল্লাপুর সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high', number: '০২', upazila: 'সাদুল্লাপুর', union: 'সাদুল্লাপুর পৌরসভা' },
    { name: 'পলাশবাড়ী সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium', number: '০৩', upazila: 'পলাশবাড়ী', union: 'পলাশবাড়ী' },
    { name: 'সাদুল্লাপুর প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৪', upazila: 'সাদুল্লাপুর', union: 'সাদুল্লাপুর' },
    { name: 'কিশোরগাড়ি উচ্চ বিদ্যালয়', riskLevel: 'medium', number: '০৫', upazila: 'পলাশবাড়ী', union: 'কিশোরগাড়ি' },
  ],
  '32': [
    { name: 'গোবিন্দগঞ্জ পাইলট উচ্চ বিদ্যালয়', riskLevel: 'high', number: '০১', upazila: 'গোবিন্দগঞ্জ', union: 'গোবিন্দগঞ্জ পৌরসভা' },
    { name: 'গোবিন্দগঞ্জ সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'medium', number: '০২', upazila: 'গোবিন্দগঞ্জ', union: 'গোবিন্দগঞ্জ' },
    { name: 'মহিমাগঞ্জ উচ্চ বিদ্যালয়', riskLevel: 'normal', number: '০৩', upazila: 'গোবিন্দগঞ্জ', union: 'মহিমাগঞ্জ' },
    { name: 'রাখালবুরুজ প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৪', upazila: 'গোবিন্দগঞ্জ', union: 'রাখালবুরুজ' },
  ],
  '33': [
    { name: 'সাঘাটা সরকারি উচ্চ বিদ্যালয়', riskLevel: 'high', number: '০১', upazila: 'সাঘাটা', union: 'সাঘাটা পৌরসভা' },
    { name: 'ফুলছড়ি উচ্চ বিদ্যালয়', riskLevel: 'medium', number: '০২', upazila: 'ফুলছড়ি', union: 'ফুলছড়ি' },
    { name: 'সাঘাটা সরকারি প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৩', upazila: 'সাঘাটা', union: 'সাঘাটা' },
    { name: 'ফুলছড়ি প্রাথমিক বিদ্যালয়', riskLevel: 'normal', number: '০৪', upazila: 'ফুলছড়ি', union: 'ফুলছড়ি' },
  ],
};

function generateCenterDetails(constituencyId: string, centerId: string): CenterDetails | null {
  const centerIndex = parseInt(centerId) - 1;
  const centersList = CENTERS_LIST[constituencyId];
  if (!centersList || centerIndex < 0 || centerIndex >= centersList.length) return null;
  
  const centerInfo = centersList[centerIndex];
  const isHigh = centerInfo.riskLevel === 'high';
  const isMedium = centerInfo.riskLevel === 'medium';
  const phoneBase = `0174767${constituencyId}${centerId.padStart(2, '0')}`;
  
  return {
    id: centerId, number: centerInfo.number, name: centerInfo.name, riskLevel: centerInfo.riskLevel,
    upazila: centerInfo.upazila, union: centerInfo.union,
    distanceFromUpazila: `${(Math.random() * 5 + 0.5).toFixed(1)} কিমি`, landmark: 'বাজারের সামনে',
    latitude: 25.1200 + Math.random() * 0.05, longitude: 89.4100 + Math.random() * 0.05,
    roadType: isHigh ? 'paved' : (isMedium ? 'hbb' : 'muddy'), isRemote: !isHigh,
    hasElectricity: true, hasBoundaryWall: isHigh || isMedium, hasCCCamera: isHigh,
    roomCount: Math.floor(Math.random() * 10) + 5, buildingType: isHigh ? 'pucca' : 'semi-pucca',
    hasWashBlock: isHigh || isMedium, hasAllocation: Math.random() > 0.3, allocationAmount: `${Math.floor(Math.random() * 2000 + 500)} টাকা`,
    presidingOfficer: { name: 'মোঃ নজরুল ইসলাম', mobile: `${phoneBase}1` },
    assistantPresidingOfficer: { name: 'মোঃ মমিনুল হক', mobile: `${phoneBase}2` },
    pollingOfficer: { name: 'মোঃ জামিল হোসেন', mobile: `${phoneBase}3` },
    principal: { name: 'মোঃ আমিনুল ইসলাম', mobile: `${phoneBase}4` },
    alternativeContact: { name: 'মোঃ করিম উদ্দিন', mobile: `${phoneBase}5` },
    nightGuard: { name: 'কামাল হোসেন', mobile: `${phoneBase}6` },
    permanentBooths: Math.floor(Math.random() * 4) + 1, temporaryBooths: Math.floor(Math.random() * 2),
  };
}

const RISK_LABELS: Record<RiskLevel, string> = { high: 'অধিক ঝুঁকিপূর্ণ', medium: 'ঝুঁকিপূর্ণ', normal: 'সাধারণ' };
const RISK_COLORS: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  high: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  medium: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
  normal: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
};
const CONSTITUENCY_COLORS: Record<string, string> = { '29': '#047857', '30': '#b91c1c', '31': '#6d28d9', '32': '#0e7490', '33': '#c2410c' };

export default function CenterDetailsScreen() {
  const { centerId } = useLocalSearchParams<{ centerId: string }>();
  const parts = (centerId || '29-1').split('-');
  const constituencyId = parts[0];
  const centerNum = parts[1];
  const center = generateCenterDetails(constituencyId, centerNum);
  const themeColor = CONSTITUENCY_COLORS[constituencyId] || '#059669';

  const handleBack = () => { if (router.canGoBack()) router.back(); else router.replace(`/centers/${constituencyId}`); };
  const handleCall = (mobile: string) => { Linking.openURL(`tel:${mobile.replace(/-/g, '')}`); };
  const handleViewLocation = () => {
    const { latitude, longitude } = center!;
    const url = Platform.select({
      ios: `maps://app?daddr=${latitude},${longitude}&dirflg=d`,
      android: `google.navigation:q=${latitude},${longitude}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`,
    });
    Linking.openURL(url as string);
  };

  if (!center) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColor }]} edges={['top']}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>কেন্দ্র পাওয়া যায়নি</Text>
      </SafeAreaView>
    );
  }

  const riskStyle = RISK_COLORS[center.riskLevel];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor }]} edges={['top']}>
      <StatusBar style="light" backgroundColor={themeColor} />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>কেন্দ্র বিস্তারিত</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <View style={styles.centerHeader}>
            <View style={[styles.centerNumberBadge, { backgroundColor: themeColor }]}>
              <Text style={styles.centerNumberText}>{center.number}</Text>
            </View>
            <View style={styles.centerNameContainer}>
              <Text style={styles.centerName}>{center.name}</Text>
              <View style={[styles.riskBadge, { backgroundColor: riskStyle.bg, borderColor: riskStyle.border }]}>
                <Text style={[styles.riskBadgeText, { color: riskStyle.text }]}>{RISK_LABELS[center.riskLevel]}</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>উপজেলা:</Text><Text style={styles.detailValue}>{center.upazila}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>ইউনিয়ন:</Text><Text style={styles.detailValue}>{center.union}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>উপজেলা থেকে দূরত্ব:</Text><Text style={styles.detailValue}>{center.distanceFromUpazila}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>পরিচিত ল্যান্ডমার্ক:</Text><Text style={styles.detailValue}>{center.landmark}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>প্রিজাইডিং অফিসার:</Text><Text style={styles.detailValue}>{center.presidingOfficer.name}</Text></View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>মোবাইল:</Text>
              <Pressable style={{ flex: 1 }} onPress={() => handleCall(center.presidingOfficer.mobile)}>
                <Text style={[styles.detailValue, { color: themeColor, fontWeight: '600' }]}>{center.presidingOfficer.mobile}</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.mapCard}>
          <View style={styles.mapPreview}>
            <Ionicons name="map" size={48} color={themeColor} />
            <Text style={styles.mapPreviewText}>মানচিত্রে অবস্থান</Text>
            <Text style={styles.mapCoords}>{center.latitude.toFixed(4)}°N, {center.longitude.toFixed(4)}°E</Text>
          </View>
          <Pressable style={({ pressed }) => [styles.locationButton, { backgroundColor: themeColor }, pressed && { opacity: 0.9 }]} onPress={handleViewLocation}>
            <Ionicons name="navigate" size={22} color="#ffffff" />
            <Text style={styles.locationButtonText}>ম্যাপ দেখুন</Text>
            <Ionicons name="open-outline" size={20} color="#ffffff" />
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="car" size={18} color={themeColor} /> যোগাযোগ ও প্রবেশাধিকার</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>যোগাযোগের রাস্তা:</Text><View style={[styles.statusBadge, { backgroundColor: '#dbeafe' }]}><Text style={[styles.statusBadgeText, { color: '#2563eb' }]}>{ROAD_LABELS[center.roadType]}</Text></View></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>দুর্গমতা:</Text><View style={[styles.statusBadge, { backgroundColor: center.isRemote ? '#fef2f2' : '#f0fdf4' }]}><Text style={[styles.statusBadgeText, { color: center.isRemote ? '#dc2626' : '#16a34a' }]}>{center.isRemote ? 'আছে' : 'নেই'}</Text></View></View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="construct" size={18} color={themeColor} /> সুবিধাসমূহ</Text>
          <View style={styles.facilitiesGrid}>
            <View style={styles.facilityItem}><Ionicons name="flash" size={20} color={center.hasElectricity ? '#16a34a' : '#dc2626'} /><Text style={styles.facilityLabel}>বিদ্যুৎ</Text><Text style={[styles.facilityStatus, { color: center.hasElectricity ? '#16a34a' : '#dc2626' }]}>{center.hasElectricity ? 'আছে' : 'নেই'}</Text></View>
            <View style={styles.facilityItem}><Ionicons name="shield-checkmark" size={20} color={center.hasBoundaryWall ? '#16a34a' : '#dc2626'} /><Text style={styles.facilityLabel}>সীমানা প্রাচীর</Text><Text style={[styles.facilityStatus, { color: center.hasBoundaryWall ? '#16a34a' : '#dc2626' }]}>{center.hasBoundaryWall ? 'আছে' : 'নেই'}</Text></View>
            <View style={styles.facilityItem}><Ionicons name="videocam" size={20} color={center.hasCCCamera ? '#16a34a' : '#dc2626'} /><Text style={styles.facilityLabel}>সি সি ক্যামেরা</Text><Text style={[styles.facilityStatus, { color: center.hasCCCamera ? '#16a34a' : '#dc2626' }]}>{center.hasCCCamera ? 'আছে' : 'নেই'}</Text></View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="home" size={18} color={themeColor} /> রুম ও বরাদ্দ তথ্য</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>রুম সংখ্যা:</Text><Text style={[styles.detailValue, { fontWeight: '700' }]}>{center.roomCount} টি</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>ভবনের ধরন:</Text><View style={[styles.statusBadge, { backgroundColor: center.buildingType === 'pucca' ? '#dbeafe' : '#fef3c7' }]}><Text style={[styles.statusBadgeText, { color: center.buildingType === 'pucca' ? '#2563eb' : '#d97706' }]}>{center.buildingType === 'pucca' ? 'পাকা' : 'আধাপাকা'}</Text></View></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>ওয়াশ ব্লক:</Text><View style={[styles.statusBadge, { backgroundColor: center.hasWashBlock ? '#f0fdf4' : '#fef2f2' }]}><Text style={[styles.statusBadgeText, { color: center.hasWashBlock ? '#16a34a' : '#dc2626' }]}>{center.hasWashBlock ? 'আছে' : 'নাই'}</Text></View></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>বরাদ্দ:</Text><View style={[styles.statusBadge, { backgroundColor: center.hasAllocation ? '#f0fdf4' : '#fef2f2' }]}><Text style={[styles.statusBadgeText, { color: center.hasAllocation ? '#16a34a' : '#dc2626' }]}>{center.hasAllocation ? 'আছে' : 'নেই'}</Text></View></View>
            {center.hasAllocation && center.allocationAmount && (<View style={styles.detailRow}><Text style={styles.detailLabel}>বরাদ্দের পরিমাণ:</Text><Text style={[styles.detailValue, { fontWeight: '700', color: themeColor }]}>{center.allocationAmount}</Text></View>)}
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="checkbox" size={18} color={themeColor} /> বুথ সংখ্যা</Text>
          <View style={styles.boothGrid}>
            <View style={[styles.boothItem, { backgroundColor: '#dbeafe' }]}><Text style={[styles.boothCount, { color: '#2563eb' }]}>{center.permanentBooths}</Text><Text style={styles.boothLabel}>স্থায়ী</Text></View>
            <View style={[styles.boothItem, { backgroundColor: '#fef3c7' }]}><Text style={[styles.boothCount, { color: '#d97706' }]}>{center.temporaryBooths}</Text><Text style={styles.boothLabel}>অস্থায়ী</Text></View>
            <View style={[styles.boothItem, { backgroundColor: '#f0fdf4' }]}><Text style={[styles.boothCount, { color: '#16a34a' }]}>{center.permanentBooths + center.temporaryBooths}</Text><Text style={styles.boothLabel}>মোট</Text></View>
          </View>
        </View>

        <View style={styles.officersCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="people" size={18} color={themeColor} /> নির্বাচনী কর্মকর্তা</Text>
          {[{ t: 'প্রিজাইডিং অফিসার', d: center.presidingOfficer }, { t: 'সহকারী প্রিজাইডিং অফিসার', d: center.assistantPresidingOfficer }, { t: 'ভোট গ্রহণকারী', d: center.pollingOfficer }].map((o, i, a) => (
            <View key={o.t} style={[styles.officerItem, i === a.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.officerInfo}><Text style={styles.officerTitle}>{o.t}</Text><Text style={styles.officerName}>{o.d.name}</Text></View>
              <Pressable style={[styles.callButton, { backgroundColor: themeColor }]} onPress={() => handleCall(o.d.mobile)}><Ionicons name="call" size={16} color="#ffffff" /><Text style={styles.callButtonText}>{o.d.mobile}</Text></Pressable>
            </View>
          ))}
        </View>

        {/* কেন্দ্রে নিয়োজিত আইন-শৃঙ্খলা বাহিনী */}
        <View style={styles.officersCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="shield" size={18} color={themeColor} /> কেন্দ্রে নিয়োজিত আইন-শৃঙ্খলা বাহিনী</Text>
          <View style={styles.noDataContainer}>
            <Ionicons name="information-circle-outline" size={40} color="#9ca3af" />
            <Text style={styles.noDataText}>তথ্য পাওয়া যায়নি</Text>
          </View>
        </View>

        {/* স্ট্রাইকিং ফোর্স */}
        <View style={styles.officersCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="flash" size={18} color={themeColor} /> স্ট্রাইকিং ফোর্স</Text>
          {[
            { t: 'পুলিশ', mobile: '' },
            { t: 'বাংলাদেশ আর্মি', mobile: '' },
            { t: 'বিজিবি (বর্ডার গার্ড বাংলাদেশ)', mobile: '' },
            { t: 'র‍্যাব (Rapid Action Battalion)', mobile: '' },
            { t: 'আনসার ও গ্রাম প্রতিরক্ষা বাহিনী', mobile: '' },
          ].map((o, i, a) => (
            <View key={o.t} style={[styles.officerItem, i === a.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.officerInfo}>
                <Text style={styles.officerName}>{o.t}</Text>
              </View>
              {o.mobile ? (
                <Pressable style={[styles.callButton, { backgroundColor: themeColor }]} onPress={() => handleCall(o.mobile)}>
                  <Ionicons name="call" size={16} color="#ffffff" />
                  <Text style={styles.callButtonText}>{o.mobile}</Text>
                </Pressable>
              ) : (
                <Text style={styles.noNumberText}>—</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.officersCard}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}><Ionicons name="call" size={18} color={themeColor} /> প্রতিষ্ঠান সংশ্লিষ্ট</Text>
          {[{ t: 'অধ্যক্ষ/প্রধান শিক্ষক', d: center.principal }, { t: 'বিকল্প যোগাযোগ', d: center.alternativeContact }, { t: 'নৈশ প্রহরী/দপ্তরি', d: center.nightGuard }].map((o, i, a) => (
            <View key={o.t} style={[styles.officerItem, i === a.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.officerInfo}><Text style={styles.officerTitle}>{o.t}</Text><Text style={styles.officerName}>{o.d.name}</Text></View>
              <Pressable style={[styles.callButton, { backgroundColor: themeColor }]} onPress={() => handleCall(o.d.mobile)}><Ionicons name="call" size={16} color="#ffffff" /><Text style={styles.callButtonText}>{o.d.mobile}</Text></Pressable>
            </View>
          ))}
        </View>

        <View style={styles.footer}><Text style={styles.footerText}>© {new Date().getFullYear()} জেলা প্রশাসন, গাইবান্ধা</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#065f46' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#ffffff' },
  headerRight: { width: 40 },
  scrollView: { flex: 1, backgroundColor: '#f0fdf4', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  infoCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  centerHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  centerNumberBadge: { width: 50, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  centerNumberText: { color: '#ffffff', fontSize: 18, fontWeight: '800' },
  centerNameContainer: { flex: 1 },
  centerName: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  riskBadge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, alignSelf: 'flex-start' },
  riskBadgeText: { fontSize: 13, fontWeight: '700' },
  detailsGrid: { gap: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 2 },
  detailLabel: { fontSize: 14, color: '#666', width: 145, flexShrink: 0 },
  detailValue: { fontSize: 14, color: '#1a1a1a', flex: 1 },
  mapCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  mapPreview: { backgroundColor: '#f0fdf4', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 16 },
  mapPreviewText: { fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginTop: 8 },
  mapCoords: { fontSize: 12, color: '#666', marginTop: 4 },
  locationButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12 },
  locationButtonText: { color: '#ffffff', fontSize: 17, fontWeight: '700', marginHorizontal: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6 },
  statusBadgeText: { fontSize: 13, fontWeight: '600' },
  facilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12, gap: 8 },
  facilityItem: { flex: 1, minWidth: '30%', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4, backgroundColor: '#f9fafb', borderRadius: 10 },
  facilityLabel: { fontSize: 11, color: '#666', marginTop: 4, textAlign: 'center' },
  facilityStatus: { fontSize: 12, fontWeight: '700', marginTop: 2, textAlign: 'center' },
  boothGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 },
  boothItem: { flex: 1, minWidth: '30%', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 4, borderRadius: 12 },
  boothCount: { fontSize: 26, fontWeight: '800' },
  boothLabel: { fontSize: 12, color: '#666', marginTop: 4, textAlign: 'center' },
  officersCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  officerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', flexWrap: 'wrap', gap: 8 },
  officerInfo: { flex: 1, minWidth: '50%' },
  officerTitle: { fontSize: 12, color: '#666', marginBottom: 2 },
  officerName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  callButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  callButtonText: { color: '#ffffff', fontSize: 13, fontWeight: '600', marginLeft: 6 },
  noDataContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
  noDataText: { fontSize: 14, color: '#9ca3af', marginTop: 8, fontWeight: '500' },
  noNumberText: { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
  footer: { paddingVertical: 20, alignItems: 'center', marginTop: 8 },
  footerText: { fontSize: 12, color: '#6b7280', fontWeight: '500' },
});
