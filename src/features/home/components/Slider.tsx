// src/ui/components/Carousel.tsx
import React, {
    useEffect,
    useRef,
    useState,
    memo,
    forwardRef,
    useImperativeHandle,
} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    LayoutChangeEvent,
    ImageSourcePropType,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { getProportionalFontSize } from '@/ui/theme/typography';

export type CarouselItem = {
    image?: ImageSourcePropType | { uri: string };
    text?: string;
    secondaryText?: string;
};

export type CarouselRef = {
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    play: () => void;
    pause: () => void;
};

type CarouselProps = {
    data?: CarouselItem[];
    autoScrollInterval?: number; // ms
    autoPlay?: boolean;          // default true if >1 item
    loop?: boolean;              // default true
    initialIndex?: number;       // default 0
    height?: number;             // fixed height if you want
    style?: StyleProp<ViewStyle>;
    onIndexChange?: (index: number) => void;
    // Optional custom renderer:
    renderItem?: (item: CarouselItem, index: number, active: boolean) => React.ReactNode;
};

const Slider = forwardRef<CarouselRef, CarouselProps>(({
    data = [],
    autoScrollInterval = 3000,
    autoPlay,
    loop = true,
    initialIndex = 0,
    height,
    style,
    onIndexChange,
    renderItem,
}, ref) => {
    const [activeIndex, setActiveIndex] = useState(Math.max(0, Math.min(initialIndex, Math.max(0, data.length - 1))));
    const [viewportWidth, setViewportWidth] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(false);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const totalItems = data.length;
    const shouldAutoPlay = autoPlay ?? totalItems > 1;

    const onContainerLayout = (e: LayoutChangeEvent) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && w !== viewportWidth) setViewportWidth(w);
    };

    const updateActive = (index: number) => {
        setActiveIndex(index);
        onIndexChange?.(index);
    };

    const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x;
        const index = viewportWidth ? Math.round(x / viewportWidth) : 0;
        updateActive(index);
    };

    const goTo = (index: number) => {
        if (!totalItems || viewportWidth === 0) return;
        const clamped = Math.max(0, Math.min(index, totalItems - 1));
        scrollViewRef.current?.scrollTo({ x: clamped * viewportWidth, animated: true });
        updateActive(clamped);
    };

    const next = () => {
        if (!totalItems) return;
        const nextIndex = activeIndex + 1;
        if (nextIndex < totalItems) {
            goTo(nextIndex);
        } else if (loop) {
            goTo(0);
        }
    };

    const prev = () => {
        if (!totalItems) return;
        const prevIndex = activeIndex - 1;
        if (prevIndex >= 0) {
            goTo(prevIndex);
        } else if (loop) {
            goTo(totalItems - 1);
        }
    };

    useImperativeHandle(ref, () => ({
        next,
        prev,
        goTo,
        play: () => setPaused(false),
        pause: () => setPaused(true),
    }), [activeIndex, totalItems, viewportWidth, loop]);

    // Autoplay
    useEffect(() => {
        if (!shouldAutoPlay || paused || totalItems <= 1 || viewportWidth === 0) return;
        const id = setInterval(() => next(), Math.max(800, autoScrollInterval));
        return () => clearInterval(id);
    }, [shouldAutoPlay, paused, totalItems, viewportWidth, activeIndex, autoScrollInterval]);

    // If data changes (dynamic), keep index in range
    useEffect(() => {
        if (activeIndex > totalItems - 1) {
            updateActive(Math.max(0, totalItems - 1));
        }
    }, [totalItems]); // eslint-disable-line react-hooks/exhaustive-deps

    if (totalItems === 0) return null;

    return (
        <View
            onLayout={onContainerLayout}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleMomentumEnd}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={viewportWidth || undefined}
                snapToAlignment="start"
            >
                {data.map((item, index) => (
                    <View key={index} style={[styles.slide, { width: viewportWidth || '100%' }]}>
                        {renderItem ? (
                            renderItem(item, index, index === activeIndex)
                        ) : (
                            <>
                                {!!item.image && (
                                    <Image source={item.image} resizeMode="cover" style={styles.image} />
                                )}
                            </>
                        )}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.pagination} accessible accessibilityLabel={`Slide ${activeIndex + 1} of ${totalItems}`}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, activeIndex === index && styles.activeDot]}
                    />
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: { 
        width: '100%',
        height: 150,
    },
    textBox: { 
        alignItems: 'center' 
    },
    pagination: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: Colors.grey,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: Colors.secondary,
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

export default memo(Slider);
