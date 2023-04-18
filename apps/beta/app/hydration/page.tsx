import ListUsers from './list-users';
import { User } from '@tama/ui-beta';
import getQueryClient from '../../utils/getClientQuery';
import { dehydrate } from '@tanstack/react-query';
import Hydrate from '../../utils/hydrate.client';

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = (await res.json()) as User[];
  return users;
}

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['hydrate-users'], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
