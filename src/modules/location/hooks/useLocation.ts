import { useCallback, useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { CityType } from '../../../shared/types/CityType';
import { URL_CITY, URL_STATE } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';
import { StateType } from '../../../shared/types/StateType';

export const useLocation = () => {
  const { request } = useRequests();
  const [cities, setCities] = useState<CityType[]>([]);
  const [states, setStates] = useState<StateType[]>([]);

  const fetchStates = useCallback(async () => {
    const result = await request<StateType[]>({
      url: URL_STATE,
      method: MethodEnum.GET,
    });
    if (result) {
      setStates(result);
      return result;
    }
    return [];
  }, [request]);
  
  const fetchCities = useCallback(async (stateId: number) => {
    const result = await request<CityType[]>({
      url: `${URL_CITY}/${stateId}`,
      method: MethodEnum.GET,
    });
    if (result) {
      setCities(result);
      return result;
    }
    return [];
  }, [request]);

  const findCityAndState = useCallback(async (cityName: string, stateUf: string) => {
    const allStates = await fetchStates();
    const foundState = allStates.find(state => state.uf.toUpperCase() === stateUf.toUpperCase());

    if (foundState) {
        const citiesOfState = await fetchCities(foundState.id);
        const foundCity = citiesOfState.find(city => city.name.toUpperCase() === cityName.toUpperCase());
        return { cityId: foundCity?.id, stateId: foundState.id };
    }
    
    return { cityId: undefined, stateId: undefined };
  }, [request, fetchStates, fetchCities]);

  return {
    cities,
    states,
    fetchCities,
    fetchStates,
    findCityAndState,
  };
};