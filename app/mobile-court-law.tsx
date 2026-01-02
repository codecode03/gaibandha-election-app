import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MobileCourtLawScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" backgroundColor="#0891b2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>মোবাইল কোর্ট আইন</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleIconContainer}>
            <LinearGradient
              colors={['#0891b2', '#06b6d4']}
              style={styles.titleIconGradient}
            >
              <Ionicons name="document-text" size={32} color="#ffffff" />
            </LinearGradient>
          </View>
          <Text style={styles.titleText}>মোবাইল কোর্ট আইন, ২০০৯</Text>
          <Text style={styles.subtitleText}>আইন ও বিধিমালা সমূহ</Text>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          <Text style={styles.contentText}>
            মোবাইল কোর্ট আইন, ২০০৯ আইন শৃঙ্খলা রক্ষা এবং অপরাধ প্রতিরোধ কার্যক্রমকে কার্যকর ও অধিকতর দক্ষতার সহিত সম্পাদন করিবার জন্য মোবাইল কোর্ট পরিচালনার উদ্দেশ্যে প্রয়োজনীয় বিধান করিবার লক্ষ্যে প্রণীত আইন যেহেতু জনস্বার্থে, আইন শৃঙ্খলা রৰা এবং অপরাধ প্রতিরোধ কার্যক্রমকে কার্যকর ও অধিকতর দক্ষতার সহিত সম্পাদন করিবার জন্য এক্সিকিউটিভ ম্যাজিস্ট্রেটকে কতিপয় অপরাধ তাৎৰণিকভাবে ঘটনাস্থলে আমলে গ্রহণ করিয়া দন্ড আরোপের সীমিত ৰমতা অর্পণ করিয়া মোবাইল কোর্টপরিচালনার লক্ষ্যে বিধান করা সমীচীন ও প্রয়োজনীয়; সেহেতু এতদ্বারা নিম্নরূপ আইন করা হইল :-
          </Text>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>সংক্ষিপ্ত শিরোনাম, প্রবর্তন ও প্রয়োগ</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> এই আইন মোবাইল কোর্ট আইন, ২০০৯ নামে অভিহিত হইবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> ইহা অবিলম্বে কার্যকর হইবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> সমগ্র বাংলাদেশে ইহার প্রয়োগ হইবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>সংজ্ঞা</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>২।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                বিষয় বা প্রসঙ্গের পরিপন্থী কোন কিছু না থাকিলে, এই আইনে-
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> অতিরিক্ত দায়রা জজ অর্থ ফৌজদারী কার্যবিধিতে উল্লিখিত অতিরিক্ত দায়রা জজ; এবং মেট্রোপলিটন এলাকার অতিরিক্ত দায়রা জজও উহার অন্তর্ভূক্ত হইবে;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> এক্সিকিউটিভ ম্যাজিস্ট্রেট অর্থ ফৌজদারী কার্যবিধিতে উল্লিখিত এক্সিকিউটিভ ম্যাজিস্ট্রেট;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> জুডিসিয়াল ম্যাজিস্ট্রেট অর্থ ফৌজদারী কার্যবিধিতে উল্লিখিত জুডিসিয়াল ম্যাজিস্ট্রেট;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৪)</Text> ডিস্ট্রিক্ট ম্যাজিস্ট্রেট অর্থ ফৌজদারী কার্যবিধিতে উল্লিখিত ডিস্ট্রিক্ট ম্যাজিস্ট্রেট; এবং অতিরিক্ত ডিস্ট্রিক্ট ম্যাজিস্ট্রেটও উহার অন্তর্ভূক্ত হইবেন;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৫)</Text> তফসিল অর্থ এই আইনের তফসিল;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৬)</Text> দায়রা জজ অর্থ ফৌজদারী কার্যবিধিতে উল্লিখিত দায়রা জজ; এবং মেট্রোপলিটন এলাকার দায়রা জজও উহার অন্তর্ভুক্ত হইবে;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৭)</Text> ফৌজদারী কার্যবিধি অর্থ Code of Criminal Procedure, 1898 (Act V of 1898);
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৮)</Text> মেট্রোপলিটন ম্যাজিস্ট্রেট অর্থ ফৌজদারী কার্যবিধিতে উল্লিখিত মেট্রোপলিটন ম্যাজিস্ট্রেট;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৯)</Text> মেট্রোপলিটন এলাকা অর্থ কোন আইনের অধীন ঘোষিত মেট্রোপলিটন এলাকা;
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১০)</Text> মোবাইল কোর্ট অর্থ ধারা ৪ এ উল্লিখিত মোবাইল কোর্ট।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>আইনের প্রাধান্য</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>৩।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                আপাততঃ বলবৎ অন্য কোন আইনে ভিন্নতর যাহা কিছুই থাকুক না কেন, এই আইনের বিধানাবলী কার্যকর হইবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>মোবাইল কোর্ট</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>৪।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                আইন শৃঙ্খলা রৰা এবং অপরাধ প্রতিরোধ কার্যক্রমকে দক্ষতার সহিত সম্পাদন করিবার স্বার্থে আবশ্যক ক্ষেত্রে কতিপয় অপরাধ তাৎক্ষণিকভাবে ঘটনাস্থলে আমলে গ্রহণ করিয়া দন্ড আরোপের সীমিত ক্ষমতা প্রয়োগের উদ্দেশ্যে সমগ্র দেশে কিংবা যে কোন জেলা বা মেট্রোপলিটন এলাকায় ভ্রাম্যমান কার্যক্রম পরিচালিত হইবে যাহা মোবাইল কোর্ট নামে অভিহিত হইবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>মোবাইল কোর্ট পরিচালনার ক্ষমতা অর্পণ</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>৫।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                সরকার সমগ্র দেশে কিংবা যে কোন জেলা বা মেট্রোপলিটন এলাকায় যে কোন এক্সিকিউটিভ ম্যাজিস্ট্রেটকে, এবং ডিস্ট্রিক্ট ম্যাজিস্ট্রেট তাহার আঞ্চলিক অধিক্ষেত্রে যে কোন এক্সিকিউটিভ ম্যাজিস্ট্রেটকে, আইন শৃঙ্খলা রৰা এবং অপরাধ প্রতিরোধ কার্যক্রম সম্পাদনের উদ্দেশ্যে লিখিত আদেশ দ্বারা মোবাইল কোর্ট পরিচালনা করিবার ক্ষমতা অর্পণ করিতে পারিবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>মোবাইল কোর্টের ক্ষমতা</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>৬।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> ধারা ৫ এর অধীন ক্ষমতাপ্রাপ্ত এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ধারা ১১ এর অধীন ক্ষমতাপ্রাপ্ত ডিস্ট্রিক্ট ম্যাজিস্ট্রেট আইন শৃংখলা রক্ষা ও অপরাধ প্রতিরোধ কার্যক্রম পরিচালনা করিবার সময় তফসিলে বর্ণিত আইনের অধীন কোন অপরাধ, যাহা কেবল জুডিসিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট কর্তৃক বিচার্য, তাহার সম্মুখে সংঘটিত বা উদ্ঘাটিত হইয়া থাকিলে তিনি উক্ত অপরাধ তাৎক্ষণিকভাবে ঘটনাস্থলেই আমলে গ্রহণ করিয়া অভিযুক্ত ব্যক্তিকে, স্বীকারোক্তির ভিত্তিতে, দোষী সাব্যস্ত করিয়া, এই আইনের নির্ধারিত দন্ড আরোপ করিতে পারিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> তফসিলে বর্ণিত কোন আইনের অধীন প্রণীত বিধি, প্রবিধি বা আদেশের অধীন কোন অপরাধ উক্ত আইনের অধীন অপরাধ বলিয়া গণ্য হইবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> তফসিলে বর্ণিত কোন আইনের অধীন কোন অপরাধ কোন্ আদালত বা ট্রাইবু্যনাল কর্তৃক বিচার্য হইবে তাহা উক্ত আইনে নির্ধারণ করা না থাকিলে, ফৌজদারী কার্যবিধির ধারা ২৯ এর সংশ্লিষ্ট দ্বিতীয় তফসিলের অষ্টম কলাম অনুযায়ী নির্ধারিত আদালত কর্তৃক উক্ত অপরাধ বিচার্য বলিয়া গণ্য হইবে এবং যদি অনুরূপ কোন অপরাধ বিচার করিবার এখতিয়ার মেট্রোপলিটন ম্যাজিস্ট্রেট এবং প্রথম, দ্বিতীয় বা তৃতীয় শ্রেণীর জুডিসিয়াল ম্যাজিস্ট্রেটের না থাকে, তাহা হইলে উক্ত অপরাধ, তফসিলে বর্ণিত আইনের অধীন অপরাধ হওয়া সত্ত্বেও, এই আইনের অধীন আমলে গ্রহণ করিয়া দন্ড আরোপ করিবার এখতিয়ার এই আইনের অধীন মোবাইল কোর্ট পরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেটের থাকিবে না।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৪)</Text> মোবাইল কোর্ট পরিচালনা করিবার সময় যদি অনুরূপ কোর্ট পরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেটের নিকট এইরূপ মনে হয় যে, অপরাধ স্বীকারকারী ব্যক্তির সংশ্লিষ্ট অপরাধ এমন গুরুতর যে, এই আইনের অধীন নির্ধারিত দন্ড আরোপ করা হইলে উহা যথোপযুক্ত দন্ডারোপ হইবে না, তাহা হইলে তিনি উক্ত ব্যক্তিকে দন্ডআরোপ না করিয়া তাহার বিরুদ্ধে নিয়মিত মামলা দায়েরের ব্যবস্থা করিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৫)</Text> মোবাইল কোর্ট পরিচালনা করিবার সময় যদি এইরূপ কোন অপরাধ এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট এর সন্মুখে সংঘটিত বা উদ্ঘাটিত হয়, যাহা সেশন আদালত কিংবা অন্য কোন উচ্চতর বা বিশেষ আদালত বা ট্রাইবু্যনাল কর্তৃক বিচার্য, তাহা হইলে মোবাইল কোর্টপরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট উক্ত অপরাধের সহিত সংশ্লিষ্ট ব্যক্তির বিরম্নদ্ধে অভিযোগ এজাহার হিসাবে গণ্য করিবার জন্য সংশ্লিষ্ট থানার ভারপ্রাপ্ত কর্মকর্তাকে নির্দেশ প্রদান করিবেন।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>মোবাইল কোর্টের পরিচালনা পদ্ধতি</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>৭।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> এই আইনের অধীন মোবাইল কোর্টপরিচালনা করিবার সময় কোন ব্যক্তির বিরুদ্ধে অপরাধ আমলে গৃহীত হইবার পরপরই মোবাইল কোর্টপরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট সংক্ষিপ্ত অভিযোগ লিখিতভাবে গঠন করিয়া উহা অভিযুক্ত ব্যক্তিকে পাঠ ও ব্যাখ্যা করিয়া শুনাইবেন এবং অভিযুক্ত ব্যক্তি গঠিত অভিযোগ স্বীকার করেন কি না তাহা জানিতে চাহিবেন এবং স্বীকার না করিলে তিনি কেন স্বীকার করেন না উহার বিস্তারিত ব্যাখ্যা জানিতে চাহিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> অভিযুক্ত ব্যক্তি অভিযোগ স্বীকার করিলে তাহার স্বীকারোক্তি লিপিবদ্ধ করিয়া উহাতে অভিযুক্তের স্বাক্ষর বা ক্ষেত্রমত, টিপসই এবং দুইজন উপস্থিত স্বাক্ষীর স্বাক্ষর বা, ক্ষেত্রমত, টিপসই গ্রহণ করিতে হইবে; এবং অতঃপর মোবাইল কোর্ট পরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট তাহার বিবেচনায় যথোপযুক্ত দন্ড আরোপ করিয়া লিখিত আদেশ প্রদান করিবেন এবং উক্ত আদেশে স্বাক্ষর করিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> অভিযোগ অস্বীকার করিয়া আত্মপক্ষ সমর্থনে অভিযুক্ত ব্যক্তি কর্তৃক প্রদত্ত ব্যাখ্যা সন্তোষজনক হইলে, মোবাইল কোর্ট পরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট তাহাকে অভিযোগ হইতে অব্যাহতি প্রদান করিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৪)</Text> অভিযুক্ত ব্যক্তি কর্তৃক উপ-ধারা (৩) এর অধীন প্রদত্ত ব্যাখ্যা সন্তোষজনক না হইলে মোবাইল কোর্ট পরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট অভিযোগটি বিচারার্থে উপযুক্ত এখতিয়ার সম্পন্ন আদালতে প্রেরণ করিবেন।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>দন্ড আরোপের সীমাবদ্ধতা</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>৮।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> এই আইনের অধীন মোবাইল কোর্টপরিচালনা করিয়া দন্ড আরোপ করিবার ক্ষেত্রে, সংশ্লিষ্ট অপরাধের জন্য সংশ্লিষ্ট আইনে যে দন্ডই নির্ধারিত থাকুক না কেন, দুই বছর এর অধিক কারাদন্ড এই আইনের অধীন আরোপ করা যাইবে না।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> সংশ্লিষ্ট অপরাধের জন্য সংশিস্নষ্ট আইনে যে অর্থদন্ড নির্ধারিত রহিয়াছে উক্ত অর্থদন্ড বা অর্থদন্ডে নির্ধারিত সীমার মধ্যে যে কোন পরিমাণ অর্থদন্ড আরোপ করা যাইবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> ফৌজদারী কার্যবিধির অধীন যে পদ্ধতিতে অর্থদন্ড ও কারাদন্ড আদায়যোগ্য বা আরোপনীয় হইয়া থাকে, এই আইনের অধীন অর্থদন্ড ও কারাদন্ড অনুরূপ পদ্ধতিতে আদায়যোগ্য ও আরোপনীয় হইবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>অর্থদন্ড আদায় সম্পর্কিত বিধান</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>৯।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> এই আইনের অধীন কোন অভিযুক্তকে ঘটনাস্থলে দোষী সাব্যস্ত করিয়া কেবল অর্থদন্ড আরোপ করা হইলে উক্ত অর্থদন্ডে নির্ধারিত টাকা তাৎক্ষণিকভাবে আদায়যোগ্য হইবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> আরোপিত অর্থদন্ড তাৎক্ষণিকভাবে আদায় করা না হইলে অনাদায়ে আরোপিত কারাদন্ড তাৎক্ষণিকভাবে কার্যকর হইবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> অর্থদন্ড তাৎক্ষণিকভাবে আদায় করিতে ব্যর্থতার কারণে আরোপনীয় বিনাশ্রম কারাদন্ড তিন মাসের অধিক হইবে না।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৪)</Text> কারাদন্ড ভোগ করিবার সময় অভিযুক্তের পক্ষে অর্থদন্ডের সমুদয় অর্থ আদায় করা হইলে অভিযুক্ত কারাবাস হইতে তাৎক্ষণিকভাবে মুক্তিলাভ করিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৫)</Text> এই ধারার অধীন অর্থদন্ড আদায় করিতে ব্যর্থতার কারণে আরোপিত কারাদন্ড আংশিক বা সম্পূর্ণ ভোগ করিবার কারণে অর্থদন্ডে সংশ্লিষ্ট অর্থ আদায় অযোগ্য হইবে না; এবং এই ক্ষেত্রে Penal Code, 1860 এর ধারা ৬৪ হইতে ৭০ এর বিধানাবলী, যথানিয়ম, প্রযোজ্য হইবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>দোবারা বিচার ও শাস্তি নিষেধ</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১০।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                এই আইনের অধীন দন্ডপ্রাপ্ত কোন ব্যক্তিকে একই অপরাধে পুনর্বার বিচার করা কিংবা দন্ড আরোপ করা যাইবে না এবং অনুরূপ ক্ষেত্রে ফৌজদারী কার্যবিধির ধারা ৪০৩ এর বিধান প্রযোজ্য হইবে :
              </Text>
              <Text style={styles.pointText}>
                তবে শর্ত থাকে যে, ধারা ৭ এর উপ-ধারা (৩) এর অধীন অভিযোগ হইতে অব্যাহতিপ্রাপ্ত ব্যক্তি ফৌজদারী কার্যবিধির ধারা ৪০৩ এর অর্থে নির্দোষ সাব্যস্ত (acquitted) বলিয়া গণ্যহইবেন না।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>ডিস্ট্রিক্ট ম্যাজিস্ট্রেট কর্তৃক ক্ষমতা প্রয়োগ</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১১।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                ডিস্ট্রিক্ট ম্যাজিস্ট্রেটগণের তাহাদের স্ব স্বআঞ্চলিক অধিক্ষেত্রে এই আইনের অধীন মোবাইল কোর্ট পরিচালনা করিয়া দন্ড আরোপের ক্ষমতা থাকিবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>মোবাইল কোর্ট পরিচালনার ক্ষেত্রে পুলিশ, আইন শৃঙ্খলা রক্ষাকারী বাহিনী বা সংশ্লিষ্ট সরকারী কোন সংস্থা বা প্রতিষ্ঠানের সহায়তা প্রদানের বাধ্যবাধকতা</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১২।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> এই আইনের অধীন মোবাইল কোর্ট পরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট পুলিশ বাহিনী, আইন শৃঙ্খলা রক্ষাকারী বাহিনী বা সংশ্লিষ্ট সরকারী কোন সংস্থা বা প্রতিষ্ঠানের সহায়তা চাহিলে পুলিশ বাহিনী, আইন শৃঙ্খলা রক্ষাকারী বাহিনী বা সংশ্লিষ্ট সরকারী কোন সংস্থা বা প্রতিষ্ঠান অনুরূপ সহায়তাপ্রদান করিবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> মোবাইল কোর্ট পরিচালনার ক্ষেত্রে, উক্ত মোবাইল কোর্ট পরিচালনাকারী সরকারী কর্মকর্তা, এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট এর সংশ্লিষ্ট অপরাধ সংশ্লেষে তল্লাশি (search), জব্দ (seizure) এবং প্রয়োজনে জব্দকৃত পচনশীল বা বিপদজনক (hazardous) বস্তু বিলিবন্দেজ (disposal) করিবার ক্ষমতা থাকিবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> উপ-ধারা (২) এর অধীন ক্ষমতা প্রয়োগের ক্ষেত্রে ফৌজদারী কার্যবিধির সংশ্লিষ্ট বিধান, যতদূর সম্ভব, অনুসরণ করিতে হইবে৷
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>আপীল</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১৩।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> এই আইনের অধীন আরোপিত দন্ড দ্বারা সংক্ষুব্ধ ব্যক্তি, সংশ্লিষ্ট আঞ্চলিক অধিক্ষেত্রের ডিস্ট্রিক্ট ম্যাজিস্ট্রেট এর নিকট আপীল দায়ের করিতে পারিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> ডিস্ট্রিক্ট ম্যাজিস্ট্রেট নিজে উক্ত আপীল শুনানী ও নিষ্পত্তি করিবেন অথবা তাঁহার অধীনস্ত যে কোন অতিরিক্ত ডিস্ট্রিক্ট ম্যাজিস্ট্রেট এর নিকট উহা শুনানী ও নিষ্পত্তির জন্য প্রেরণ করিতে পারিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৩)</Text> ডিস্ট্রিক্ট ম্যাজিস্ট্রেট কিংবা অতিরিক্ত ডিস্ট্রিক্ট ম্যাজিস্ট্রেট কর্তৃক প্রদত্ত দন্ডাদেশের বিরুদ্ধে আপীল সংশ্লিষ্ট অধিক্ষেত্রের দায়রা জজের নিকট দায়ের করিতে হইবে, এবং দায়রা জজ নিজে উক্ত আপীল শুনানী ও নিষ্পত্তি করিবেন কিংবা কোন অতিরিক্ত দায়রা জজের নিকট উক্ত আপীল শুনানী ও নিষ্পত্তির জন্য প্রেরণ করিবেন।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৪)</Text> এই ধারার অধীন আপীল নিষ্পত্তির ক্ষেত্রে ফৌজদারী কার্যবিধির অধ্যায় ৩১ এর বিধানাবলী, যতদূর সম্ভব, প্রয়োজনীয় অভিযোজনসহকারে প্রযোজ্য হইবে।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(৫)</Text> এই ধারার অধীন দায়েরকৃত আপীল ফৌজদারী কার্যবিধির কেবল ধারা ৪১২ এর নির্ধারিত পরিসরে সীমিত থাকিবে।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>সরল বিশ্বাসে কৃত কার্য রক্ষণ</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১৪।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                এই আইন বা তদধীন প্রণীত বিধির অধীন সরল বিশ্বাসে কৃত, বা কৃত বলিয়া বিবেচিত, কোন কার্যের জন্য কোন ব্যক্তি ক্ষতিগ্রস্ত হইলে তিনি মোবাইল কোর্ট পরিচালনাকারী এক্সিকিউটিভ ম্যাজিস্ট্রেট বা ডিস্ট্রিক্ট ম্যাজিস্ট্রেট বা মোবাইল কোর্ট পরিচালনার সহিত সংশ্লিষ্ট অন্য কোন কর্মকর্তা বা কর্মচারীর বিরুদ্ধে কোন দেওয়ানী বা ফৌজদারী মামলা বা অন্য কোন প্রকার আইনগত কার্যধারা রুজু করিতে পারিবেন না।
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>তফসিল সংশোধনের ক্ষমতা</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১৫।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                সরকার, সরকারী গেজেটে প্রজ্ঞাপন দ্বারা, তফসিল সংশোধন করিতে পারিবে৷
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>বিধি প্রণয়নের ক্ষমতা</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১৬।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                সরকার এই আইনের উদ্দেশ্য পূরণকল্পে, সরকারী গেজেটে প্রজ্ঞাপন দ্বারা, বিধি প্রণয়ন করিতে পারিবে৷
              </Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>রহিতকরণ ও হেফাজত</Text>
          
          <View style={styles.lawPoint}>
            <Text style={styles.pointNumber}>১৭।</Text>
            <View style={styles.pointContent}>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(১)</Text> মোবাইল কোর্ট অধ্যাদেশ, ২০০৯ (২০০৯ সনের ৬ নং অধ্যাদেশ) এতদ্দ্বারা রহিত করা হইল।
              </Text>
              <Text style={styles.pointText}>
                <Text style={styles.subPointNumber}>(২)</Text> অনুরূপ রহিতকরণ সত্ত্বেও, রহিত অধ্যাদেশ এর অধীন কৃত কোন কাজ কর্ম, গৃহীত কোন ব্যবস্থা বা কার্যধারা এই আইনের অধীন কৃত বা গৃহীত হইয়াছে বলিয়া গণ্য হইবে।
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0891b2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#0891b2',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  content: {
    flex: 1,
    backgroundColor: '#ecfeff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  titleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  titleIconContainer: {
    marginBottom: 16,
  },
  titleIconGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contentText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 26,
    textAlign: 'justify',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0891b2',
    marginBottom: 16,
  },
  lawPoint: {
    flexDirection: 'row',
  },
  pointNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginRight: 8,
    minWidth: 24,
  },
  pointContent: {
    flex: 1,
  },
  pointText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 26,
    marginBottom: 8,
  },
  subPointNumber: {
    fontWeight: '600',
    color: '#0891b2',
  },
});

