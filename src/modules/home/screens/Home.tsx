import { SectionList, View, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import Input from '../../../shared/components/input/Input';
import ProductThumbnail from '../../../shared/components/productThumbnail.tsx/ProductThumbnail';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';
import { useHome, GroupedProduct } from '../hooks/useHome';
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

  const renderSectionHeader = ({ section }: { section: GroupedProduct }) => (
    <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 16}}>
      {section.title}
    </Text>
  );

  return (
    <SafeAreaView style={{ 
        flex: 1, 
        backgroundColor: theme.colors.neutralTheme.white,
        paddingTop: insets.top
    }}>
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
        <ActivityIndicator style={{ marginTop: 32 }} size="large" color={theme.colors.mainTheme.primary} />
      ) : (
        <SectionList
          sections={groupedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ section }) => (
            <FlatList
              horizontal
              data={section.data}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 8 }}
            />
          )}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;