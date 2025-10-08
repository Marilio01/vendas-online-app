import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../../shared/components/button/Button';
import { logout } from '../../../shared/functions/connection/auth';

const Profile = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <SafeAreaView>
      <View>
        <Button title="Sair" onPress={() => logout(navigate)} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;