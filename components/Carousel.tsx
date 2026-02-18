import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import useFetch from '@/hooks/useFetch'
import { MovieType } from '@/interfaces'
import { fetchMovies } from '@/services/api'

const { width } = Dimensions.get('window')

const AUTO_SCROLL_INTERVAL = 3000

const Carousel = () => {
  const { data: movies } = useFetch<MovieType[]>(() =>fetchMovies({
    query: '',
  }))

  const CAROUSEL_MOVIES = movies?.slice(0, 8) ?? []

  const DATA = useMemo(() => {
    if (CAROUSEL_MOVIES.length === 0) return []
    return [...CAROUSEL_MOVIES, ...CAROUSEL_MOVIES]
  }, [CAROUSEL_MOVIES])

  const flatListRef = useRef<FlatList<MovieType>>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [index, setIndex] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)

  const itemLength = CAROUSEL_MOVIES.length

  const startAutoScroll = () => {
    if (timerRef.current || itemLength <= 1) return

    timerRef.current = setInterval(() => {
      if (isInteracting) return

      setIndex(prev => {
        const next = prev + 1
        flatListRef.current?.scrollToOffset({
          offset: next * width,
          animated: true,
        })
        return next
      })
    }, AUTO_SCROLL_INTERVAL)
  }

  const stopAutoScroll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Start/stop based on data availability
  useEffect(() => {
    stopAutoScroll()
    setIndex(0)

    if (itemLength > 0) {
      // start at 0
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
      })
      startAutoScroll()
    }

    return () => stopAutoScroll()
  }, [itemLength])

  const normalizeIfNeeded = (newIndex: number) => {
    if (itemLength === 0) return

    if (newIndex >= itemLength) {
      const normalized = newIndex - itemLength
      setIndex(normalized)
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToOffset({
          offset: normalized * width,
          animated: false,
        })
      })
    }
  }

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width)
    setIndex(newIndex)
    normalizeIfNeeded(newIndex)
  }

  return (
    <View className="w-full h-full">
      <FlatList
        ref={flatListRef}
        horizontal
        data={DATA}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        snapToAlignment='start'
        decelerationRate="fast"
        bounces={false}
        onMomentumScrollEnd={onMomentumEnd}
        onScrollBeginDrag={() => {
          setIsInteracting(true)
          stopAutoScroll()
        }}
        onScrollEndDrag={() => {
          setTimeout(() => {
            setIsInteracting(false)
            startAutoScroll()
          }, 500)
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width }}>
              <Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
                }}
                className="w-full h-full"
              />
            </View>
          )
        }}
      />
    </View>
  )
}

export default Carousel