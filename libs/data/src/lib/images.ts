import { Image } from 'react-grid-gallery';
import { shuffle } from '@tama/utils';

export interface CustomImage extends Image {
  original: string;
}

const _images: CustomImage[] = [
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/4.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/4.jpg',
    width: 320,
    height: 500,
    tags: [],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/5.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/5.jpg',
    width: 320,
    height: 500,
    tags: [{ value: '런치', title: '런치' }],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/6.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/6.jpg',
    width: 320,
    height: 400,
    tags: [{ value: 'SQL문제풀이', title: 'SQL문제풀이' }],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/7.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/7.jpg',
    width: 480,
    height: 480,
    tags: [{ value: '정한님 이직축하', title: '정한님 이직축하' }],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/8.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/8.jpg',
    width: 320,
    height: 320,
    tags: [{ value: '열공모드', title: '열공모드' }],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/9.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/9.jpg',
    width: 320,
    height: 400,
    tags: [{ value: '쉐어라운지', title: '쉐어라운지' }],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/10.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/10.jpg',
    width: 320,
    height: 320,
    tags: [
      { value: '산뽀중 들른 스티커가게', title: '산뽀중 들른 스티커가게' },
    ],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/11.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/11.jpg',
    width: 200,
    height: 200,
    tags: [{ value: '갬성', title: '갬성' }],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/12.jpg',
    original:
      'https://bucket-rctv5y.s3.ap-northeast-1.amazonaws.com/gallery/12.jpg',
    width: 140,
    height: 200,
    tags: [{ value: '산뽀', title: '산뽀' }],
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
];

export const images = [...shuffle(_images)];
