import MainSection from '../MainSection/MainSection';
import styled from 'styled-components';

interface TopSectionProps {}

export const TopSection: React.FC<TopSectionProps> = () => {
  return (
    <MainSection elementName="top" isFirst>
      <StyledSlogan>
        <span>함</span>
        <span>께</span>
        <br />
        <strong>
          <span>성</span>
          <span>장</span>
        </strong>
        <span>하</span>
        <span>는</span>
        <br />
        <span>즐</span>
        <span>거</span>
        <span>움</span>
      </StyledSlogan>
    </MainSection>
  );
};

/**
 * Section 1
 */

const StyledSlogan = styled.div`
  padding-right: 16px;
  padding-left: 16px;
  font-size: 3.6rem;

  strong {
    color: ${({ theme }) => theme.colors?.primary ?? '#6500fc'};
  }
`;
