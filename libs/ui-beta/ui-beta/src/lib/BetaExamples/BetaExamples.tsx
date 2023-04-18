'use client';
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from 'next/navigation';
import React, {
  cache,
  createContext,
  Dispatch,
  use,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';

export function ExampleClientComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <p>Sort By</p>

      {/* using useRouter */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'));
        }}
      >
        ASC
      </button>

      {/* using <Link> */}
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        DESC
      </Link>
    </>
  );
}

// This *client* component will be imported into a blog layout
export function BlogNavLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  // Navigating to `/blog/hello-world` will return 'hello-world'
  // for the selected layout segment
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <Link
      href={`/blog/${slug}`}
      // Change style depending on whether the link is active
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {children}
    </Link>
  );
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = ((await parent) as any).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  };
}

export type User = {
  id: number;
  name: string;
  email: string;
};

const getUsers = cache(() =>
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())
);

export function ListUsers() {
  const users = use<User[]>(getUsers());

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: '1px solid #ccc', textAlign: 'center' }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

type StateType = {
  count: number;
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  count: 0,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export function Counter() {
  const { state, dispatch } = useContext(CounterContext);

  return (
    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
      <h4 style={{ marginBottom: 16 }}>{state.count}</h4>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>increment</button>
      <button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        style={{ marginInline: 16 }}
      >
        decrement
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
    </div>
  );
}
