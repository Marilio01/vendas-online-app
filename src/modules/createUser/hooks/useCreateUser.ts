import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { MethodEnum } from '../../../enums/methods.enum';
import { URL_USER } from '../../../shared/constants/urls';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';
import { useRequest } from '../../../shared/hooks/useRequest';
import { CreateUserType } from '../../../shared/types/createUserType';

export const useCreateUser = () => {
    const { reset } = useNavigation<NavigationProp<ParamListBase>>();
    const { request, loading } = useRequest();
    const [createUser, setCreateUser] = useState<CreateUserType>({
        confirmPassword: '',
        cpf: '',
        email: '',
        name: '',
        password: '',
        phone: '',
    });

    const handleCreateUser = async () => {
        const resultCreateUser = await request({
            url: URL_USER,
            method: MethodEnum.POST,
            body: createUser,
            message: 'Usuário cadastrado com sucesso!',
        });

        if (resultCreateUser) {
            reset({
                index: 0,
                routes: [{ name: MenuUrl.LOGIN }],
            });
        }
    };

    const handleOnChangeInput = (
        event: NativeSyntheticEvent<TextInputChangeEventData> | string,
        name: string,
    ) => {
        let value: string;


        if (typeof event === 'string') {
            value = event;
        } else {

            value = event?.nativeEvent?.text || '';
        }

        setCreateUser((currentCreateUser) => ({
            ...currentCreateUser,
            [name]: value,
        }));
    };

    return {
        createUser,
        loading,
        handleOnChangeInput,
        handleCreateUser,
    };
};