import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { prepareData } from '../util/helperV1';

// async function getActivities() {
//   const { data } = await axios.get('/activities/v1');
//   console.log({ data });

//   return data;
// }

export function useActivityQuery(url, key) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axios.get(url);

      console.log({ data });
      return data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}
