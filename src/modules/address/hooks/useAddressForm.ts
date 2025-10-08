import { useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { useLocation } from '../../location/hooks/useLocation';

export const useAddressForm = () => {
    const { findCityAndState } = useLocation();

    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [numberAddress, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [cityId, setCityId] = useState<number | undefined>();

    const [cepLoading, setCepLoading] = useState(false);
    const [isStreetReadOnly, setIsStreetReadOnly] = useState(true);
    const [isNeighborhoodReadOnly, setIsNeighborhoodReadOnly] = useState(true);

    const isFormValid = useMemo(() => {
        return !!cityId && street.trim().length > 0 && numberAddress.trim().length > 0;
    }, [cityId, street, numberAddress]);

    const handleCepChange = useCallback(async (newCep: string) => {
        const cleanedCep = newCep.replace(/[^0-9]/g, '');
        setCep(cleanedCep);
        setCityId(undefined);

        if (cleanedCep.length < 8) {
            setStreet(''); setNeighborhood(''); setCity(''); setUf('');
            setIsStreetReadOnly(true); setIsNeighborhoodReadOnly(true);
            return;
        }

        if (cleanedCep.length === 8) {
            setCepLoading(true);
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
                const data = response.data;

                if (data.erro) {
                    Alert.alert('Erro', 'CEP não encontrado.');
                } else {
                    setStreet(data.logradouro || '');
                    setNeighborhood(data.bairro || '');
                    setCity(data.localidade || '');
                    setUf(data.uf || '');
                    setIsStreetReadOnly(!!data.logradouro);
                    setIsNeighborhoodReadOnly(!!data.bairro);
                    
                    const locationIds = await findCityAndState(data.localidade, data.uf);
                    if (locationIds.cityId) {
                        setCityId(locationIds.cityId);
                    } else {
                        Alert.alert('Atenção', 'Cidade não encontrada em nossa base de dados.');
                    }
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível processar o CEP.');
            } finally {
                setCepLoading(false);
            }
        }
    }, [findCityAndState]);

    const addressState = { cep, street, numberAddress, complement, neighborhood, city, uf, cityId };

    const addressSetters = { setNumber, setComplement, setNeighborhood, setStreet };

    return {
        addressState,
        addressSetters,
        isFormValid,
        cepLoading,
        isStreetReadOnly,
        isNeighborhoodReadOnly,
        handleCepChange,
    };
};