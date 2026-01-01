import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

interface OfficerCardProps {
  title: string;
  name?: string;
  designation?: string;
  mobile?: string;
  color?: string;
  image?: ImageSourcePropType;
}

export function OfficerCard({
  title,
  name = 'নাম লোড হচ্ছে...',
  designation = '',
  mobile = '',
  color = '#059669',
  image,
}: OfficerCardProps) {
  const handleCall = () => {
    if (mobile) {
      // Remove any non-numeric characters except + for international format
      const cleanNumber = mobile.replace(/[^0-9+]/g, '');
      Linking.openURL(`tel:${cleanNumber}`);
    }
  };

  return (
    <View style={[styles.card, { borderColor: color }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerText}>{title}</Text>
      </View>

      {/* Photo */}
      <View style={styles.photoContainer}>
        {image ? (
          <Image 
            source={image} 
            style={[styles.photo, { borderColor: color }]}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.photoPlaceholder, { borderColor: color }]}>
            <Ionicons name="person" size={40} color={color} />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        {designation ? (
          <Text style={styles.designation} numberOfLines={2}>{designation}</Text>
        ) : null}
        {mobile ? (
          <Pressable 
            style={({ pressed }) => [
              styles.callButton,
              { backgroundColor: color },
              pressed && styles.callButtonPressed,
            ]}
            onPress={handleCall}
          >
            <Ionicons name="call" size={16} color="#ffffff" />
            <Text style={styles.callButtonText}>{mobile}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    maxWidth: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
  },
  photoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingBottom: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 3,
  },
  designation: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 3,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  callButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  callButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
});
