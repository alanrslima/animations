import React, {useRef} from 'react';
import styles from './styles';
import {
  Text,
  View,
  StatusBar,
  Image,
  Animated,
  findNodeHandle,
} from 'react-native';

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Tab = React.forwardRef(({item}, ref) => {
  return (
    <View ref={ref}>
      <Text style={[styles.tabText, {fontSize: 84 / data.length}]}>
        {item.title}
      </Text>
    </View>
  );
});

const Indicator = () => {
  return <View style={styles.containerIndicator} />;
};

const Tabs = ({data, scrollX}) => {
  const containerRef = React.useRef();

  React.useEffect(() => {
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          console.log(x, y, width, height);
        },
      );
    });
  });
  return (
    <View style={styles.containerTabs}>
      <View ref={containerRef} style={styles.contentTabs}>
        {data.map((item) => {
          return <Tab key={item.key} item={item} ref={item.ref} />;
        })}
      </View>
      <Indicator />
    </View>
  );
};

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        bounces={false}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <View style={styles.containerImage}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.wrapper} />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} />
    </View>
  );
}
