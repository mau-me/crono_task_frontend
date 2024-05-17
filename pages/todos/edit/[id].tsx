// pages/todos/edit/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import api from '../../../utils/api';

const EditTodo = () => {
    const router = useRouter();
    const { id } = router.query;
    const [todo, setTodo] = useState({ title: '', description: '', tag: '', state: 'todo' });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await api.get(`/todos/${id}`);
                setTodo(response.data);
            } catch (err) {
                console.error('Erro ao buscar atividade', err);
            }
        };

        if (id) {
            fetchTodo();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.patch(`/todos/${id}`, todo);
            router.push('/todos');
        } catch (err) {
            console.error('Erro ao atualizar atividade', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Editar Atividade</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Título"
                    name="title"
                    value={todo.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Descrição"
                    name="description"
                    value={todo.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Tag"
                    name="tag"
                    value={todo.tag}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    select
                    label="Status"
                    name="state"
                    value={todo.state}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                >
                    <MenuItem value="draft">Rascunho</MenuItem>
                    <MenuItem value="todo">A Fazer</MenuItem>
                    <MenuItem value="doing">Fazendo</MenuItem>
                    <MenuItem value="done">Concluído</MenuItem>
                    <MenuItem value="trash">Lixeira</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                    Atualizar Atividade
                </Button>
            </form>
        </Container>
    );
};

export default EditTodo;
