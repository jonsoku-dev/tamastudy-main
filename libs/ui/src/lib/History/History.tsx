import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface History {
  id: number;
  year: number;
  month: number;
  title: string;
  description?: string;
}

const histories: History[] = [
  {
    id: 1,
    year: 2019,
    month: 5,
    title: '감정한, 이종석 만남',
  },
  {
    id: 2,
    year: 2019,
    month: 7,
    title: '타마스터디 결성',
  },
  {
    id: 3,
    year: 2019,
    month: 8,
    title: '타마스터디 in 미조노구치',
  },
  {
    id: 4,
    year: 2019,
    month: 12,
    title: '멤버 이종석 Persol 퇴사 및 LINE 입사',
  },
  {
    id: 5,
    year: 2020,
    month: 12,
    title: '멤버 박동민 Arcphilia 입사',
  },
  {
    id: 6,
    year: 2021,
    month: 2,
    title: '멤버 감정한 Rakuten 퇴사 및 LINE 입사',
  },
  {
    id: 7,
    year: 2022,
    month: 6,
    title: '멤버 감정한 LINE 퇴사 및 AMAZON JP 입사',
  },
  {
    id: 8,
    year: 2022,
    month: 12,
    title: '멤버 박형일 AIS 퇴사 및 TeamLab 입사',
  },
  {
    id: 9,
    year: 2023,
    month: 2,
    title: '멤버 박동민 Arcphilia 퇴사 및 TORIHADA 입사',
  },
];

interface HistoryProps {}

function getAbsoluteHeight<T extends HTMLElement>(el: T) {
  const styles = window.getComputedStyle(el);
  const margin =
    parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

export const History: React.FC<HistoryProps> = () => {
  const refs = useRef<HTMLLIElement[]>([]);

  const scrollTimelineAnime = () => {
    refs.current.forEach((ref, refIndex) => {
      if (refIndex === refs.current.length - 1) return;
      const elemPos = ref.offsetTop; // 上からの高さ取得
      const scroll = window.scrollY; // スクロール値取得
      const windowHeight = window.screen.height; // windowの高さ取得
      const startPoint = 350; //線をスタートさせる位置を指定※レイアウトによって調整してください

      if (scroll >= elemPos - windowHeight - startPoint) {
        const H = getAbsoluteHeight(ref); //liの余白と高さを含めた数値を取得
        //スクロール値から要素までの高さを引いた値を、liの高さの半分のパーセントで出す
        let percent = ((scroll + startPoint - elemPos) / (H / 2)) * 100; //liの余白と高さの半分で線を100％に伸ばす
        if (percent > 100) {
          percent = 100;
        }
        if (percent < 0) {
          percent = 0;
        }
        const borderLines = Array.from(ref.children).filter((child) => {
          return child.classList.contains('border-line');
        });

        borderLines.forEach((borderLine) => {
          const _borderLine = borderLine as HTMLSpanElement;
          _borderLine.style.height = percent + '%';
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollTimelineAnime);
    window.addEventListener('load', scrollTimelineAnime);
    return () => {
      window.removeEventListener('scroll', scrollTimelineAnime);
      window.removeEventListener('load', scrollTimelineAnime);
    };
  }, []);

  return (
    <StyledTimeLineWrapper className="timeline">
      {histories.map((history, index) => {
        return (
          <li
            key={index}
            ref={(element) => {
              if (element) {
                refs.current[index] = element;
              }
            }}
          >
            <dl>
              <dt>
                {history.year}년 {history.month}월
              </dt>
              <dd>
                <strong>{history.title}</strong>
                {history?.description && <p>{history.description}</p>}
              </dd>
            </dl>
            <span className="border-line"></span>
          </li>
        );
      })}
    </StyledTimeLineWrapper>
  );
};

const StyledTimeLineWrapper = styled.ul`
  max-width: 400px;
  width: 100%;
  margin: 50px auto;
  padding: 0 30px;

  ${({ theme }) => theme.media.laptop`
      margin: 0;
      padding: 0;
  `};

  & li {
    /*線の起点とするためrelativeを設定*/
    position: relative;
    list-style: none;
    padding: 0 0 20px 0;
  }

  & dl {
    margin: 0 0 20px 3em;
  }

  & dd strong {
    display: block;
    padding: 10px 0;
  }

  .border-line {
    position: absolute;
    left: 0.2em;
    top: 0;
    width: 3px;
    height: 0;
    background: ${(props) => props.theme.colors.primary};
    opacity: 0.1;
  }

  & li::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
  }
`;
