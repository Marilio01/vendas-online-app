import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native';
import { MethodEnum } from '../../../enums/methods.enum';
import { DisplayFlexColumn } from '../../../shared/components/globalStyles/globalView.style';
import Input from '../../../shared/components/input/Input';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProductType } from '../../../shared/types/productType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import ProductThumbnail from '../../../shared/components/productThumbnail.tsx/ProductThumbnail';
import { SearchProductNavigationProp } from '../../searchProduct/screen/SearchProduct';
import { HomeContainer } from '../styles/home.style';



const Home = () => {
    const [search, setSearch] = useState('');
    const { navigate } = useNavigation<SearchProductNavigationProp>();
    const { request } = useRequests();
    const { products, setProducts } = useProductReducer();

    useEffect(() => {
        request<ProductType[]>({
            url: URL_PRODUCT,
            method: MethodEnum.GET,
            saveGlobal: setProducts,
        });
    }, []);

    const handleGoToProduct = () => {
        navigate(MenuUrl.SEARCH_PRODUCT, {
            search,
        });
    };

    const handleOnChangeSearch = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSearch(event.nativeEvent.text);
    };



    return (
        <View>
            <HomeContainer>
                <Input
                    onPressIconRight={handleGoToProduct}
                    value={search}
                    onChange={handleOnChangeSearch}
                    iconRight="search"
                />
            </HomeContainer>
            <DisplayFlexColumn />

            <FlatList
                horizontal
                data={products}
                renderItem={({ item }) => <ProductThumbnail margin="0px 8px" product={item} />}
            />
        </View>
    );
};

export default Home;