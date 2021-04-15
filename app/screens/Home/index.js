import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Image,
  Text,
  Icon,
  HotelItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
} from '@components';
import {BaseStyle, Images, useTheme} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import {PromotionData, TourData, HotelData} from '@data';
import {useTranslation} from 'react-i18next';



import axios from 'axios'; 

 

export default function Home({navigation}) {
  
 
    axios.get(`http://172.16.224.151:8080/api/tenant/606c4dee518c262867c748db/informations`)
    .then(res => {
      var allinfo = res.data.rows;
      console.log(res.data.rows);
        });   
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [icons] = useState([
    {
      icon: 'calendar-alt',
      name: 'hotels',
      route: 'Hotel',
    },
    {
      icon: 'map-marker-alt',
      name: 'tours',
      route: 'Hotel',
    },
    {
      icon: 'car-alt',
      name: 'car',
      route: 'Hotel',
    },
    {
      icon: 'plane',
      name: 'flight',
      route: 'Hotel',
    },
    {
      icon: 'ship',
      name: 'cruise',
      route: 'Hotel',
    },
    {
      icon: 'bus',
      name: 'bus',
      route: 'Hotel',
    }, 
    {
      icon: 'star',
      name: 'event',
      route: 'Hotel',
    },
    {
      icon: 'ellipsis-h',
      name: 'more', 
      route: 'Categories',
    },
  ]);
  const [relate] = useState([
    {
      id: '0',
      image: Images.event4,
      title: 'BBC Music Introducing',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
    {
      id: '1',
      image: Images.event5,
      title: 'Bearded Theory Spring Gathering',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
  ]);
  const [promotion] = useState(PromotionData);
  const [tours] = useState(TourData);
  const [hotels] = useState(HotelData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderIconService = () => {
    return ( 
      <FlatList
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}>
              <View
                style={[styles.iconContent, {backgroundColor: colors.card}]}>
                <Icon name={item.icon} size={18} color={colors.primary} solid />
              </View>
              <Text footnote grayColor numberOfLines={1}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={Images.trip3}
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}
      />
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={[
                styles.searchForm,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  shadowColor: colors.border,
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchHistory')}
                activeOpacity={0.9}>
                <View
                  style={[BaseStyle.textInput, {backgroundColor: colors.card}]}>
                  <Text body1 grayColor>
                    {t('what_are_you_looking_for')}
                  </Text>
                </View>
              </TouchableOpacity>
              {renderIconService()}
            </View>
          </View>
         
          {/* Hiking */}
    
    
          {/* Event*/}
    
         
          {/* Promotion */}
          <View style={styles.titleView}>
            <Text title3 semibold>
              {t('Informations')}
            </Text>
           
          </View>
          <FlatList
            columnWrapperStyle={{paddingLeft: 5, paddingRight: 20}}
            numColumns={2}
            data={hotels}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <HotelItem
                grid
                image={item.image}
                name={item.name}
                location={item.location}
                
               
              
             
               
                style={{marginLeft: 15, marginBottom: 15}}
                onPress={() => navigation.navigate('HotelDetail')}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
