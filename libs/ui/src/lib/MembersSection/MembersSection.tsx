'use client';
import MainSection from '../MainSection/MainSection';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import UserCard from '../UserCard/UserCard';

interface MembersSectionProps {
  users: any[];
}

export const MembersSection: React.FC<MembersSectionProps> = ({ users }) => {
  return (
    <MainSection elementName="members" hasTitle>
      <StyledSwiperWrapper>
        <Swiper
          modules={[A11y]}
          spaceBetween={16}
          slidesPerView="auto"
          grabCursor
        >
          {users.map((user) => (
            <SwiperSlide key={user.id}>
              <UserCard {...user} bgNum={users.length % 3} />
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiperWrapper>
    </MainSection>
  );
};

const StyledSwiperWrapper = styled.div`
  isolation: isolate;
  position: relative;
  z-index: 1;

  .swiper-slide {
    width: auto;
  }
`;
