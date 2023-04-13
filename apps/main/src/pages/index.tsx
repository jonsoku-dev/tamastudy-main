import { Suspense, useState } from 'react';
import { QueryErrorResetBoundary, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import { ErrorBoundary } from 'react-error-boundary';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  AboutSection,
  ContactSection,
  FaqSection,
  Footer,
  GridGallerySection,
  MainHeader,
  MainMobileNavigation,
  MembersSection,
  NewsSection,
  SideBar,
  Splash,
  StyledInnerContainer,
  TopSection,
} from '@tama/ui';
import { User } from '@tama/types';
import { useScrollBlock } from '@tama/hooks';
import { shuffle } from '@tama/utils';
import { userCardsData } from '@tama/data';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      users: shuffle(userCardsData),
    },
  };
};

interface IndexPageProps {
  users: User[];
}

const IndexPage: NextPage<IndexPageProps> = ({ users }) => {
  const { user } = useUser();
  const [activeHamburger, setActiveHamburger] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const { data: userData } = useQuery<User[]>(
    ['users'],
    () => {
      return users;
    },
    {
      initialData: users,
      suspense: true,
    }
  );

  const handleHamburger = () => {
    if (activeHamburger) {
      allowScroll();
    } else {
      blockScroll();
    }
    setActiveHamburger(!activeHamburger);
  };

  return (
    <>
      <Splash active>
        <MainHeader user={user} isActive={activeHamburger} />
        <MainMobileNavigation
          user={user}
          isActive={activeHamburger}
          onClickButton={handleHamburger}
        />
        <StyledInnerContainer>
          <TopSection />
          <AboutSection />
          <QueryErrorResetBoundary>
            {({ reset }) => {
              return (
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={reset}
                >
                  <Suspense fallback={<p>Loading member...</p>}>
                    <MembersSection users={userData} />
                  </Suspense>
                </ErrorBoundary>
              );
            }}
          </QueryErrorResetBoundary>
          <NewsSection />
          <GridGallerySection />
          <FaqSection />
          <ContactSection />
        </StyledInnerContainer>
        <Footer />
      </Splash>
      <SideBar />
    </>
  );
};

export default IndexPage;
