import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { prepareData } from '../util/helperV1';

async function getActivities() {
  const { data } = await axios.get('/activities/v1');
  console.log({ data });

  return data;
}

export function useActivityQuery() {
  return useQuery({
    queryKey: ['activity'],
    queryFn: getActivities,
    // select: (res) => prepareData(res),
  });
}
