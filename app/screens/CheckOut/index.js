import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView, PermissionsAndroid, FlatList} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text, Button, Image} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

import * as ImagePicker from 'react-native-image-picker';

import { Images } from "@config";

export default function CheckOut({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [items, setItems] = useState([]);
  const [taken, setTaken] = useState(false);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  launchCamera = () => {
   
      let options = {
        saveToPhotos: true,
        mediaType: 'photo',
      };
      ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = { uri: response.uri };
          console.log('response', JSON.stringify(response));
          
          setItems(prevState => [...prevState, response.uri]);
          setTaken(true);
        }
      });
      
  }

  launchLibrary = () => {
    let options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        setItems(prevState => [...prevState, response.uri]);
        setTaken(true);
      }
    });
    console.log(taken)
  }


  /**
   *
   * Called when process checkout
   */
  const onCheckOut = () => {
    const bookingType = route.params?.bookingType;
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   switch (bookingType) {
    //     case 'Event':
    //       navigation.navigate('EventTicket');
    //       break;
    //     case 'Bus':
    //       navigation.navigate('BusTicket');
    //       break;
    //     default:
    //       navigation.navigate('PaymentMethod');
    //       break;
    //   }
    // }, 500);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title='Choose Image'
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('reset')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        
          { taken ?
                <FlatList
                columnWrapperStyle={{alignSelf:'center', marginLeft:70, marginRight:70}}
                numColumns={2}
                data={items}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (
                  <Image source={{uri: item}} style={styles.blockImage} />
                
                )}
              />           
              :
              <View style={styles.imagesGroup}>
              <Image source={Images.room7} style={styles.blockImage} />
              </View>
          }
      
          <View>
              <Button  
                full
                style={styles.button}
                onPress={() => this.launchLibrary()}
                >
                  Open Gallery
              </Button>
              <Button  
                full
                style={styles.button}
                onPress={() => this.launchCamera()}
                >
                  Open Camera
              </Button>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Button
            loading={loading}
            full
            onPress={() => {
              onCheckOut();
            }}>
            Save
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
