import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView, PermissionsAndroid, FlatList} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text, Button, Image} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

import * as ImagePicker from 'react-native-image-picker';

import VideoPlayer from 'react-native-video-player';
import * as MediaLibrary from '@pontusab/react-native-media-library';

import { Images } from "@config";

export default function More({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [items, setItems] = useState('');
  const [taken, setTaken] = useState(false);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  launchCamera = () => {
   
      let options = {
        mediaType: 'video',
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
          
          setItems(response.uri);
          const asset = MediaLibrary.createAssetAsync(response.uri);
          setTaken(true);
        }
      });
      
  }

  launchLibrary = () => {
    let options = {
      mediaType: 'video',
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
        setItems(response.uri);
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
  
    navigation.goBack();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title='Choose Video'
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
                <VideoPlayer                  
                video={{ uri: items }}  
                disableFullscreen              
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
