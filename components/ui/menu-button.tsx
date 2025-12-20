import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuButtonProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress?: () => void;
}

export function MenuButton({
  title,
  subtitle,
  badge,
  icon = 'chevron-forward',
  color = '#059669',
  onPress,
}: MenuButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#ffffff" />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {badge && (
            <View style={[styles.badge, { backgroundColor: color }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Chevron */}
      <Ionicons name="chevron-forward" size={24} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
