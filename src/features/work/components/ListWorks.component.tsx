import { useGetWorks } from '../hooks';

export function ListWorks() {
  const { works } = useGetWorks();
  return <h1>Works</h1>;
}
