import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { OfficerCard } from '@/components/ui/officer-card';
import { ExpandableSection } from '@/components/ui/expandable-section';
import { CandidatesSection } from '@/components/ui/candidates-section';
import { VehicleTable, ObserverTable, MediaTable, Vehicle, Observer, MediaPerson } from '@/components/ui/data-table-section';

// DC Image
const DC_IMAGE = require('@/assets/images/dc.jpeg');

// UNO Images
const UNO_IMAGES = {
  sundarganj: require('@/assets/images/uno/sundarganj.jpg'),
  gaibandhasadar: require('@/assets/images/uno/gaibandhasadar.jpg'),
  palashbari: require('@/assets/images/uno/palashbari.jpg'),
  sadullapur: require('@/assets/images/uno/sadullapur.png'),
  gobindaganj: require('@/assets/images/uno/gobindaganj.png'),
  saghata: require('@/assets/images/uno/saghata.jpeg'),
  fulchari: require('@/assets/images/uno/phulchari.jpeg'),
};

// Person type for expandable sections
interface Person {
  name: string;
  designation: string;
  mobile: string;
  image?: any;
}

// Candidate type
interface Candidate {
  name: string;
  party?: string;
  symbol: string; // Symbol name as text (e.g., "নৌকা", "ধানের শীষ")
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
  mapLink?: string;
  candidates: Candidate[];
  coordinator: Person[];
  magistrates: Person[];
  committee: Person[];
  vehicles: Vehicle[];
  observers: Observer[];
  mediaPersonnel: MediaPerson[];
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
    aro: { name: 'ঈফফাত জাহান তুলি', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭৫', image: UNO_IMAGES.sundarganj },
    color: '#047857',
    candidates: [
      { name: 'মোঃ শফিকুল ইসলাম', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ আব্দুর রহমান', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ কামরুল হাসান', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ নজরুল ইসলাম', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ ফারুক আহমেদ', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ আলমগীর হোসেন', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ রাশেদুল হক', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ সোহেল রানা', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
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
    vehicles: [
      { vehicleNumber: 'গাই ম ১২-৩৪৫৬', driverName: 'মোঃ করিম', phone: '01712-111111' },
      { vehicleNumber: 'গাই ম ১২-৭৮৯০', driverName: 'মোঃ রহিম', phone: '01712-222222' },
      { vehicleNumber: 'গাই ম ১২-১১২২', driverName: 'মোঃ জামাল', phone: '01712-333333' },
      { vehicleNumber: 'গাই ম ১২-৩৩৪৪', driverName: 'মোঃ কামাল', phone: '01712-444444' },
      { vehicleNumber: 'গাই ম ১২-৫৫৬৬', driverName: 'মোঃ হাসান', phone: '01712-555555' },
      { vehicleNumber: 'গাই ম ১২-৭৭৮৮', driverName: 'মোঃ হোসেন', phone: '01712-666666' },
      { vehicleNumber: 'গাই ম ১২-৯৯০০', driverName: 'মোঃ আলী', phone: '01712-777777' },
      { vehicleNumber: 'গাই ম ১২-১২৩৪', driverName: 'মোঃ রফিক', phone: '01712-888888' },
    ],
    observers: [
      { name: 'মোঃ আব্দুল হক', phone: '01713-333333', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ সাইফুল', phone: '01713-444444', organization: 'টিআইবি' },
      { name: 'মোঃ নাজমুল হক', phone: '01713-555555', organization: 'সুজন' },
      { name: 'মোঃ ফারুক আহমেদ', phone: '01713-666666', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ আশরাফুল', phone: '01713-777777', organization: 'এফইএমএ' },
      { name: 'মোঃ জসিম উদ্দিন', phone: '01713-888888', organization: 'ওআইসি' },
      { name: 'মোঃ শাহজাহান', phone: '01713-999999', organization: 'ইইউ' },
    ],
    mediaPersonnel: [
      { mediaName: 'বাংলাদেশ টেলিভিশন', name: 'মোঃ আলম', phone: '01714-555555' },
      { mediaName: 'দৈনিক প্রথম আলো', name: 'মোঃ কামাল', phone: '01714-666666' },
      { mediaName: 'চ্যানেল আই', name: 'মোঃ রাজু', phone: '01714-777777' },
      { mediaName: 'এনটিভি', name: 'মোঃ সাগর', phone: '01714-888888' },
      { mediaName: 'একুশে টেলিভিশন', name: 'মোঃ নাঈম', phone: '01714-999999' },
      { mediaName: 'দৈনিক যুগান্তর', name: 'মোঃ ফাহিম', phone: '01714-111222' },
      { mediaName: 'সময় টিভি', name: 'মোঃ তানভীর', phone: '01714-222333' },
      { mediaName: 'আরটিভি', name: 'মোঃ শাকিল', phone: '01714-333444' },
      { mediaName: 'দৈনিক ইত্তেফাক', name: 'মোঃ রাকিব', phone: '01714-444555' },
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
    aro: { name: 'মিজ লাইলাতুল হোসেন', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭১', image: UNO_IMAGES.gaibandhasadar },
    color: '#b91c1c',
    candidates: [
      { name: 'মোঃ নজরুল ইসলাম', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ জাহিদুল ইসলাম', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ আলমগীর হোসেন', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ শামসুল আলম', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ রবিউল ইসলাম', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ হাবিবুর রহমান', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ মাহবুব আলম', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ আনোয়ার হোসেন', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
      { name: 'মোঃ জয়নাল আবেদীন', party: 'স্বতন্ত্র', symbol: 'টেবিল ল্যাম্প' },
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
    vehicles: [
      { vehicleNumber: 'গাই ম ১৩-১২৩৪', driverName: 'মোঃ জামাল', phone: '01713-111111' },
      { vehicleNumber: 'গাই ম ১৩-৫৬৭৮', driverName: 'মোঃ কামাল', phone: '01713-222222' },
      { vehicleNumber: 'গাই ম ১৩-৯০১২', driverName: 'মোঃ সালাম', phone: '01713-333333' },
      { vehicleNumber: 'গাই ম ১৩-৩৪৫৬', driverName: 'মোঃ আকরাম', phone: '01713-444444' },
      { vehicleNumber: 'গাই ম ১৩-৭৮৯০', driverName: 'মোঃ ইকবাল', phone: '01713-555555' },
      { vehicleNumber: 'গাই ম ১৩-১১২৩', driverName: 'মোঃ শহীদ', phone: '01713-666666' },
      { vehicleNumber: 'গাই ম ১৩-৪৫৬৭', driverName: 'মোঃ মজিদ', phone: '01713-777777' },
      { vehicleNumber: 'গাই ম ১৩-৮৯০১', driverName: 'মোঃ হামিদ', phone: '01713-888888' },
      { vehicleNumber: 'গাই ম ১৩-২৩৪৫', driverName: 'মোঃ রশিদ', phone: '01713-999999' },
      { vehicleNumber: 'গাই ম ১৩-৬৭৮৯', driverName: 'মোঃ খালেদ', phone: '01713-101010' },
    ],
    observers: [
      { name: 'মোঃ নজরুল ইসলাম', phone: '01714-333333', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ রফিক', phone: '01714-444444', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ শাহাদাত', phone: '01714-555555', organization: 'সুজন' },
      { name: 'মোঃ মাহফুজ', phone: '01714-666666', organization: 'টিআইবি' },
      { name: 'মোঃ সাব্বির', phone: '01714-777777', organization: 'এফইএমএ' },
      { name: 'মোঃ তৌহিদ', phone: '01714-888888', organization: 'ওআইসি' },
      { name: 'মোঃ ফয়সাল', phone: '01714-999999', organization: 'ইইউ' },
      { name: 'মোঃ আরিফ', phone: '01714-121212', organization: 'জাতিসংঘ' },
    ],
    mediaPersonnel: [
      { mediaName: 'চ্যানেল আই', name: 'মোঃ সোহেল', phone: '01715-555555' },
      { mediaName: 'দৈনিক কালের কণ্ঠ', name: 'মোঃ জাহিদ', phone: '01715-666666' },
      { mediaName: 'বাংলাভিশন', name: 'মোঃ রাহাত', phone: '01715-777777' },
      { mediaName: 'মাছরাঙা টিভি', name: 'মোঃ সজীব', phone: '01715-888888' },
      { mediaName: 'দৈনিক সমকাল', name: 'মোঃ তানজিম', phone: '01715-999999' },
      { mediaName: 'গাজীপুর টিভি', name: 'মোঃ রায়হান', phone: '01715-111222' },
      { mediaName: 'দৈনিক জনকণ্ঠ', name: 'মোঃ শাকিব', phone: '01715-222333' },
      { mediaName: 'বৈশাখী টিভি', name: 'মোঃ নাফিস', phone: '01715-333444' },
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
    aro: { name: 'শেখ জাবের আহমেদ', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭৩', image: UNO_IMAGES.palashbari },
    color: '#6d28d9',
    candidates: [
      { name: 'মোঃ সাইফুল ইসলাম', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ রফিকুল ইসলাম', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ তারেক রহমান', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ আব্দুল কাদের', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ সেলিম রেজা', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ আসাদুজ্জামান', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ মাসুদ রানা', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ জুনায়েদ আহমেদ', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
      { name: 'মোঃ শাহরিয়ার কবির', party: 'স্বতন্ত্র', symbol: 'টেবিল ল্যাম্প' },
      { name: 'মোঃ ইমরান হোসেন', party: 'স্বতন্ত্র', symbol: 'কলম' },
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
    vehicles: [
      { vehicleNumber: 'গাই ম ১৪-১১১১', driverName: 'মোঃ আকবর', phone: '01714-111111' },
      { vehicleNumber: 'গাই ম ১৪-২২২২', driverName: 'মোঃ বাবর', phone: '01714-222222' },
      { vehicleNumber: 'গাই ম ১৪-৩৩৩৩', driverName: 'মোঃ জাবের', phone: '01714-333333' },
      { vehicleNumber: 'গাই ম ১৪-৪৪৪৪', driverName: 'মোঃ সাবের', phone: '01714-444444' },
      { vehicleNumber: 'গাই ম ১৪-৫৫৫৫', driverName: 'মোঃ নাসের', phone: '01714-555555' },
      { vehicleNumber: 'গাই ম ১৪-৬৬৬৬', driverName: 'মোঃ কাদের', phone: '01714-666666' },
      { vehicleNumber: 'গাই ম ১৪-৭৭৭৭', driverName: 'মোঃ মাসুদ', phone: '01714-777777' },
    ],
    observers: [
      { name: 'মোঃ শাহজাহান', phone: '01715-333333', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ আলমগীর', phone: '01715-444444', organization: 'সুজন' },
      { name: 'মোঃ জাহাঙ্গীর', phone: '01715-555555', organization: 'টিআইবি' },
      { name: 'মোঃ আমিনুল', phone: '01715-666666', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ শামীম', phone: '01715-777777', organization: 'এফইএমএ' },
      { name: 'মোঃ নাঈম', phone: '01715-888888', organization: 'ওআইসি' },
      { name: 'মোঃ ফাহিম', phone: '01715-999999', organization: 'ইইউ' },
      { name: 'মোঃ রাকিব', phone: '01715-101010', organization: 'জাতিসংঘ' },
      { name: 'মোঃ সাকিব', phone: '01715-111213', organization: 'কমনওয়েলথ' },
    ],
    mediaPersonnel: [
      { mediaName: 'এনটিভি', name: 'মোঃ ফারুক', phone: '01716-555555' },
      { mediaName: 'দৈনিক যুগান্তর', name: 'মোঃ মাসুদ', phone: '01716-666666' },
      { mediaName: 'সময় টিভি', name: 'মোঃ রাজীব', phone: '01716-777777' },
      { mediaName: 'একুশে টিভি', name: 'মোঃ সাদিক', phone: '01716-888888' },
      { mediaName: 'দৈনিক ইনকিলাব', name: 'মোঃ হাফিজ', phone: '01716-999999' },
      { mediaName: 'আরটিভি', name: 'মোঃ নাসিম', phone: '01716-101011' },
      { mediaName: 'দৈনিক নয়া দিগন্ত', name: 'মোঃ তারিক', phone: '01716-121314' },
      { mediaName: 'বাংলা ট্রিবিউন', name: 'মোঃ জাভেদ', phone: '01716-151617' },
      { mediaName: 'ডেইলি স্টার', name: 'মোঃ আরিফ', phone: '01716-181920' },
      { mediaName: 'বিডিনিউজ২৪', name: 'মোঃ সোহান', phone: '01716-212223' },
    ],
  },
  // Palashbari Upazila (গাইবান্ধা-০৩)
  '31-palashbari': {
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'পলাশবাড়ী',
    totalCenters: 55,
    highRiskCenters: 6,
    riskyCenters: 12,
    normalCenters: 37,
    totalVoters: 240847,
    maleVoters: 103500,
    femaleVoters: 122044,
    thirdGenderVoters: 3,
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'শেখ জাবের আহমেদ', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭৩', image: UNO_IMAGES.palashbari },
    color: '#6d28d9',
    candidates: [
      { name: 'মোঃ সাইফুল ইসলাম', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ রফিকুল ইসলাম', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ তারেক রহমান', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ আব্দুল কাদের', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ সেলিম রেজা', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ আসাদুজ্জামান', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ মাসুদ রানা', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ জুনায়েদ আহমেদ', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
    ],
    coordinator: [
      { name: 'মোঃ আব্দুল করিম', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01715-890123' },
    ],
    magistrates: [
      { name: 'মোঃ রাশেদুল ইসলাম', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01716-901234' },
    ],
    committee: [
      { name: 'মোঃ হাসান মাহমুদ', designation: 'কমিটি চেয়ারম্যান', mobile: '01717-012345' },
      { name: 'মোঃ জাকির হোসেন', designation: 'কমিটি সদস্য', mobile: '01717-012346' },
    ],
    vehicles: [
      { vehicleNumber: 'গাই ম ১৪-৩৩৩৩', driverName: 'মোঃ হাবিব', phone: '01714-333333' },
      { vehicleNumber: 'গাই ম ১৪-৪৪৫৫', driverName: 'মোঃ জামাল', phone: '01714-444455' },
      { vehicleNumber: 'গাই ম ১৪-৫৫৬৬', driverName: 'মোঃ কামাল', phone: '01714-555566' },
      { vehicleNumber: 'গাই ম ১৪-৬৬৭৭', driverName: 'মোঃ সালাম', phone: '01714-666677' },
      { vehicleNumber: 'গাই ম ১৪-৭৭৮৮', driverName: 'মোঃ রহমান', phone: '01714-777788' },
      { vehicleNumber: 'গাই ম ১৪-৮৮৯৯', driverName: 'মোঃ আকরাম', phone: '01714-888899' },
      { vehicleNumber: 'গাই ম ১৪-৯৯০০', driverName: 'মোঃ ইকবাল', phone: '01714-999000' },
      { vehicleNumber: 'গাই ম ১৪-১০১১', driverName: 'মোঃ শহীদ', phone: '01714-101011' },
    ],
    observers: [
      { name: 'মোঃ তারেক', phone: '01715-777777', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ জাহাঙ্গীর', phone: '01715-888877', organization: 'সুজন' },
      { name: 'মোঃ আমিনুল', phone: '01715-999977', organization: 'টিআইবি' },
      { name: 'মোঃ শামীম', phone: '01715-111177', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ নাঈম', phone: '01715-222277', organization: 'এফইএমএ' },
      { name: 'মোঃ ফাহিম', phone: '01715-333377', organization: 'ওআইসি' },
      { name: 'মোঃ রাকিব', phone: '01715-444477', organization: 'ইইউ' },
    ],
    mediaPersonnel: [
      { mediaName: 'সময় টিভি', name: 'মোঃ রাজু', phone: '01716-888888' },
      { mediaName: 'একুশে টিভি', name: 'মোঃ সাদিক', phone: '01716-999988' },
      { mediaName: 'দৈনিক ইনকিলাব', name: 'মোঃ হাফিজ', phone: '01716-111188' },
      { mediaName: 'আরটিভি', name: 'মোঃ নাসিম', phone: '01716-222288' },
      { mediaName: 'দৈনিক নয়া দিগন্ত', name: 'মোঃ তারিক', phone: '01716-333388' },
      { mediaName: 'বাংলা ট্রিবিউন', name: 'মোঃ জাভেদ', phone: '01716-444488' },
      { mediaName: 'ডেইলি স্টার', name: 'মোঃ আরিফ', phone: '01716-555588' },
      { mediaName: 'বিডিনিউজ২৪', name: 'মোঃ সোহান', phone: '01716-666688' },
    ],
  },
  // Sadullapur Upazila (গাইবান্ধা-০৩)
  '31-sadullapur': {
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'সাদুল্লাপুর',
    totalCenters: 55,
    highRiskCenters: 6,
    riskyCenters: 13,
    normalCenters: 36,
    totalVoters: 240848,
    maleVoters: 103501,
    femaleVoters: 122043,
    thirdGenderVoters: 4,
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'জনাব মাহমুদুল হাসান', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭৪', image: UNO_IMAGES.sadullapur },
    color: '#6d28d9',
    candidates: [
      { name: 'মোঃ সাইফুল ইসলাম', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ রফিকুল ইসলাম', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ তারেক রহমান', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ আব্দুল কাদের', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ সেলিম রেজা', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ আসাদুজ্জামান', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ মাসুদ রানা', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ জুনায়েদ আহমেদ', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
    ],
    coordinator: [
      { name: 'মোঃ আব্দুল করিম', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01715-890123' },
    ],
    magistrates: [
      { name: 'মোঃ ফারুক হোসেন', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01716-901235' },
    ],
    committee: [
      { name: 'মোঃ মাহবুবুল আলম', designation: 'কমিটি চেয়ারম্যান', mobile: '01717-012347' },
      { name: 'মোঃ শাহজাহান আলী', designation: 'কমিটি সদস্য', mobile: '01717-012348' },
    ],
    vehicles: [
      { vehicleNumber: 'গাই ম ১৪-৪৪৪৪', driverName: 'মোঃ সালাম', phone: '01714-444444' },
      { vehicleNumber: 'গাই ম ১৪-৫৫৫৫', driverName: 'মোঃ আকবর', phone: '01714-555544' },
      { vehicleNumber: 'গাই ম ১৪-৬৬৬৬', driverName: 'মোঃ বাবর', phone: '01714-666644' },
      { vehicleNumber: 'গাই ম ১৪-৭৭৭৭', driverName: 'মোঃ জাবের', phone: '01714-777744' },
      { vehicleNumber: 'গাই ম ১৪-৮৮৮৮', driverName: 'মোঃ সাবের', phone: '01714-888844' },
      { vehicleNumber: 'গাই ম ১৪-৯৯৯৯', driverName: 'মোঃ নাসের', phone: '01714-999944' },
      { vehicleNumber: 'গাই ম ১৪-১২১২', driverName: 'মোঃ কাদের', phone: '01714-121244' },
      { vehicleNumber: 'গাই ম ১৪-১৩১৩', driverName: 'মোঃ মাসুদ', phone: '01714-131344' },
      { vehicleNumber: 'গাই ম ১৪-১৪১৪', driverName: 'মোঃ রাসেল', phone: '01714-141444' },
    ],
    observers: [
      { name: 'মোঃ হানিফ', phone: '01715-888888', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ মতিউর', phone: '01715-999988', organization: 'সুজন' },
      { name: 'মোঃ শফিক', phone: '01715-111188', organization: 'টিআইবি' },
      { name: 'মোঃ রফিক', phone: '01715-222288', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ তৌফিক', phone: '01715-333388', organization: 'এফইএমএ' },
      { name: 'মোঃ সাদিক', phone: '01715-444488', organization: 'ওআইসি' },
      { name: 'মোঃ নাজিম', phone: '01715-555588', organization: 'ইইউ' },
      { name: 'মোঃ হাসিম', phone: '01715-666688', organization: 'জাতিসংঘ' },
    ],
    mediaPersonnel: [
      { mediaName: 'একুশে টেলিভিশন', name: 'মোঃ শামীম', phone: '01716-999999' },
      { mediaName: 'চ্যানেল আই', name: 'মোঃ সোহেল', phone: '01716-111199' },
      { mediaName: 'বাংলাভিশন', name: 'মোঃ রাহাত', phone: '01716-222299' },
      { mediaName: 'মাছরাঙা টিভি', name: 'মোঃ সজীব', phone: '01716-333399' },
      { mediaName: 'দৈনিক সমকাল', name: 'মোঃ তানজিম', phone: '01716-444499' },
      { mediaName: 'গাজীপুর টিভি', name: 'মোঃ রায়হান', phone: '01716-555599' },
      { mediaName: 'দৈনিক জনকণ্ঠ', name: 'মোঃ শাকিব', phone: '01716-666699' },
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
    aro: { name: 'সৈয়দা ইয়াসমিন সুলতানা', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭২', image: UNO_IMAGES.gobindaganj },
    color: '#0e7490',
    mapLink: 'https://drive.google.com/file/d/1b2JWmOY8vkinEFOCrtegNVcPLsnM5U0M/view?usp=sharing',
    candidates: [
      { name: 'মোঃ ফজলুল হক', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ হাসান মাহমুদ', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ আনিসুর রহমান', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ খালেকুজ্জামান', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ আতিকুর রহমান', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ মোস্তফা কামাল', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ আশিক মাহমুদ', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ সাইদুর রহমান', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
      { name: 'মোঃ জহির উদ্দিন', party: 'স্বতন্ত্র', symbol: 'টেবিল ল্যাম্প' },
      { name: 'মোঃ শাহাদাত হোসেন', party: 'স্বতন্ত্র', symbol: 'কলম' },
      { name: 'মোঃ মোক্তার হোসেন', party: 'স্বতন্ত্র', symbol: 'সাইকেল' },
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
    vehicles: [
      { vehicleNumber: 'গাই ম ১৫-১১১১', driverName: 'মোঃ ইউসুফ', phone: '01715-111111' },
      { vehicleNumber: 'গাই ম ১৫-২২২২', driverName: 'মোঃ ইব্রাহিম', phone: '01715-222222' },
      { vehicleNumber: 'গাই ম ১৫-৩৩৩৩', driverName: 'মোঃ ইসমাইল', phone: '01715-333333' },
      { vehicleNumber: 'গাই ম ১৫-৪৪৪৪', driverName: 'মোঃ ইয়াকুব', phone: '01715-444444' },
      { vehicleNumber: 'গাই ম ১৫-৫৫৫৫', driverName: 'মোঃ দাউদ', phone: '01715-555555' },
      { vehicleNumber: 'গাই ম ১৫-৬৬৬৬', driverName: 'মোঃ সুলাইমান', phone: '01715-666666' },
      { vehicleNumber: 'গাই ম ১৫-৭৭৭৭', driverName: 'মোঃ আইয়ুব', phone: '01715-777777' },
      { vehicleNumber: 'গাই ম ১৫-৮৮৮৮', driverName: 'মোঃ মুসা', phone: '01715-888888' },
      { vehicleNumber: 'গাই ম ১৫-৯৯৯৯', driverName: 'মোঃ হারুন', phone: '01715-999999' },
      { vehicleNumber: 'গাই ম ১৫-১০১০', driverName: 'মোঃ ইদ্রিস', phone: '01715-101010' },
      { vehicleNumber: 'গাই ম ১৫-১১১২', driverName: 'মোঃ নুহ', phone: '01715-111112' },
      { vehicleNumber: 'গাই ম ১৫-১২১৩', driverName: 'মোঃ ইলিয়াস', phone: '01715-121213' },
    ],
    observers: [
      { name: 'মোঃ আমজাদ', phone: '01716-333333', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ ফজলুর রহমান', phone: '01716-444444', organization: 'এফইএমএ' },
      { name: 'মোঃ মাহফুজুর রহমান', phone: '01716-555555', organization: 'সুজন' },
      { name: 'মোঃ শামসুল হক', phone: '01716-666666', organization: 'টিআইবি' },
      { name: 'মোঃ আবদুল্লাহ', phone: '01716-777777', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ রহমতুল্লাহ', phone: '01716-888888', organization: 'ওআইসি' },
      { name: 'মোঃ হেদায়েতুল্লাহ', phone: '01716-999999', organization: 'ইইউ' },
      { name: 'মোঃ নজরুল্লাহ', phone: '01716-101010', organization: 'জাতিসংঘ' },
      { name: 'মোঃ আতাউল্লাহ', phone: '01716-111112', organization: 'কমনওয়েলথ' },
      { name: 'মোঃ সাইফুল্লাহ', phone: '01716-121213', organization: 'এশিয়ান নেটওয়ার্ক' },
    ],
    mediaPersonnel: [
      { mediaName: 'আরটিভি', name: 'মোঃ নাঈম', phone: '01717-555555' },
      { mediaName: 'দৈনিক ইনকিলাব', name: 'মোঃ আকরাম', phone: '01717-666666' },
      { mediaName: 'বাংলাদেশ টেলিভিশন', name: 'মোঃ আলম', phone: '01717-777777' },
      { mediaName: 'দৈনিক প্রথম আলো', name: 'মোঃ কামাল', phone: '01717-888888' },
      { mediaName: 'চ্যানেল আই', name: 'মোঃ রাজু', phone: '01717-999999' },
      { mediaName: 'এনটিভি', name: 'মোঃ সাগর', phone: '01717-101010' },
      { mediaName: 'একুশে টেলিভিশন', name: 'মোঃ নাঈম', phone: '01717-111112' },
      { mediaName: 'দৈনিক যুগান্তর', name: 'মোঃ ফাহিম', phone: '01717-121213' },
      { mediaName: 'সময় টিভি', name: 'মোঃ তানভীর', phone: '01717-131314' },
      { mediaName: 'বৈশাখী টিভি', name: 'মোঃ নাফিস', phone: '01717-141415' },
      { mediaName: 'দৈনিক ইত্তেফাক', name: 'মোঃ রাকিব', phone: '01717-151516' },
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
    aro: { name: 'মোঃ আশরাফুল কবীর', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭৬', image: UNO_IMAGES.saghata },
    color: '#c2410c',
    candidates: [
      { name: 'মোঃ জাকির হোসেন', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ মোস্তাফিজুর রহমান', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ বেলাল হোসেন', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ আব্দুল মতিন', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ শাহাবুদ্দিন', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ নুরুল হুদা', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ আমিনুল ইসলাম', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ জাফর ইকবাল', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
      { name: 'মোঃ কামাল উদ্দিন', party: 'স্বতন্ত্র', symbol: 'টেবিল ল্যাম্প' },
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
    vehicles: [
      { vehicleNumber: 'গাই ম ১৬-১১১১', driverName: 'মোঃ বাদল', phone: '01716-111111' },
      { vehicleNumber: 'গাই ম ১৬-২২২২', driverName: 'মোঃ শাহিন', phone: '01716-222222' },
      { vehicleNumber: 'গাই ম ১৬-৩৩৩৩', driverName: 'মোঃ রবিন', phone: '01716-333333' },
      { vehicleNumber: 'গাই ম ১৬-৪৪৪৪', driverName: 'মোঃ সোহান', phone: '01716-444444' },
      { vehicleNumber: 'গাই ম ১৬-৫৫৫৫', driverName: 'মোঃ রাজন', phone: '01716-555555' },
      { vehicleNumber: 'গাই ম ১৬-৬৬৬৬', driverName: 'মোঃ পলাশ', phone: '01716-666666' },
      { vehicleNumber: 'গাই ম ১৬-৭৭৭৭', driverName: 'মোঃ বাবু', phone: '01716-777777' },
      { vehicleNumber: 'গাই ম ১৬-৮৮৮৮', driverName: 'মোঃ মিঠু', phone: '01716-888888' },
      { vehicleNumber: 'গাই ম ১৬-৯৯৯৯', driverName: 'মোঃ টিপু', phone: '01716-999999' },
    ],
    observers: [
      { name: 'মোঃ মিজান', phone: '01717-333333', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ কবির', phone: '01717-444444', organization: 'ওআইসি' },
      { name: 'মোঃ জাবের', phone: '01717-555555', organization: 'সুজন' },
      { name: 'মোঃ নাসের', phone: '01717-666666', organization: 'টিআইবি' },
      { name: 'মোঃ সাবের', phone: '01717-777777', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ তাহের', phone: '01717-888888', organization: 'এফইএমএ' },
      { name: 'মোঃ জাহের', phone: '01717-999999', organization: 'ইইউ' },
      { name: 'মোঃ মাহের', phone: '01717-101010', organization: 'জাতিসংঘ' },
    ],
    mediaPersonnel: [
      { mediaName: 'বাংলা ভিশন', name: 'মোঃ রাকিব', phone: '01718-555555' },
      { mediaName: 'দৈনিক সমকাল', name: 'মোঃ শাকিল', phone: '01718-666666' },
      { mediaName: 'নিউজ২৪', name: 'মোঃ তামিম', phone: '01718-777777' },
      { mediaName: 'জাগো নিউজ', name: 'মোঃ সাকিব', phone: '01718-888888' },
      { mediaName: 'দৈনিক মানবজমিন', name: 'মোঃ রাফি', phone: '01718-999999' },
      { mediaName: 'দৈনিক আমাদের সময়', name: 'মোঃ সাফি', phone: '01718-101010' },
      { mediaName: 'দৈনিক বণিক বার্তা', name: 'মোঃ হাদি', phone: '01718-111112' },
      { mediaName: 'দৈনিক আজকের পত্রিকা', name: 'মোঃ কাফি', phone: '01718-121213' },
      { mediaName: 'দৈনিক ভোরের কাগজ', name: 'মোঃ নাফি', phone: '01718-131314' },
    ],
  },
  // Saghata Upazila (গাইবান্ধা-০৫)
  '33-saghata': {
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'সাঘাটা',
    totalCenters: 52,
    highRiskCenters: 2,
    riskyCenters: 8,
    normalCenters: 42,
    totalVoters: 191440,
    maleVoters: 95101,
    femaleVoters: 95264,
    thirdGenderVoters: 1,
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'মোঃ আশরাফুল কবীর', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭৬', image: UNO_IMAGES.saghata },
    color: '#c2410c',
    candidates: [
      { name: 'মোঃ জাকির হোসেন', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ মোস্তাফিজুর রহমান', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ বেলাল হোসেন', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ আব্দুল মতিন', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ শাহাবুদ্দিন', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ নুরুল হুদা', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ আমিনুল ইসলাম', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ জাফর ইকবাল', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
      { name: 'মোঃ কামাল উদ্দিন', party: 'স্বতন্ত্র', symbol: 'টেবিল ল্যাম্প' },
    ],
    coordinator: [
      { name: 'মোঃ ফয়সাল আহমেদ', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01717-234567' },
    ],
    magistrates: [
      { name: 'মোঃ আতিকুর রহমান', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01718-345678' },
    ],
    committee: [
      { name: 'মোঃ সালাউদ্দিন', designation: 'কমিটি চেয়ারম্যান', mobile: '01719-456789' },
      { name: 'মোঃ আকবর আলী', designation: 'কমিটি সদস্য', mobile: '01719-456790' },
    ],
    vehicles: [
      { vehicleNumber: 'গাই ম ১৬-৩৩৩৩', driverName: 'মোঃ রবিউল', phone: '01716-333333' },
      { vehicleNumber: 'গাই ম ১৬-৩৪৩৪', driverName: 'মোঃ সোহেল', phone: '01716-343434' },
      { vehicleNumber: 'গাই ম ১৬-৩৫৩৫', driverName: 'মোঃ জসিম', phone: '01716-353535' },
      { vehicleNumber: 'গাই ম ১৬-৩৬৩৬', driverName: 'মোঃ কাশেম', phone: '01716-363636' },
      { vehicleNumber: 'গাই ম ১৬-৩৭৩৭', driverName: 'মোঃ আলম', phone: '01716-373737' },
      { vehicleNumber: 'গাই ম ১৬-৩৮৩৮', driverName: 'মোঃ শামীম', phone: '01716-383838' },
      { vehicleNumber: 'গাই ম ১৬-৩৯৩৯', driverName: 'মোঃ তাজুল', phone: '01716-393939' },
      { vehicleNumber: 'গাই ম ১৬-৪০৪০', driverName: 'মোঃ ফজলু', phone: '01716-404040' },
    ],
    observers: [
      { name: 'মোঃ সাত্তার', phone: '01717-777777', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ জব্বার', phone: '01717-787878', organization: 'সুজন' },
      { name: 'মোঃ আক্তার', phone: '01717-797979', organization: 'টিআইবি' },
      { name: 'মোঃ আনোয়ার', phone: '01717-808080', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ মনোয়ার', phone: '01717-818181', organization: 'এফইএমএ' },
      { name: 'মোঃ দিলোয়ার', phone: '01717-828282', organization: 'ওআইসি' },
      { name: 'মোঃ আজহার', phone: '01717-838383', organization: 'ইইউ' },
    ],
    mediaPersonnel: [
      { mediaName: 'গাজীপুর টিভি', name: 'মোঃ জাহিদ', phone: '01718-888888' },
      { mediaName: 'নিউজ২৪', name: 'মোঃ রাশিদ', phone: '01718-898989' },
      { mediaName: 'জাগো নিউজ', name: 'মোঃ ফাহিদ', phone: '01718-909090' },
      { mediaName: 'দৈনিক মানবজমিন', name: 'মোঃ নাহিদ', phone: '01718-919191' },
      { mediaName: 'দৈনিক আমাদের সময়', name: 'মোঃ ওয়াহিদ', phone: '01718-929292' },
      { mediaName: 'দৈনিক বণিক বার্তা', name: 'মোঃ শাহিদ', phone: '01718-939393' },
      { mediaName: 'দৈনিক আজকের পত্রিকা', name: 'মোঃ হামিদ', phone: '01718-949494' },
      { mediaName: 'দৈনিক ভোরের কাগজ', name: 'মোঃ মজিদ', phone: '01718-959595' },
    ],
  },
  // Fulchari Upazila (গাইবান্ধা-০৫)
  '33-fulchari': {
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'ফুলছড়ি',
    totalCenters: 46,
    highRiskCenters: 2,
    riskyCenters: 7,
    normalCenters: 37,
    totalVoters: 171440,
    maleVoters: 85101,
    femaleVoters: 85264,
    thirdGenderVoters: 1,
    ro: { name: 'মোহাম্মদ মাসুদুর রহমান মোল্লা', designation: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট', mobile: '০১৭১৮৪৪৪০৯০' },
    aro: { name: 'মোঃ মোস্তাফিজুর রহমান', designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২৬৯৫০৭৭', image: UNO_IMAGES.fulchari },
    color: '#c2410c',
    candidates: [
      { name: 'মোঃ জাকির হোসেন', party: 'বাংলাদেশ জাতীয়তাবাদী দল', symbol: 'ধানের শীষ' },
      { name: 'মোঃ মোস্তাফিজুর রহমান', party: 'বাংলাদেশ আওয়ামী লীগ', symbol: 'নৌকা' },
      { name: 'মোঃ বেলাল হোসেন', party: 'জাতীয় পার্টি', symbol: 'লাঙ্গল' },
      { name: 'মোঃ আব্দুল মতিন', party: 'জামায়াতে ইসলামী', symbol: 'দাঁড়িপাল্লা' },
      { name: 'মোঃ শাহাবুদ্দিন', party: 'বাংলাদেশ কল্যাণ পার্টি', symbol: 'আম' },
      { name: 'মোঃ নুরুল হুদা', party: 'গণফোরাম', symbol: 'ছাতা' },
      { name: 'মোঃ আমিনুল ইসলাম', party: 'স্বতন্ত্র', symbol: 'চেয়ার' },
      { name: 'মোঃ জাফর ইকবাল', party: 'স্বতন্ত্র', symbol: 'হাতপাখা' },
      { name: 'মোঃ কামাল উদ্দিন', party: 'স্বতন্ত্র', symbol: 'টেবিল ল্যাম্প' },
    ],
    coordinator: [
      { name: 'মোঃ ফয়সাল আহমেদ', designation: 'অতিরিক্ত জেলা প্রশাসক', mobile: '01717-234567' },
    ],
    magistrates: [
      { name: 'মোঃ রেজাউল করিম', designation: 'নির্বাহী ম্যাজিস্ট্রেট', mobile: '01718-345679' },
    ],
    committee: [
      { name: 'মোঃ নুরুল ইসলাম', designation: 'কমিটি চেয়ারম্যান', mobile: '01719-456791' },
      { name: 'মোঃ মোস্তাফিজুর রহমান', designation: 'কমিটি সদস্য', mobile: '01719-456792' },
    ],
    vehicles: [
      { vehicleNumber: 'গাই ম ১৬-৪৪৪৪', driverName: 'মোঃ শফিক', phone: '01716-444444' },
      { vehicleNumber: 'গাই ম ১৬-৪৫৪৫', driverName: 'মোঃ রফিক', phone: '01716-454545' },
      { vehicleNumber: 'গাই ম ১৬-৪৬৪৬', driverName: 'মোঃ তৌফিক', phone: '01716-464646' },
      { vehicleNumber: 'গাই ম ১৬-৪৭৪৭', driverName: 'মোঃ সাদিক', phone: '01716-474747' },
      { vehicleNumber: 'গাই ম ১৬-৪৮৪৮', driverName: 'মোঃ নাজিম', phone: '01716-484848' },
      { vehicleNumber: 'গাই ম ১৬-৪৯৪৯', driverName: 'মোঃ কাজিম', phone: '01716-494949' },
      { vehicleNumber: 'গাই ম ১৬-৫০৫০', driverName: 'মোঃ হাসিম', phone: '01716-505050' },
    ],
    observers: [
      { name: 'মোঃ আনোয়ার', phone: '01717-999999', organization: 'নির্বাচন কমিশন' },
      { name: 'মোঃ তানভীর', phone: '01717-101010', organization: 'সুজন' },
      { name: 'মোঃ শাকির', phone: '01717-111111', organization: 'টিআইবি' },
      { name: 'মোঃ জাকির', phone: '01717-121212', organization: 'ফেয়ার এলেকশন' },
      { name: 'মোঃ নাকির', phone: '01717-131313', organization: 'এফইএমএ' },
      { name: 'মোঃ সাকির', phone: '01717-141414', organization: 'ওআইসি' },
      { name: 'মোঃ হাকির', phone: '01717-151515', organization: 'ইইউ' },
      { name: 'মোঃ বাকির', phone: '01717-161616', organization: 'জাতিসংঘ' },
    ],
    mediaPersonnel: [
      { mediaName: 'মাছরাঙা টিভি', name: 'মোঃ আসিফ', phone: '01718-999999' },
      { mediaName: 'বাংলাদেশ টেলিভিশন', name: 'মোঃ কাসিফ', phone: '01718-101010' },
      { mediaName: 'দৈনিক প্রথম আলো', name: 'মোঃ নাসিফ', phone: '01718-111111' },
      { mediaName: 'চ্যানেল আই', name: 'মোঃ রাসিফ', phone: '01718-121212' },
      { mediaName: 'এনটিভি', name: 'মোঃ তাসিফ', phone: '01718-131313' },
      { mediaName: 'একুশে টেলিভিশন', name: 'মোঃ হাসিফ', phone: '01718-141414' },
      { mediaName: 'দৈনিক যুগান্তর', name: 'মোঃ বাসিফ', phone: '01718-151515' },
      { mediaName: 'সময় টিভি', name: 'মোঃ সাসিফ', phone: '01718-161616' },
      { mediaName: 'আরটিভি', name: 'মোঃ ফাসিফ', phone: '01718-171717' },
    ],
  },
};

export default function ConstituencyDetailScreen() {
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
          <Text style={styles.headerCode}>{data.code}</Text>
          <Text style={styles.headerArea}>{data.areaName}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
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
              image={data.aro.image}
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

        {/* Candidates Section */}
        <View style={styles.sectionsContainer}>
          <CandidatesSection
            title="প্রতিদ্বন্দ্বী প্রার্থী"
            color={data.color}
            candidates={data.candidates}
          />
        </View>

        {/* Map Hardcopy Button */}
        {data.mapLink && (
          <Pressable
            style={({ pressed }) => [
              styles.mapButton,
              { backgroundColor: data.color },
              pressed && { opacity: 0.9 },
            ]}
            onPress={() => Linking.openURL(data.mapLink!)}
          >
            <Ionicons name="map" size={24} color="#ffffff" />
            <Text style={styles.mapButtonText}>{data.areaName} ম্যাপের হার্ডকপি</Text>
            <Ionicons name="open-outline" size={22} color="#ffffff" />
          </Pressable>
        )}

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionGroupTitle}>আরও তথ্য দেখুন</Text>
          
          <ExpandableSection
            title="সমন্বয়কারী কর্মকর্তা"
            subtitle="অতিরিক্ত জেলা প্রশাসক"
            color={data.color}
            data={data.coordinator}
          />
          
          <ExpandableSection
            title="দায়িত্বপ্রাপ্ত এক্সিকিউটিভ ম্যাজিস্ট্রেট"
            subtitle="নির্বাচনকালীন ম্যাজিস্ট্রেটদের তালিকা"
            color={data.color}
            data={data.magistrates}
          />
          
          <ExpandableSection
            title="Electoral Enquiry and Adjudication Committee"
            subtitle="তদন্ত ও বিচার কমিটির সদস্যবৃন্দ"
            color={data.color}
            data={data.committee}
          />
        </View>

        {/* New Data Tables */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionGroupTitle}>অতিরিক্ত তথ্য</Text>
          
          <VehicleTable
            title="অনুমোদিত বাহন"
            color={data.color}
            data={data.vehicles}
          />
          
          <ObserverTable
            title="পর্যবেক্ষক"
            color={data.color}
            data={data.observers}
          />
          
          <MediaTable
            title="গণমাধ্যম কর্মী"
            color={data.color}
            data={data.mediaPersonnel}
          />
        </View>

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
  headerCode: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerArea: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
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
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 16,
  },
  mapButtonText: {
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
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
  // Footer
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});
