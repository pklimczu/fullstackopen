import { useQuery } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const repos = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepositories = async () => {
      if (repos.loading) {
        setLoading(true);
      } else {
          setRepositories(repos.data.repositories);
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;