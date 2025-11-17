import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from './modules/cart';
import CreateUser from './modules/createUser';
import Home from './modules/home';
import Login from './modules/login';
import Product from './modules/product';
import Orders from './modules/orders';
import Profile from './modules/profile';
import Splash from './modules/splash';
import Icon from 'react-native-vector-icons/Feather';
import { MenuUrl } from './shared/enums/MenuUrl.enum';
import { theme } from './shared/themes/theme';
import CheckoutScreen from './modules/checkout/screens/Chekout';
import CreateAddressScreen from './modules/address/screens/CreateAddress';
import { FirstScreen } from './modules/firstScreen';
import PaymentScreen from './modules/payment/screens/Payment';
import OrderDetailsScreen from './modules/orders/screens/OrderDetailsScreen';
import EditProfileScreen from './modules/profile/screens/EditProfileScreen';
import ChangePasswordScreen from './modules/profile/screens/ChangePasswordScreen';
import { AddressListScreen } from './modules/address/screens/AddressList';
import PaymentListScreen from './modules/payment/screens/PaymentListScreen';
import SearchProduct from './modules/searchProduct/screen/SearchProduct';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, View } from 'react-native'; // Removi 'Text' que não estava sendo usado
import { useCart } from './modules/cart/hooks/useCart';
import { CartBadge } from './shared/components/cartBadge/CartBadge';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.neutral.background,
  },
};

const CancelButton = styled.TouchableOpacity`
  padding: 4px 8px;
  margin-right: 5px;
`;

const CancelText = styled.Text`
  color: ${theme.colors.semantic.error};
  font-size: 16px;
  font-weight: 500;
`;

const CartIconHeader = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { cart } = useCart();
  const cartItems = cart?.cartProduct || [];
  const total = cartItems.reduce((acc, item) => acc + item.amount, 0);

  const handleGoToCart = useCallback(() => {
    navigation.navigate(MenuUrl.CART);
  }, [navigation]);

  return (
    <TouchableOpacity
      onPress={handleGoToCart}
      style={{
        paddingRight: 15,
      }}
    >
      <View style={{ position: 'relative' }}>
        <Icon name="shopping-cart" size={24} color={theme.colors.text.primary} />
        <CartBadge value={total} />
      </View>
    </TouchableOpacity>
  );
};

const TabNavigation = () => {
  const { cart } = useCart();
  const cartItems = cart?.cartProduct || [];
  const total = cartItems.reduce((acc, item) => acc + item.amount, 0);

  const renderTabBarIcon = (color: string, route: RouteProp<ParamListBase, string>) => {
    let iconName = 'home';

    if (route.name === MenuUrl.ORDER) {
      iconName = 'list';
    } else if (route.name === MenuUrl.CART) {
      iconName = 'shopping-cart';
    } else if (route.name === MenuUrl.PROFILE) {
      iconName = 'user';
    }

    return (
      <View style={{ position: 'relative' }}>
        <Icon size={20} name={iconName} color={color} />
        {route.name === MenuUrl.CART && <CartBadge value={total} />}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.neutral.background,
          elevation: 0,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: theme.colors.text.primary,
        },

        tabBarIcon: ({ color }) => renderTabBarIcon(color, route),
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.neutral.disabled,
        tabBarLabelStyle: {
          marginBottom: 8,
          fontSize: 12,
        },
        tabBarStyle: {
          padding: 8,
          height: 68,
          paddingBottom: 20,
          backgroundColor: theme.colors.neutral.surface,
        },
      })}
    >
      <Tab.Screen name={MenuUrl.HOME_TAB} component={Home} options={{ headerShown: false }} />

      <Tab.Screen
        name={MenuUrl.CART}
        component={Cart}
        options={{
          title: 'Carrinho',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(MenuUrl.CART);
          },
        })}
      />

      <Tab.Screen
        name={MenuUrl.ORDER}
        component={Orders}
        options={{ title: 'Pedidos' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(MenuUrl.ORDER);
          },
        })}
      />

      <Tab.Screen name={MenuUrl.PROFILE} component={Profile} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const createCancelAlert = (navigation: NavigationProp<ParamListBase>) =>
    Alert.alert(
      'Descartar Alterações?',
      'Suas mudanças não salvas serão perdidas. Deseja sair mesmo assim?',
      [
        {
          text: 'Continuar Editando',
          onPress: () => console.log('Usuário cancelou o descarte'),
          style: 'cancel',
        },
        {
          text: 'Descartar',
          onPress: () => navigation.goBack(),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          statusBarStyle: 'dark',
          statusBarAnimation: 'fade',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.neutral.background,
          },
          headerShadowVisible: false,
          headerTintColor: theme.colors.text.primary,
        }}
      >
        <Stack.Screen name={MenuUrl.SPLASH} component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name={MenuUrl.LOGIN} component={Login} options={{ headerTitle: '' }} />
        <Stack.Screen
          name={MenuUrl.PRODUCT}
          component={Product}
          options={{
            headerTitle: 'Detalhes',
            headerTransparent: false,
            headerRight: () => <CartIconHeader />,
          }}
        />
        <Stack.Screen
          name={MenuUrl.CREATE_USER}
          component={CreateUser}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen name={MenuUrl.CART} component={Cart} options={{ title: 'Carrinho' }} />

        <Stack.Screen
          name={MenuUrl.HOME}
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.SEARCH_PRODUCT}
          component={SearchProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ title: 'Revisão do Pedido' }}
        />
        <Stack.Screen
          name="CreateAddress"
          component={CreateAddressScreen}
          options={{ title: '' }}
        />
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ title: 'Pagamento' }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
          options={{ title: 'Detalhes do Pedido' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={({ navigation }) => ({
            title: '',
            headerRight: () => (
              <CancelButton onPress={() => createCancelAlert(navigation)}>
                <CancelText>Cancelar</CancelText>
              </CancelButton>
            ),
          })}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={({ navigation }) => ({
            title: '',
            headerRight: () => (
              <CancelButton onPress={() => createCancelAlert(navigation)}>
                <CancelText>Cancelar</CancelText>
              </CancelButton>
            ),
          })}
        />
        <Stack.Screen
          name="AddressList"
          component={AddressListScreen}
          options={{ title: 'Endereços' }}
        />
        <Stack.Screen
          name="PaymentList"
          component={PaymentListScreen}
          options={{ title: 'Selecionar Pagamento' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
