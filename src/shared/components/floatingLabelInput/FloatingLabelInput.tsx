import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../../shared/themes/theme';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';

import {
  Container,
  ErrorContainer,
  ErrorText,
  Input,
  Label,
  ToggleButton,
  Wrapper,
} from './floatingLabelInput.style';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  error?: string;
  isPasswordInput?: boolean;
  onToggleVisibility?: () => void;
  type?: 'cel-phone' | 'cpf';
}

export const FloatingLabelInput = forwardRef(
  (
    {
      label,
      value,
      error,
      isPasswordInput,
      onToggleVisibility,
      type,
      onChangeText,
      ...props
    }: FloatingLabelInputProps,
    ref: Ref<TextInput>
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

    const activeColor = error ? theme.colors.redTheme.red : theme.colors.neutralTheme.black;
    const labelColor = error ? theme.colors.redTheme.red : theme.colors.grayTheme.gray100;
    const borderColor = error
      ? theme.colors.redTheme.red
      : isFocused
      ? theme.colors.neutralTheme.black
      : theme.colors.grayTheme.gray100;

    const handleTextChange = (text: string) => {
      if (onChangeText) {
        let maskedText = text;
        switch (type) {
          case 'cpf':
            maskedText = insertMaskInCpf(text);
            break;
          case 'cel-phone':
            maskedText = insertMaskInPhone(text);
            break;
          default:
            break;
        }
        onChangeText(maskedText);
      }
    };

    const keyboardType =
      type === 'cpf' || type === 'cel-phone'
        ? 'numeric'
        : props.keyboardType;

    useEffect(() => {
      Animated.timing(animatedIsFocused, {
        toValue: isFocused || !!value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused, value, animatedIsFocused]);

    const animatedLabelStyle = {
      top: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 6],
      }),
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: labelColor,
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <Wrapper>
        <Label style={animatedLabelStyle}>{label}</Label>
        <Container borderColor={borderColor}>
          <Input
            ref={ref}
            {...props}
            value={value}
            onChangeText={handleTextChange}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            selectionColor={activeColor}
          />
          {isPasswordInput && (isFocused || !!value) && (
            <ToggleButton onPress={onToggleVisibility}>
              <Feather
                name={props.secureTextEntry ? 'eye' : 'eye-off'}
                size={20}
                color={theme.colors.grayTheme.gray100}
              />
            </ToggleButton>
          )}
        </Container>
        {!!error && (
          <ErrorContainer>
            <Feather name="alert-circle" size={14} color={theme.colors.redTheme.red} />
            <ErrorText>{error}</ErrorText>
          </ErrorContainer>
        )}
      </Wrapper>
    );
  }
);
