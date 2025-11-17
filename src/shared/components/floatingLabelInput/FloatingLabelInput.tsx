import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../../shared/themes/theme';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { insertMaskInCep } from '../../../shared/functions/cep';
import {
  Container,
  ErrorContainer,
  ErrorText,
  IconWrapper,
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
  type?: 'cel-phone' | 'cpf' | 'cep';
  loading?: boolean;
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
      loading,
      onChangeText,
      ...props
    }: FloatingLabelInputProps,
    ref: Ref<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

    const isEditable = props.editable ?? true;

    const activeColor = error ? theme.colors.semantic.error : theme.colors.primary.main;

    const labelColor = !isEditable
      ? theme.colors.text.secondary
      : error
      ? theme.colors.semantic.error
      : theme.colors.text.secondary;

    const borderColor = error
      ? theme.colors.semantic.error
      : isFocused
      ? theme.colors.primary.main
      : isEditable
      ? theme.colors.input.secondary
      : theme.colors.neutral.border;

    const handleTextChange = (text: string) => {
      if (onChangeText) {
        let maskedText = text;
        const digits = text.replace(/\D/g, '');

        switch (type) {
          case 'cpf':
            maskedText = insertMaskInCpf(digits);
            break;
          case 'cel-phone':
            maskedText = insertMaskInPhone(digits);
            break;
          case 'cep':
            maskedText = insertMaskInCep(digits);
            break;
          default:
            maskedText = text;
            break;
        }
        onChangeText(maskedText);
      }
    };

    const keyboardType =
      type === 'cpf' || type === 'cel-phone' || type === 'cep' ? 'numeric' : props.keyboardType;

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

    const renderRightIcon = () => {
      if (loading) {
        return <ActivityIndicator color={theme.colors.primary.main} />;
      }

      if (isPasswordInput && (isFocused || !!value)) {
        return (
          <ToggleButton onPress={onToggleVisibility} disabled={!isEditable}>
            <Feather
              name={props.secureTextEntry ? 'eye' : 'eye-off'}
              size={20}
              color={theme.colors.input.primary}
            />
          </ToggleButton>
        );
      }
      return null;
    };

    const shouldShowIconWrapper = loading || (isPasswordInput && (isFocused || !!value));

    return (
      <Wrapper>
        <Container borderColor={borderColor} isEditable={isEditable}>
          <Input
            ref={ref}
            {...props}
            value={value}
            onChangeText={handleTextChange}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            selectionColor={activeColor}
            isEditable={isEditable}
          />

          {shouldShowIconWrapper && <IconWrapper>{renderRightIcon()}</IconWrapper>}
        </Container>
        <Label style={animatedLabelStyle} isEditable={isEditable}>
          {label}
        </Label>
        {!!error && (
          <ErrorContainer>
            <Feather name="alert-circle" size={14} color={theme.colors.semantic.error} />
            <ErrorText>{error}</ErrorText>
          </ErrorContainer>
        )}
      </Wrapper>
    );
  },
);
