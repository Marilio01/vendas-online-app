import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cart from './modules/cart';
import CreateUser from './modules/createUser';
import Home from './modules/home';
import Login from './modules/login';
import Product from './modules/product';
import Orders from './modules/orders';
import SearchProduct from './modules/searchProduct';
import Profile from './modules/profile';
import Splash from './modules/splash';
import { Icon } from './shared/components/icon/Icon';
import { MenuUrl } from './shared/enums/MenuUrl.enum';
import { theme } from './shared/themes/theme';
import CheckoutScreen from './modules/checkout/screens/Chekout';
import CreateAddressScreen from './modules/address/screens/CreateAddress';
import { FirstScreen } from './modules/firstScreen';
import PaymentScreen from './modules/payment/screens/Payment';
import OrderDetailsScreen from './modules/orders/screens/OrderDetailsScreen';
import EditProfileScreen from './modules/profile/screens/EditProfileScreen';
import ChangePasswordScreen from './modules/profile/screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const renderTabBarIcon = (color: string, route: RouteProp<ParamListBase, string>) => {
    let iconName: string;

    switch (route.name) {
      case MenuUrl.HOME_TAB:
        iconName = 'home';
        break;
      case MenuUrl.ORDER:
        iconName = 'books';
        break;
      case MenuUrl.SEARCH_PRODUCT:
        iconName = 'search';
        break;
      case MenuUrl.CART:
        iconName = 'cart';
        break;
      case MenuUrl.PROFILE:
      default:
        iconName = 'profile';
        break;
    }

    return <Icon size={16} name={iconName} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerStatusBarHeight: 15,

        tabBarIcon: ({ color }) => renderTabBarIcon(color, route),
        tabBarActiveTintColor: theme.colors.mainTheme.primary,
        tabBarInactiveTintColor: theme.colors.grayTheme.gray80,
        tabBarLabelStyle: {
          marginBottom: 8,
        },
        tabBarStyle: {
          padding: 8,
        },
      })}
    >
      <Tab.Screen name={MenuUrl.HOME_TAB} component={Home} options={{ headerShown: false }} />
      {/* <Tab.Screen name={MenuUrl.SEARCH_PRODUCT} component={SearchProduct} options={{ title: 'Buscar', headerShown: false }} />*/}
      <Tab.Screen name={MenuUrl.CART} component={Cart} options={{ title: 'Carrinho' }} />
      <Tab.Screen name={MenuUrl.ORDER} component={Orders} options={{ title: 'Pedidos' }} />
      <Tab.Screen name={MenuUrl.PROFILE} component={Profile} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          statusBarStyle: 'dark',
          statusBarAnimation: 'fade',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name={MenuUrl.SPLASH}
          component={Splash}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name={MenuUrl.LOGIN}
          component={Login}
          options={{ headerTitle: '', headerShadowVisible: false }}
        />
        <Stack.Screen
          name={MenuUrl.PRODUCT}
          component={Product}
        />
        <Stack.Screen
          name={MenuUrl.CREATE_USER}
          component={CreateUser}
          options={{ headerTitle: '', headerShadowVisible: false }}
        />
        <Stack.Screen
          name={MenuUrl.HOME}
          component={TabNavigation}
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
          options={{ title: 'Cadastro de Endereço' }}
        />
        <Stack.Screen 
          name="FirstScreen"
          component={FirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ title: 'Forma de Pagamento' }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
          options={{ title: 'Detalhes do Pedido' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: 'Editar Perfil' }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ title: 'Alterar Senha' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
