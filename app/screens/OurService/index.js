import React, {useState, Component} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView, PermissionsAndroid} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text, Button, Image} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

import { Card, Divider } from 'react-native-elements'


import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Title } from 'react-native-paper';


export default function OurService({route, navigation}) {
  
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [state, setState] = useState(
    {
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    }
  );

  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [audioPermissions, setAudioPermissions] = useState(false);
  const [stockagePermissions, setStockagePermissions] = useState(false);
  const [items, setItems] = useState('');
  const [done, setDone] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(0);
  const [loading, setLoading] = useState(false);

  requestAudioPermission = async () => {
    try {
      const grantedAudio = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "App Audio Permission",
          message:"App needs access to your microphone ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log('granted', grantedAudio);
      if (grantedAudio === PermissionsAndroid.RESULTS.GRANTED) {
        setAudioPermissions(true)
      } else {
        console.log("Audio permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  requestStockagePermission = async () => {
    try {
      const grantedStockage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "App Stockage Permission",
          message:"App needs access to your stockage ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log('granted', grantedStockage);
      if (grantedStockage === PermissionsAndroid.RESULTS.GRANTED) {
        setStockagePermissions(true)
      } else {
        console.log("Stockage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

  };
  const onStartRecord = async () => {
    if(audioPermissions && stockagePermissions){
      setIsRecording(true);
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log(e)
        setState({
          recordSecs: e.current_position,
          recordTime: audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
          playTime: '00:00:00',
          duration: '00:00:00',
        });
        return;
      });
      setRecordedAudio(Math.floor(e.duration));
    }
    else{
      this.requestAudioPermission();
      this.requestStockagePermission();
    }
  };
  
  
  const onStopRecord = async () => {
    setDone(true)
    setIsRecording(false)
    const result = await audioRecorderPlayer.stopRecorder();
    console.log(result)
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      recordSecs: 0,
    });
  };
  
  onStartPlay = async () => {
    console.log('onStartPlay');
    setIsPlaying(true)
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };
  
  onPausePlay = async () => {
    audioRecorderPlayer.pausePlayer();
  };
  
  onStopPlay = async () => {
    setIsPlaying(false)
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setState({
      playTime: '00:00:00'
    })
  };

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
        title='Choose Audio'
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
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        
      <Card containerStyle={{borderRadius: 20, width:'80%', height:'90%', alignSelf:'center'}}>
          <Title style={styles.title}>Record Audio</Title>
          <Title style={styles.title}>{state.recordTime}</Title>
          <View style={styles.button}>
          <Button  
            icon={
              <Icon
                name="microphone"
                size={15}
                color="white"
                style={styles.icon}
              />
            }
            onPress={() => onStartRecord()}
            >
              RECORD
          </Button>
          </View>
          <View style={styles.button}>
          <Button
            icon={
              <Icon
                name="stop"
                size={15}
                color="white"
                style={styles.icon}
              />
            }
            onPress={() => onStopRecord()}
          >
            STOP & SAVE
          </Button>
          </View>
          <Divider />
          <Title style={styles.title}>{state.playTime} / {state.duration}</Title>
          <View style={styles.iconGroup}>
            <View style={styles.buttonIcon}>
              <Icon
                  name="play"
                  size={25}
                  color={BaseColor.orangeColor}
                  style={styles.icon}
                  onPress={() => this.onStartPlay()}
              />
            
            </View>
            <View style={styles.buttonIcon}>
              <Icon
                  name="pause"
                  size={25}
                  color={BaseColor.orangeColor}
                  style={styles.icon}
                  onPress={() => this.onPausePlay()}
              />
            </View>
            <View style={styles.buttonIcon}>
            <Icon
                  name="stop"
                  size={25}
                  color={BaseColor.orangeColor}
                  style={styles.icon}
                  onPress={() => this.onStopPlay()}
              />
            </View>
          </View>
      </Card>
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
