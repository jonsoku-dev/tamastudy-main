import MainSection from '../MainSection/MainSection';
import styled from 'styled-components';
import { History } from '../History';

interface AboutSectionProps {}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <MainSection elementName="about" hasTitle>
      <StyledAbout>
        <History />
        <p>
          타지에서 혼자 공부하기에는 정보의 부족이 심각했습니다. 공부를 목적으로
          모이는 사람들에게 항상 자신의 이익을 위해 접근하는 사람들 또한 문제
          였습니다. 그래서 저희는 사람들에게 선한 영향력을 주고 외국에서 서로
          힘이 되어주는 커뮤니티를 만들기로 결심하였습니다. 그 결과 현재까지도
          서로 도와주고 함께 성장하는 타마스터디를 운영하고 있습니다.
        </p>
      </StyledAbout>
    </MainSection>
  );
};

/**
 * Section 2 - Members
 */

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;

  > ul {
    order: 2;
  }

  > p {
    order: 1;
  }

  ${({ theme }) => theme.media.laptop`
    flex-direction: row;
    justify-content: space-around;
    > ul {
      order: 1;
    }
    > p {
      order: 2;
      width: 320px;
    }
  `};
`;
