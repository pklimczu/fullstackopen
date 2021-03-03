import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const history = useHistory();
  
    const signIn = async ({ owner, repositoryName, rating, review }) => {
        const { data } = await mutate({ variables: { owner, repositoryName, rating, review } });

        history.push(`/details/${data["repositoryId"]}`);
    };
  
    return [signIn, result];
  };

export default useCreateReview;