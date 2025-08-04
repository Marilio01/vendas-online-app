import { View } from 'react-native';
import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/Input';
import { ContainerLogin, Imagelogo } from '../styles/login.style';
import { theme } from '../../../shared/themes/theme';
import axios from 'axios';

const Login = () => {
    const handleOnPress = async () => {
        console.log('clicou');
    };
    return (
        <View>
            <ContainerLogin>
                <Imagelogo resizeMode="contain" source={require('../../../assets/images/logo.jpg')} />
                <Input margin="0px 0px 8px 0px" placeholder="Digite seu email" title="Email:" />
                <Input secureTextEntry placeholder="Digite sua senha" title="Senha:" />
                <Button
                    type={theme.buttons.buttonsTheme.primary}
                    margin="16px"
                    title="ENTRAR"

                    onPress={handleOnPress}
                />
            </ContainerLogin>
        </View>
    );
};

export default Login;