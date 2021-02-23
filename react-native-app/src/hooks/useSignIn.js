import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const [mutate, result] = useMutation(LOGIN);
    const apolloClient = useApolloClient();
    const history = useHistory();
  
    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(data["authorize"]["accessToken"]);
        apolloClient.resetStore();
        history.push("/");
    };
  
    return [signIn, result];
  };

export default useSignIn;