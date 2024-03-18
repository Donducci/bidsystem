// sign-in.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FormInput from "@/libs/shared-components/form-input/form-input";
import { CallToAction } from "@/libs/shared-components/callToAction/callToAction";
import { SignInOverlay, SignInContainer, SignInHeader, SignInForm, ButtonWrapper, Label, FormContainer } from "./login.style";
import { userApi } from '../api';
import Layout from '@/layout/layout';

export default function SignIn() {
  const { push } = useRouter();

  const contents = [
    { type: 'email', label: 'Email address', name: 'email' },
    { type: 'password', label: 'Password', name: 'password' }
  ];

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await userApi(formData);
      if (response && response.message) {
        localStorage.setItem('token', response.token);
        push('/home')
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <Layout withFooter={false} widhHeader={false}>
      <SignInOverlay>
        <SignInContainer>
          <SignInHeader>Sign in</SignInHeader>
          <SignInForm onSubmit={handleSubmit} noValidate>
            {error && <p>{error}</p>}
            {
              contents.map((content, index) => (
                <FormContainer key={index}>
                  <Label>{content.label}</Label>
                  <FormInput type={content.type} label={content.label} name={content.name} onChange={handleChange} />
                </FormContainer>
              ))
            }
            <ButtonWrapper><CallToAction type="submit" label="SignIn" /></ButtonWrapper>
          </SignInForm>
        </SignInContainer>
      </SignInOverlay>
    </Layout>
  )
}
