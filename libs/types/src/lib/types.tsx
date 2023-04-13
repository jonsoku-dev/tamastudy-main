export interface User {
  id: string;
  username: string;
  about: string;
  email: string;
  profileImg: string;
  jobTitle: string;
  jobPlace: string;
  phone?: string;
  address?: string;
  customLinks?: {
    text: string;
    link: string;
  }[];
  kakaoId: string;
  lineId: string;
  sns?: {
    linkedIn?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    zenn?: string;
    github?: string;
  };
  bgImage?: string;
}
