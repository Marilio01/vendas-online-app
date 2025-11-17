import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TextInputChangeEventData,
  ActivityIndicator,
} from 'react-native';
import { MethodEnum } from '../../../enums/methods.enum';
import { theme } from '../../../shared/themes/theme';
import { URL_PRODUCT_PAGE } from '../../../shared/constants/urls';
import { useRequests } from '../../../shared/hooks/useRequests';
import { PaginationType } from '../../../shared/types/paginationType';
import { ProductType } from '../../../shared/types/productType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import ProductThumbnail from '../../../shared/components/productThumbnail/ProductThumbnail';
import {
  SearchProductContainer,
  SearchProductScrollView,
  SearchContainer,
  SearchInputWrapper,
  SearchTextInput,
  SearchIcon,
} from '../styles/searchProduct.style';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  useEffect(() => {
    setSearchProducts(undefined);
  }, []);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      setSearchProducts(undefined);
      const result = await request<PaginationType<ProductType[]>>({
        url: `${URL_PRODUCT_PAGE}?search=${value}`,
        method: MethodEnum.GET,
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

      {searchProducts && searchProducts.data && (
        <ScrollView onScroll={handleScroll}>
          <SearchProductScrollView>
            {searchProducts.data.map((product) => (
              <ProductThumbnail key={product.id} product={product} />
            ))}
          </SearchProductScrollView>
        </ScrollView>
      )}
      {loading && <ActivityIndicator color={theme.colors.primary.main} />}
    </SearchProductContainer>
  );
};

export default SearchProduct;
