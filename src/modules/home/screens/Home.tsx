import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import ProductThumbnail from '../../../shared/components/productThumbnail/ProductThumbnail';
import { theme } from '../../../shared/themes/theme';
import { useHome } from '../hooks/useHome';
import {
  Container,
  SearchContainer,
  SearchInputWrapper,
  SearchPlaceholder,
  SearchIcon,
  CategoryBlock,
  CategoryTitle,
  ProductItemWrapper,
  LoadingContainer,
} from '../styles/home.style';
import { ProductType } from '../../../shared/types/ProductType';

const Home = () => {
  const { loading, groupedProducts, handleGoToSearchProduct } = useHome();

  const renderProduct = ({ item }: { item: ProductType }) => (
    <ProductItemWrapper>
      <ProductThumbnail product={item} />
    </ProductItemWrapper>
  );

  const renderCategoryBlock = ({ item }: { item: { title: string; data: ProductType[] } }) => (
    <CategoryBlock>
      <CategoryTitle>{item.title}</CategoryTitle>
      <FlatList
        horizontal
        data={item.data}
        renderItem={renderProduct}
        keyExtractor={(prod) => prod.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </CategoryBlock>
  );

  return (
    <Container edges={['top', 'left', 'right']}>
      <SearchContainer>
        <SearchInputWrapper onPress={handleGoToSearchProduct}>
          <SearchIcon name="search" />
          <SearchPlaceholder>Pesquisar produto</SearchPlaceholder>
        </SearchInputWrapper>
      </SearchContainer>

      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </LoadingContainer>
      ) : (
        <FlatList
          data={groupedProducts}
          keyExtractor={(item) => item.title}
          renderItem={renderCategoryBlock}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
        />
      )}
    </Container>
  );
};

export default Home;
