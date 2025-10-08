import React from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../shared/components/text/Text';
import Input from '../../../shared/components/input/Input';
import Button from '../../../shared/components/button/Button';
import { useAddress } from '../hooks/useAddress';
import { useAddressForm } from '../hooks/useAddressForm';
import { theme } from '../../../shared/themes/theme';
import { CreateAddressType } from '../../../shared/types/AddressType';

const CreateAddressScreen = () => {
    const navigation = useNavigation();
    const { createAddress, addressLoading } = useAddress();
    const {
        addressState,
        addressSetters,
        isFormValid,
        cepLoading,
        isStreetReadOnly,
        isNeighborhoodReadOnly,
        handleCepChange,
    } = useAddressForm();

    const { cep, street, numberAddress, complement, neighborhood, city, uf, cityId } = addressState;
    const { setNumber, setComplement, setNeighborhood, setStreet } = addressSetters;

    const handleSaveAddress = async () => {
        if (!isFormValid || !cityId) return;

        const newAddress: CreateAddressType = {
            cep, street, complement, neighborhood,
            numberAddress: parseInt(numberAddress, 10),
            cityId: cityId,
        };

        await createAddress(newAddress);
        navigation.goBack();
    };

    const disabledInputStyle = { backgroundColor: theme.colors.grayTheme.gray50 };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Novo Endereço</Text>

                <Input
                    title="CEP"
                    value={cep}
                    placeholder="00000-000"
                    placeholderTextColor={theme.colors.grayTheme.gray80}
                    onChangeText={handleCepChange}
                    keyboardType="numeric"
                    maxLength={9}
                    loading={cepLoading}
                />

                <Input
                    title="Estado (UF)"
                    value={uf}
                    placeholder="Preenchido pelo CEP"
                    placeholderTextColor={theme.colors.grayTheme.gray80}
                    editable={false}
                    style={disabledInputStyle}
                />
                <Input
                    title="Cidade"
                    value={city}
                    placeholder="Preenchido pelo CEP"
                    placeholderTextColor={theme.colors.grayTheme.gray80}
                    editable={false}
                    style={disabledInputStyle}
                />
                <Input
                    title="Bairro"
                    value={neighborhood}
                    placeholder={isNeighborhoodReadOnly ? "Preenchido pelo CEP" : "Digite o bairro"}
                    placeholderTextColor={theme.colors.grayTheme.gray80}
                    onChangeText={setNeighborhood}
                    editable={!isNeighborhoodReadOnly}
                    style={isNeighborhoodReadOnly ? disabledInputStyle : {}}
                />
                <Input
                    title="Rua"
                    value={street}
                    placeholder={isStreetReadOnly ? "Preenchido pelo CEP" : "Digite a rua"}
                    placeholderTextColor={theme.colors.grayTheme.gray80}
                    onChangeText={setStreet}
                    editable={!isStreetReadOnly}
                    style={isStreetReadOnly ? disabledInputStyle : {}}
                />
                <Input
                    title="Número"
                    value={numberAddress}
                    placeholder="Ex: 123"
                    placeholderTextColor={theme.colors.grayTheme.gray80}
                    onChangeText={setNumber}
                    keyboardType="numeric"
                />
                <Input
                    title="Complemento (Opcional)"
                    value={complement}
                    placeholder="Ex: Apto 301, Bloco B"
                    placeholderTextColor={theme.colors.grayTheme.gray80}
                    onChangeText={setComplement}
                />
            </ScrollView>
            <Button
                title="Salvar Endereço"
                onPress={handleSaveAddress}
                loading={addressLoading}
                disabled={!isFormValid || addressLoading || cepLoading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: theme.colors.neutralTheme.white },
    title: { fontSize: 24, marginBottom: 24, color: '#000' },
});

export default CreateAddressScreen;