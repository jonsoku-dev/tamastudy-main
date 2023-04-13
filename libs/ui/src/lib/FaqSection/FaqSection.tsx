import MainSection from '../MainSection/MainSection';
import styled from 'styled-components';
import { Accordion } from '../Accordion';
import React from 'react';

interface FaqSectionProps {}

export const FaqSection: React.FC<FaqSectionProps> = () => {
  return (
    <MainSection elementName="faq" hasTitle>
      <div>
        <StyledAccordionArea>
          <Accordion
            title="참가 조건은 어떻게 되나요?"
            description="한달 2번 이상 꾸준히 참석하실 분이라면 누구나 참가 가능합니다."
          />
          <Accordion
            title="참석비가 있나요?"
            description="장소에 따라 참석비가 있을 수 있습니다. <br />보통 1회 3,000엔 ~ 5,000엔 정도입니다."
          />
          <Accordion
            title="장소는 어디인가요?"
            description="장소에 따라 유동적으로 변경됩니다."
          />
          <Accordion
            title="참가 신청은 어떻게 하나요?"
            description="아래 Contact 섹션을 이용해주세요."
          />
        </StyledAccordionArea>
      </div>
    </MainSection>
  );
};

/**
 * Accordion
 */

const StyledAccordionArea = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  li {
    margin: 16px 0;
  }

  section {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
    background-color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
  }
`;
