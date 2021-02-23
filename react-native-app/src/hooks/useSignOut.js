import { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignOut = ({setUserLogged}) => {
    const history = useHistory();
    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    
    const singOut = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
        history.push("/");
        setUserLogged(false);
    };

    return singOut;
};

export default useSignOut;