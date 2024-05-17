// pages/auth/register.tsx
import api from '@/utils/api';
import AuthForm from '../components/AuthForm';
import { Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();

    const handleSubmit = async (data: { name?: string; email: string; password: string }) => {
        try {
            await api.post('/users', data);
            router.push('/');
        } catch (err) {
            console.error('Erro ao registrar', err);
        }
    };

    return (
        <AuthForm title="Registrar" onSubmit={handleSubmit} showNameField />
    );
};

export default Register;
