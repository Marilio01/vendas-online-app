import { Text, View } from 'react-native';

import Input from '../../../shared/components/input/Input';
import { ContainerLogin } from '../styles/login.style';

const Login = () => {
    return (
        <View>
            <ContainerLogin>
                <Text>testando funcinou hahahaha</Text>
                <Input />
            </ContainerLogin>
        </View>
    );
};

export default Login;