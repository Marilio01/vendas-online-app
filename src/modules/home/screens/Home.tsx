import React from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../../../shared/components/input/Input';
import ProductThumbnail from '../../../shared/components/productThumbnail.tsx/ProductThumbnail';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';
import { useHome } from '../hooks/useHome';
import { HomeContainer } from '../styles/home.style';
import { ProductType } from '../../../shared/types/ProductType';

const Home = () => {
  const {
    search,
    loading,
    groupedProducts,
    handleOnChangeSearch,
    handleGoToSearchProduct,
  } = useHome();

  const insets = useSafeAreaInsets();

  const renderProduct = ({ item }: { item: ProductType }) => (
    <View style={{ marginHorizontal: 8 }}>
      <ProductThumbnail product={item} />
    </View>
  );

  const renderCategoryBlock = ({ item }: any) => (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', paddingHorizontal: 16 }}>
        {item.title}
      </Text>
      <FlatList
        horizontal
        data={item.data}
        renderItem={renderProduct}
        keyExtractor={(prod) => prod.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.neutralTheme.white,
        paddingTop: insets.top,
      }}
    >
      <HomeContainer>
        <Input
          value={search}
          onChange={handleOnChangeSearch}
          onPressIconRight={handleGoToSearchProduct}
          iconRight="search"
          placeholder="Pesquisar produto"
        />
      </HomeContainer>

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 32 }}
          size="large"
          color={theme.colors.mainTheme.primary}
        />
      ) : (
        <FlatList
          data={groupedProducts}
          keyExtractor={(item) => item.title}
          renderItem={renderCategoryBlock}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
