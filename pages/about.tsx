// pages/about.tsx
import MyComponent from '@/components/MyComponent';
import { NextPage } from 'next';

const About: NextPage = () => {
  return (
    MyComponent({ title: 'Sobre', content: 'Esta é a página Sobre' })
  )
};

export default About;
