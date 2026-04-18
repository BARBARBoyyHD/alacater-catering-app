import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Colors } from '@/src/constants/colors';

const { width } = Dimensions.get('window');

interface PromoBanner {
  id: string;
  title: string;
  image: string;
  overlayText?: string;
}

interface PromoBannerCarouselProps {
  banners: PromoBanner[];
  onBannerPress?: (index: number) => void;
}

export function PromoBannerCarousel({ banners, onBannerPress }: PromoBannerCarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    setActiveIndex(index);
  };

  const renderItem = ({ item, index }: { item: PromoBanner; index: number }) => (
    <TouchableOpacity
      style={styles.banner}
      onPress={() => onBannerPress?.(index)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        {item.overlayText && <Text style={styles.bannerOverlayText}>{item.overlayText}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        snapToInterval={width - 32}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  listContent: {
    gap: 0,
  },
  banner: {
    width: width - 32,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.card,
    lineHeight: 40,
  },
  bannerOverlayText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.card,
    lineHeight: 36,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.card,
  },
});
