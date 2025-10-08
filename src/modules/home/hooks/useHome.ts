import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { ProductType } from '../../../shared/types/ProductType';
import { CategoryType } from '../../../shared/types/categoryType';
import { URL_PRODUCT, URL_CATEGORY } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';
import { SearchProductNavigationProp } from '../../searchProduct/screen/SearchProduct';

export interface GroupedProduct {
  title: string;
  data: ProductType[];
}

export const useHome = () => {
  const { navigate } = useNavigation<SearchProductNavigationProp>();
  const { loading, request } = useRequests();
  const { products, setProducts } = useProductReducer();
  const { categories, setCategories } = useCategoryReducer();
  const [search, setSearch] = useState('');

  const handleOnChangeSearch = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearch(event.nativeEvent.text);
  };

  const handleGoToSearchProduct = () => {
    navigate(MenuUrl.SEARCH_PRODUCT, {
      search,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const [productsResult, categoriesResult] = await Promise.all([
        request<ProductType[]>({ url: URL_PRODUCT, method: MethodEnum.GET }),
        request<CategoryType[]>({ url: URL_CATEGORY, method: MethodEnum.GET }),
      ]);

      if (productsResult) {
        setProducts(productsResult);
      }
      if (categoriesResult) {
        setCategories(categoriesResult);
      }
    };

    fetchData();
  }, []);

  const groupedProducts = useMemo<GroupedProduct[]>(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (!search) {
        return categories
        .map((category) => ({
          title: category.name,
          data: products.filter((product) => product.category?.id === category.id),
        }))
        .filter((group) => group.data.length > 0);
    }

    return [
        {
            title: 'Resultado da Pesquisa',
            data: filteredProducts
        }
    ]

  }, [search, products, categories]);

  return {
    search,
    loading,
    groupedProducts,
    handleOnChangeSearch,
    handleGoToSearchProduct,
  };
};