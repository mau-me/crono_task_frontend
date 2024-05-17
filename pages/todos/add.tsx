// pages/todos/add.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import withAuth from '../../components/withAuth';
import api from '../../utils/api';
import LogoutButton from '../../components/LogoutButton';

const states = ["draft", "todo", "doing", "done", "trash"];

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [state, setState] = useState(states[0]);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/todos', { title, description, tag, state });
            router.push('/todos');
        } catch (err) {
            console.error('Erro ao adicionar atividade', err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" component="h1">Adicionar Nova Atividade</Typography>
                <LogoutButton />
            </Box>
            <TextField
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Estado"
                value={state}
                onChange={(e) => setState(e.target.value)}
                select
                fullWidth
                margin="normal"
                required
            >
                {states.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Adicionar
            </Button>
        </Box>
    );
};

export default withAuth(AddTodo);
