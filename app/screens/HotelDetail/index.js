import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  PostListItem,
  HelpBlock,
  Button,
  RoomType,
} from '@components';
import * as Utils from '@utils';
import {InteractionManager} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import {HelpBlockData} from '@data';
import {useTranslation} from 'react-i18next';

export default function HotelDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
    longitudeDelta: 0.004,
  });
  const [roomType] = useState([
    {
      id: '1',
      image: Images.room8,
      name: 'Standard Twin Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
      ],
    },
    {
      id: '2',
      image: Images.room5,
      name: 'Delux Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
      ],
    },
  ]);
  const [todo] = useState([
    {
      id: '1',
      title: 'South Travon',
      image: Images.trip1,
    },
    {
      id: '2',
      title: 'South Travon',
      image: Images.trip2,
    },
    {
      id: '3',
      title: 'South Travon',
      image: Images.trip3,
    },
    {
      id: '4',
      title: 'South Travon',
      image: Images.trip4,
    },
    {
      id: '5',
      title: 'South Travon',
      image: Images.trip5,
    },
  ]);
  const [helpBlock] = useState(HelpBlockData);
  const deltaY = new Animated.Value(0);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={Images.room6}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(200),
                Utils.scaleWithPixel(200),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        {/* Header */}
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.whiteColor}
                enableRTL={true}
              />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="images" size={20} color={BaseColor.whiteColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('PreviewImage');
          }}
        />
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
          {/* Main Container */}
          <View style={{paddingHorizontal: 20}}>
            {/* Information */}
            <View
              style={[
                styles.contentBoxTop,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}>
              <Text title2 semibold style={{marginBottom: 5}}>
                Hilton San Francisco
              </Text>
            
              <Text
                body2
                style={{
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                Facilities provided may range from a modest quality mattress in
                a small room to large suites
              </Text>
            </View>
            {/* Rating Review */}
         
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline semibold>
                {t('Adresse_description')}
              </Text>
              <Text body2 style={{marginTop: 5}}>
                218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor
                incididunt ut labore et dolore
              </Text>
            </View>
            {/* Facilities Icon */}
       
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline style={{marginBottom: 5}} semibold>
                {t('location')}
              </Text>
              <Text body2 numberOfLines={2}>
                218 Austen Mountain, consectetur adipiscing, sed do eiusmod
                tempor incididunt ut labore et …
              </Text>
              <View
                style={{
                  height: 180,
                  width: '100%',
                  marginTop: 10,
                }}>
                {renderMapView && (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                    onRegionChange={() => {}}>
                    <Marker
                      coordinate={{
                        latitude: 1.9344,
                        longitude: 103.358727,
                      }}
                    />
                  </MapView>
                )}
              </View>
            </View>
            {/* Open Time */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline semibold>
                {t('good_to_know')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text body2 grayColor>
                    {t('check_in_from')}
                  </Text>
                  <Text body2 accentColor semibold>
                    15:00
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text body2 grayColor>
                    {t('check_out_from')}
                  </Text>
                  <Text body2 accentColor semibold>
                    15:00
                  </Text>
                </View>
              </View>
            </View>
            {/* Rooms */}
 
            {/* Todo Things */}
        
            {/* Help Block Information */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <HelpBlock
                title={helpBlock.title}
                description={helpBlock.description}
                phone={helpBlock.phone}
                email={helpBlock.email}
                style={{margin: 20}}
                onPress={() => {
                  navigation.navigate('ContactUs');
                }}
              />
            </View>
            {/* Other Information */}
            {/* <View style={{paddingVertical: 10}}>
              <Text headline semibold>
                4 Reason To Choose Us
              </Text>
              <View style={styles.itemReason}>
                <Icon name="map-marker-alt" size={18} color={colors.accent} />
                <View style={{marginLeft: 10}}>
                  <Text subhead semibold>
                    Good Location
                  </Text>
                  <Text body2>
                    Andaz Tokyo Toranomon Hills is one of the newest luxury
                    hotels in Tokyo. Located in one of the uprising areas of
                    Tokyo
                  </Text>
                </View>
              </View>
              <View style={styles.itemReason}>
                <Icon name="pagelines" size={18} color={colors.accent} />
                <View style={{marginLeft: 10}}>
                  <Text subhead semibold>
                    Great Food
                  </Text>
                  <Text body2>
                    Excellent cuisine, typical dishes from the best Romagna
                    tradition and more!
                  </Text>
                </View>
              </View>
              <View style={styles.itemReason}>
                <Icon name="servicestack" size={18} color={colors.accent} />
                <View style={{marginLeft: 10}}>
                  <Text subhead semibold>
                    Private Beach
                  </Text>
                  <Text body2>
                    Excellent cuisine, typical dishes from the best Romagna
                    tradition and more!
                  </Text>
                </View>
              </View>
              <View style={styles.itemReason}>
                <Icon name="trophy" size={18} color={colors.accent} />
                <View style={{marginLeft: 10}}>
                  <Text subhead semibold>
                    5 Stars Hospitality
                  </Text>
                  <Text body2>Romagna hospitality, typical and much</Text>
                </View>
              </View>
            </View> */}
          </View>
        </ScrollView>
        {/* Pricing & Booking Process */}
    
      </SafeAreaView>
    </View>
  );
}
