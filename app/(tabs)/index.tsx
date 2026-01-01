import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Color utility to create light background from accent color
const getLightBg = (color: string) => {
  const colorMap: Record<string, string> = {
    '#059669': '#ecfdf5',
    '#dc2626': '#fef2f2',
    '#9333ea': '#faf5ff',
    '#0891b2': '#ecfeff',
    '#ea580c': '#fff7ed',
  };
  return colorMap[color] || '#f3f4f6';
};

// Menu Item Component
interface MenuItemProps {
  title: string;
  subtitle: string;
  badge?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

function MenuItem({ title, subtitle, badge, icon, color, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity 
      style={[styles.menuItem, { borderLeftColor: color }]} 
      onPress={onPress} 
      activeOpacity={0.6}
    >
      <View style={[styles.menuIconBox, { backgroundColor: getLightBg(color) }]}>
        <View style={[styles.menuIconInner, { backgroundColor: color }]}>
          <Ionicons name={icon} size={20} color="#ffffff" />
        </View>
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>{title}</Text>
          {badge && (
            <View style={[styles.menuBadge, { backgroundColor: getLightBg(color), borderColor: color }]}>
              <Text style={[styles.menuBadgeText, { color }]}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.menuArrowBox}>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
}

const HEADER_HEIGHT = 360;

export default function HomeScreen() {
  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'constituencies':
        router.push('/constituencies');
        break;
      case 'committees':
        router.push('/committees');
        break;
      default:
        console.log(`Navigate to: ${screen}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" backgroundColor="#065F46" />
      
      {/* Fixed Header Section */}
      <LinearGradient
        colors={['#065F46', '#047857', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fixedHeader}
      >
        {/* Subtle Decorative Bubbles */}
        <View style={styles.bubblesContainer}>
          <View style={[styles.bubble, styles.bubble1]} />
          <View style={[styles.bubble, styles.bubble2]} />
          <View style={[styles.bubble, styles.bubble3]} />
        </View>
        
        {/* Header Content */}
        <View style={styles.headerContent}>
          <Text style={styles.headerTopText}>ত্রয়দশ জাতীয় সংসদ নির্বাচন</Text>
          
          {/* Logo */}
          <View style={styles.logoBox}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          
          <Text style={styles.headerTitle}>গাইবান্ধা জেলা</Text>
          
          {/* App Tag Pill */}
          <View style={styles.appTagPill}>
            <View style={styles.gridIcon}>
              <View style={styles.gridRow}>
                <View style={styles.gridDot} />
                <View style={styles.gridDot} />
                <View style={styles.gridDot} />
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridDot} />
                <View style={styles.gridDot} />
                <View style={styles.gridDot} />
              </View>
            </View>
            <Text style={styles.appTagText}>নির্বাচনী তথ্য অ্যাপ</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spacer for fixed header */}
        <View style={styles.headerSpacer} />

        {/* DC Card - White with rounded top */}
        <View style={styles.dcCard}>
          {/* Label with lines */}
          <View style={styles.dcLabelContainer}>
            <View style={styles.dcLabelLine} />
            <Text style={styles.dcLabel}>পরিকল্পনায়</Text>
            <View style={styles.dcLabelLine} />
          </View>
          
          <View style={styles.dcPhotoWrapper}>
            <View style={styles.dcPhotoBorder}>
              <Image
                source={require('@/assets/images/dc.jpeg')}
                style={styles.dcPhoto}
                contentFit="cover"
              />
            </View>
          </View>
          
          <Text style={styles.dcName}>জনাব মোহাম্মদ মাসুদুর রহমান মোল্লা</Text>
          <Text style={styles.dcDesignation}>জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট</Text>
          <Text style={styles.dcLocation}>গাইবান্ধা</Text>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <View style={styles.menuHeader}>
            <Ionicons name="grid" size={16} color="#059669" />
            <Text style={styles.menuHeaderTitle}>সেবা সমূহ</Text>
          </View>
          
          <MenuItem
            title="আসন সমূহ দেখুন"
            subtitle="৫টি আসনের বিস্তারিত তথ্য"
            badge="৫"
            icon="location"
            color="#059669"
            onPress={() => handleNavigation('constituencies')}
          />
          
          <MenuItem
            title="গুরুত্বপূর্ণ নম্বর"
            subtitle="জরুরি যোগাযোগ নম্বর সমূহ"
            icon="call"
            color="#dc2626"
            onPress={() => handleNavigation('important-numbers')}
          />
          
          <MenuItem
            title="আচরণ বিধি"
            subtitle="নির্বাচনী আচরণ বিধিমালা"
            icon="book"
            color="#9333ea"
            onPress={() => handleNavigation('code-of-conduct')}
          />
          
          <MenuItem
            title="মোবাইল কোর্ট আইন"
            subtitle="আইন ও বিধিমালা সমূহ"
            icon="document-text"
            color="#0891b2"
            onPress={() => handleNavigation('mobile-court-law')}
          />

          <MenuItem
            title="সংশ্লিষ্ট কমিটিসমূহ"
            subtitle="নির্বাচন সংশ্লিষ্ট কমিটি তালিকা"
            icon="people"
            color="#ea580c"
            onPress={() => handleNavigation('committees')}
          />
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
    backgroundColor: '#065F46',
  },
  
  // Fixed Header
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1,
    overflow: 'hidden',
  },
  
  // Scrollable Content
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerSpacer: {
    height: HEADER_HEIGHT - 40,
  },
  
  bubblesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  bubble1: {
    width: 180,
    height: 180,
    top: -80,
    right: -60,
  },
  bubble2: {
    width: 120,
    height: 120,
    bottom: -40,
    left: -40,
  },
  bubble3: {
    width: 80,
    height: 80,
    top: 100,
    left: 30,
  },
  headerContent: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 24,
    alignItems: 'center',
    zIndex: 1,
  },
  headerTopText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 24,
  },
  logoBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 80,
    height: 80,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  appTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 12,
  },
  gridIcon: {
    gap: 3,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 3,
  },
  gridDot: {
    width: 4,
    height: 4,
    borderRadius: 1,
    backgroundColor: '#ffffff',
  },
  appTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  
  // DC Card
  dcCard: {
    backgroundColor: '#ffffff',
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  dcLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    gap: 12,
  },
  dcLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
    maxWidth: 80,
  },
  dcLabel: {
    fontSize: 13,
    color: '#9ca3af',
  },
  dcPhotoWrapper: {
    marginBottom: 16,
  },
  dcPhotoBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#059669',
    padding: 3,
    backgroundColor: '#ffffff',
  },
  dcPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  dcName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  dcDesignation: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 3,
  },
  dcLocation: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  
  // Menu Section
  menuSection: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 4,
    gap: 8,
  },
  menuHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  
  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuIconInner: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: 0.2,
  },
  menuBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  menuBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    letterSpacing: 0.1,
  },
  menuArrowBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Footer
  footer: {
    backgroundColor: '#F0FDF4',
    paddingTop: 8,
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#94a3b8',
    letterSpacing: 0.2,
  },
});
