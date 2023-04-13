import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { StyledContactForm } from './ContactSection.styles';
import * as yup from 'yup';
import { MainSection } from '../MainSection';
import axios, { AxiosError } from 'axios';

interface IFormInputs {
  username: string;
  email: string;
  age: number;
  message: string;
  kakaoId?: string;
  lineId?: string;
}

const schema = yup
  .object({
    username: yup
      .string()
      .required('성함을 입력해주세요.')
      .typeError('문자를 입력해주세요.'),
    email: yup
      .string()
      .email('이메일 양식으로 입력해주세요.')
      .required('이메일을 입력해주세요.'),
    age: yup
      .number()
      .required('나이를 입력해주세요.')
      .typeError('나이(숫자)를 입력해주세요.'),
    message: yup
      .string()
      .required('메시지를 입력해주세요.')
      .typeError('문자를 입력해주세요.'),
    kakaoId: yup.string().typeError('문자를 입력해주세요.'),
    lineId: yup.string().typeError('문자를 입력해주세요.'),
  })
  .required();

const generatePlaceholder = (name: string) => `${name}을/를 입력해주세요.`;

interface ContactSectionProps {}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const { mutate: createContact, isLoading: createContactLoading } =
    useMutation<Response, AxiosError, IFormInputs, Response>({
      mutationFn: (values) => {
        return axios.post('/api/contact', values);
      },
      onSuccess: () => {
        reset();
        toast.success('성공적으로 전송되었습니다. 감사합니다. 🙏🏻');
      },
      onError: () => {
        toast.error('전송에 실패했습니다. 다시 시도해주세요. 😭');
      },
    });

  return (
    <MainSection elementName="contact" hasTitle>
      <StyledContactForm onSubmit={handleSubmit((data) => createContact(data))}>
        <div>
          <label htmlFor="username">성함</label>
          <div>
            <input
              {...register('username')}
              id="username"
              placeholder={generatePlaceholder('성함')}
            />
            <p>{errors.username?.message}</p>
          </div>
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <div>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder={generatePlaceholder('이메일')}
            />
            <p>{errors.email?.message}</p>
          </div>
        </div>
        <div>
          <label htmlFor="age">나이</label>
          <div>
            <input
              {...register('age')}
              id="age"
              type="number"
              placeholder={generatePlaceholder('나이')}
            />
            <p>{errors.age?.message}</p>
          </div>
        </div>
        <div>
          <label htmlFor="message">메시지</label>
          <div>
            <textarea
              {...register('message')}
              id="message"
              placeholder={generatePlaceholder('메시지')}
            />
            <p>{errors.message?.message}</p>
          </div>
        </div>
        <div>
          <label htmlFor="lineId">라인</label>
          <div>
            <input
              {...register('lineId')}
              id="lineId"
              placeholder={generatePlaceholder('라인 아이디')}
            />
            <p>{errors.lineId?.message}</p>
          </div>
        </div>
        <div>
          <label htmlFor="kakaoId">카카오</label>
          <div>
            <input
              {...register('kakaoId')}
              id="kakaoId"
              placeholder={generatePlaceholder('카카오 아이디')}
            />
            <p>{errors.kakaoId?.message}</p>
          </div>
        </div>
        <button type="submit" disabled={createContactLoading}>
          제출
        </button>
      </StyledContactForm>
    </MainSection>
  );
};
