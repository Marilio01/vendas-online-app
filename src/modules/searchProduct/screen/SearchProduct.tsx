import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ActivityIndicator,
  FlatList,
  Keyboard,
  TextInputChangeEventData,
} from 'react-native';
import { MethodEnum } from '../../../enums/methods.enum';
import { theme } from '../../../shared/themes/theme';
import { URL_PRODUCT_PAGE } from '../../../shared/constants/urls';
import { useRequests } from '../../../shared/hooks/useRequests';
import { PaginationType } from '../../../shared/types/paginationType';
import { ProductType } from '../../../shared/types/productType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import {
  SearchProductContainer,
  SearchContainer,
  SearchInputWrapper,
  SearchTextInput,
  SearchIcon,
  EmptyContainer,
  EmptyText,
} from '../styles/searchProduct.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import ProductThumbnail from '../../../shared/components/productThumbnail/ProductThumbnail';

export type SearchProductNavigationProp = NativeStackNavigationProp<
  Record<string, SearchProductParams>
>;

export interface SearchProductParams {
  search?: string;
}

const SearchProduct = () => {
  const { searchProducts, setSearchProducts, insertSearchProducts } = useProductReducer();
  const { params } = useRoute<RouteProp<Record<string, SearchProductParams>>>();
  const { request, loading } = useRequests();
  const [value, setValue] = useState(params?.search || '');
  
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    setSearchProducts(undefined);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      
      setSearchProducts(undefined);
      const result = await request<PaginationType<ProductType[]>>({
        url: `${URL_PRODUCT_PAGE}?search=${value}`,
        method: MethodEnum.GET,
        showErrorToast: false,
      });
      if (active && result) {
        setSearchProducts(result);
      }
    };

    if (value) {
      fetchProducts();
    } else {
      setSearchProducts(undefined);
    }

    return () => {
      active = false;
    };
  }, [value, request]);

  const findNewPage = () => {
    if (searchProducts && searchProducts.meta.currentPage < searchProducts.meta.totalPages) {
      request<PaginationType<ProductType[]>>({
        url: `${URL_PRODUCT_PAGE}?search=${value}&page=${searchProducts.meta.currentPage + 1}`,
        method: MethodEnum.GET,
        saveGlobal: insertSearchProducts,
        showErrorToast: false,
      });
    }
  };

  const handleOnChangeInput = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(event.nativeEvent.text);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndScroll = contentOffset.y >= contentSize.height - layoutMeasurement.height;

    if (isEndScroll && !loading) {
      findNewPage();
    }
  };

  const renderProductItem = ({ item }: { item: ProductType }) => (
    <ProductThumbnail product={item} />
  );

  const renderEmptyList = () => (
    <EmptyContainer keyboardOpen={isKeyboardVisible}>
      <Icon name="search" size={48} color={theme.colors.neutral.disabled} />
      <EmptyText>Nenhum produto encontrado para "{value}"</EmptyText>
    </EmptyContainer>
  );

  return (
    <SearchProductContainer>
      <SafeAreaView style={{ backgroundColor: theme.colors.neutral.background }}>
        <SearchContainer>
          <SearchInputWrapper>
            <SearchIcon name="search" />
            <SearchTextInput
              value={value}
              onChangeText={setValue}
              placeholder="Pesquisar produto"
              autoFocus={true}
              returnKeyType="search"
            />
          </SearchInputWrapper>
        </SearchContainer>
      </SafeAreaView>

      {loading && !searchProducts ? (
        <ActivityIndicator color={theme.colors.primary.main} style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={searchProducts?.data || []}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          onScroll={handleScroll}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingTop: 16, flexGrow: 1 }}
          ListEmptyComponent={value ? renderEmptyList : null}
        />
      )}
    </SearchProductContainer>
  );
};

export default SearchProduct;