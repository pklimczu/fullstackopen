import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP);
    const history = useHistory();
  
    const signIn = async ({ username, password }) => {
        await mutate({ variables: { username, password } });
        history.push("/");
    };
  
    return [signIn, result];
  };

export default useSignUp;