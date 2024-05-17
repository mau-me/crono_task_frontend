// pages/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Button } from '@mui/material';
import Link from 'next/link';
import api from '@/utils/api';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    try {
      if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      const response = await api.post('/auth/token', new URLSearchParams({
        username: email,
        password: password,
      }));
      localStorage.setItem('token', response.data.access_token);
      router.push('/todos'); // Redirecionar para a página de atividades
    } catch (err) {
      console.error('Erro ao fazer login:', err); // Imprime o erro no console para depuração
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <>
      <AuthForm title="Login" onSubmit={handleLogin} />
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <Typography variant="body1" align="center" style={{ marginTop: '16px' }}>
        Ainda não tem uma conta?{' '}
        <Link href="/auth/register">
          <Button color="primary" variant="text">Registrar</Button>
        </Link>
      </Typography>
    </>
  );
};

export default Login;
