import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Link from 'next/link';
import React, { SVGProps } from 'react';
import styled, { css } from 'styled-components';
import { fetchData } from '@tama/data';
import { MainSection } from '../MainSection';

const NEWS_CATEGORIES = ['ALL', 'NOTICE', 'EVENT', 'FREE'] as const;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NewsSectionProps {}

export const NewsSection: React.FC<NewsSectionProps> = () => {
  const [{ pageIndex, pageSize, category }, setPagination] = React.useState<{
    category: string;
    pageIndex: number;
    pageSize: number;
  }>({
    category: 'all',
    pageIndex: 0,
    pageSize: 3,
  });

  const fetchDataOptions = {
    category,
    pageIndex,
    pageSize,
  };

  const dataQuery = useQuery(
    ['data', fetchDataOptions],
    () => fetchData(fetchDataOptions),
    { keepPreviousData: true }
  );

  return (
    <MainSection elementName="news" hasTitle>
      <StyledRootWrapper>
        <StyledRootInnerWrapper>
          <StyledNewsHeader>
            {NEWS_CATEGORIES.map((BUTTON_CATEGORY) => (
              <StyledCategoryButton
                key={BUTTON_CATEGORY}
                onClick={() => {
                  setPagination((prev) => ({
                    ...prev,
                    category: BUTTON_CATEGORY.toLowerCase(),
                  }));
                }}
                isActive={category == BUTTON_CATEGORY.toLowerCase()}
              >
                {BUTTON_CATEGORY}
              </StyledCategoryButton>
            ))}
          </StyledNewsHeader>
          <StyledItemGroupWrapper>
            {dataQuery.data?.rows
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((item) => (
                <StyledItemWrapper key={item.id}>
                  <StyledHeader>
                    <span>
                      {format(new Date(item.createdAt), 'dd MMM. yyyy')}
                    </span>
                    <span>{item.category.toUpperCase()}</span>
                  </StyledHeader>
                  <StyledContent>
                    <h4>
                      {item.title}
                      <Link href={`/news/${item.id}`}>
                        <LinkIcon
                          title={item.title}
                          titleId={item.id}
                          style={{ marginLeft: 8 }}
                        />
                      </Link>
                    </h4>

                    <p>{item.description}</p>
                  </StyledContent>
                </StyledItemWrapper>
              ))}
          </StyledItemGroupWrapper>
          <StyledNewsFooter>
            <button onClick={() => alert('Not Implemented')}>더보기</button>
          </StyledNewsFooter>
        </StyledRootInnerWrapper>
      </StyledRootWrapper>
    </MainSection>
  );
};

export default NewsSection;

interface SVGRProps {
  title?: string;
  titleId?: string;
}

const LinkIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    {...props}
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    aria-labelledby={titleId}
    viewBox="0 0 24 24"
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14 4H1v18h20V11h1v12H0V3h14v1zm10 5h-1V2.707L11.354 14.354l-.708-.708L22.293 2H16V1h8v8z" />
  </svg>
);

const StyledRootWrapper = styled.div``;
const StyledRootInnerWrapper = styled.div``;
const StyledNewsHeader = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
`;
const StyledCategoryButton = styled.button<{ isActive?: boolean }>`
  all: unset;
  display: block;
  text-align: center;
  border: 0;
  outline: none;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Jost', sans-serif;
  transition: 0.3s;

  ${({ isActive }) =>
    isActive
      ? css`
          background: linear-gradient(
            to right,
            rgba(195, 87, 225, 0.8) 0%,
            ${({ theme }) => theme.colors.primary} 96%
          );
          color: #fff;
        `
      : css`
          color: rgba(195, 87, 225, 0.8);
        `};
`;
const StyledItemGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const StyledItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::after {
    content: '';
    width: 100%;
    background-color: #eaeaea;
    height: 1px;
  }
`;
const StyledHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;

  > span {
    font-size: 0.8rem;

    &:first-of-type {
      display: block;
      position: relative;
      line-height: 1;

      &::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 100%;
        background-color: #000000;
        margin: 0 8px;
      }
    }
  }
`;
const StyledContent = styled.div`
  > h4 {
    font-size: 1rem;
    margin-bottom: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  > p {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const StyledNewsFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    all: unset;
    display: block;
    text-align: center;
    border: 0;
    outline: none;
    background: linear-gradient(
      to right,
      rgba(195, 87, 225, 0.8) 0%,
      ${({ theme }) => theme.colors.primary} 96%
    );
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    color: #fff;
    padding: 12px 16px;
    width: 100%;
    border-radius: 5px;
    margin-top: 32px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Jost', sans-serif;
    transition: 0.3s;

    ${({ theme }) => theme.media.laptop`
      width: 320px;
  `};
  }
`;
