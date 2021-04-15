import React, {useState} from 'react';
import {BaseStyle, useTheme} from '@config';
import {MessagesData} from '@data';
import {useTranslation} from 'react-i18next';

import {ScrollView, View, FlatList} from 'react-native';
import {Header, SafeAreaView, TextInput, Icon, Text, Button, Image, HotelItem} from '@components';
import  {styles}  from './styles';


import { Card, Divider, Input } from 'react-native-elements';
import { Title, FAB, Portal, Provider } from 'react-native-paper';

import { Images } from "@config";

// import Icon from 'react-native-vector-icons/FontAwesome';

export default function Messenger({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [description, setDescrption] = useState('');
  const [contact, setContact] = useState('');
  const [region, setRegion] = useState('');

  const [refreshing] = useState(false);
  const [messenger] = useState(MessagesData);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  
  uploadPicture = () => {
    navigation.navigate('CheckOut');
  };
  uploadFile = () => {
    navigation.navigate('Hotel');
  }
  uploadVideo = () => {
    navigation.navigate('More');
  };
 
  uploadAudio = () => {
    navigation.navigate('OurService');
  };


  return (
    <View style={{flex: 1}}>
    <View style={{flex: 1}}>
    <ScrollView forceInset={{top: 'always'}} contentContainerStyle={{ flexGrow: 1 }}>
            <Header
              style={styles.title}
              title='Testimony'
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
              />
      <View style={styles.inputItem}>
      <TextInput
            style={{marginTop: 10, height:100}}
            onChangeText={(text) => setDescrption(text)}
            multiline={true}
            placeholder='Description'
            textAlignVertical='top'
            
      />
      </View>
      <View style={styles.inputItem}>
      <TextInput
            onChangeText={(text) => setRegion(text)}
            placeholder='Region'
            
      />
      </View>
      <View style={styles.inputItem}>
      <TextInput
            onChangeText={(text) => setContact(text)}
            placeholder='Contact'
            
      />
      </View>

      <View style={styles.titleView}>
            <Text title3 semibold>
              Images
            </Text>
           
      </View>

      <View style={styles.imagesGroup}>
          <Image source={Images.room1} style={styles.blockImage} />

          <Image source={Images.room7} style={styles.blockImage} />
         
       </View>
       <View style={styles.imagesGroup}>
          <Image source={Images.room8} style={styles.blockImage} />

          <Image source={Images.room5} style={styles.blockImage} />

       </View>
       <View style={styles.imagesGroup}>
          <Image source={Images.room6} style={styles.blockImage} />

          <Image source={Images.room4} style={styles.blockImage} />

       </View>
    </ScrollView>
          <Provider style={styles.fab}>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'close' : 'plus'}
              actions={[
                { icon: 'file',
                  label: 'Add File',
                  color: colors.primary,
                  onPress: () => this.uploadFile()},
                {
                  icon: 'camera',
                  label: 'Add Picture',
                  color: colors.primary,
                  onPress: () => this.uploadPicture(),
                },
                {
                  icon: 'video',
                  label: 'Add Video',
                  color: colors.primary,
                  onPress: () => this.uploadVideo(),
                },
                {
                  icon: 'microphone',
                  label: 'Add Audio',
                  color: colors.primary,
                  onPress: () => this.uploadAudio(),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>



    </View>
      <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View style={{alignItems: 'flex-start'}}>
            <Text title4 primaryColor semibold style={{marginRight: 5}}>
              Warning
            </Text>
            <Text caption1 semibold>
              This Action is irreversible
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('PreviewBooking')}>
            Save
          </Button>
        </View>
    </View>
  );
}
