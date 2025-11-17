import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';

interface AppToastProps {
  text1?: string;
  text2?: string;
  props: {
    logoSource?: ImageSourcePropType;
    iconName?: string;
    iconColor?: string;
    wrapperColor?: string;
    [key: string]: any;
  };
}

const AppToast = ({ text1, text2, props }: AppToastProps) => (
  <View style={styles.toastContainer}>
    <View style={[styles.logoWrapper, { backgroundColor: props.wrapperColor || '#F0F0F0' }]}>
      {props.iconName ? (
        <Icon name={props.iconName} size={22} color={props.iconColor || '#333333'} />
      ) : (
        <Image
          source={props.logoSource || require('../../../assets/images/logo.jpg')}
          style={styles.toastLogo}
        />
      )}
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  toastContainer: {
    minHeight: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 8,
  },

  logoWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  toastLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
  },
  text2: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
});

export const toastConfig: ToastConfig = {
  success: ({ text1, text2, props, onPress }) => (
    <TouchableOpacity style={{ width: '92%' }} activeOpacity={0.9} onPress={onPress}>
      <AppToast
        text1={text1}
        text2={text2}
        props={{
          ...props,
          wrapperColor: '#E6F4EA',
          iconName: 'check-circle',
          iconColor: '#34A853',
        }}
      />
    </TouchableOpacity>
  ),

  error: ({ text1, text2, props, onPress }) => (
    <TouchableOpacity style={{ width: '92%' }} activeOpacity={0.9} onPress={onPress}>
      <AppToast
        text1={text1}
        text2={text2}
        props={{
          ...props,
          wrapperColor: '#FCE8E6',
          iconName: 'x-circle',
          iconColor: '#EA4335',
        }}
      />
    </TouchableOpacity>
  ),

  info: ({ text1, text2, props, onPress }) => (
    <TouchableOpacity style={{ width: '92%' }} activeOpacity={0.9} onPress={onPress}>
      <AppToast
        text1={text1}
        text2={text2}
        props={{
          ...props,
          wrapperColor: '#E8F0FE',
          iconName: 'info',
          iconColor: '#4285F4',
        }}
      />
    </TouchableOpacity>
  ),

  appMessage: ({ text1, text2, props, onPress }) => (
    <TouchableOpacity style={{ width: '92%' }} activeOpacity={0.9} onPress={onPress}>
      <AppToast
        text1={text1}
        text2={text2}
        props={{
          ...props,
          wrapperColor: '#F0F0F0',
          logoSource: require('../../../assets/images/logo.jpg'),
        }}
      />
    </TouchableOpacity>
  ),
};
