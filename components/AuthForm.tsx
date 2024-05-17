// components/AuthForm.tsx
import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface AuthFormProps {
    onSubmit: (data: { name?: string; email: string; password: string }) => void;
    showNameField?: boolean;
    title?: string; // Tornar o título opcional
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, showNameField = false, title }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ name, email, password });
    };

    return (
        <Container maxWidth="sm">
            {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
            <form onSubmit={handleSubmit}>
                {showNameField && (
                    <TextField
                        fullWidth
                        label="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        margin="normal"
                    />
                )}
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                    {title ? title : 'Submit'}
                </Button>
            </form>
        </Container>
    );
};

export default AuthForm;
