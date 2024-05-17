// pages/todos/index.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';
import api from '../../utils/api';
import LogoutButton from '../../components/LogoutButton';

interface Todo {
    id: number;
    title: string;
    description: string;
    tag: string;
    state: string;
}

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await api.get('/todos');
            setTodos(response.data.todos);
        } catch (err) {
            console.error('Erro ao buscar atividades', err);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await api.delete(`/todos/${id}`);
            fetchTodos();
        } catch (err) {
            console.error('Erro ao deletar atividade', err);
        }
    };

    const handleEditTodo = (id: number) => {
        router.push(`/todos/edit/${id}`);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4">Minhas Atividades</Typography>
                <LogoutButton />
            </Box>
            <Link href="/todos/add">
                <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
                    Adicionar Nova Atividade
                </Button>
            </Link>
            <List>
                {todos.map((todo) => (
                    <ListItem key={todo.id} button>
                        <ListItemText
                            primary={todo.title}
                            secondary={
                                <>
                                    <Typography variant="body2" component="span">
                                        Descrição: {todo.description}
                                    </Typography>
                                    <Box component="span" style={{ display: 'block', marginTop: '8px' }}>
                                        <Typography variant="body2" component="span">
                                            Tag: {todo.tag}
                                        </Typography>
                                        <Typography variant="body2" component="span" style={{ display: 'block', marginTop: '4px' }}>
                                            Estado: {todo.state}
                                        </Typography>
                                    </Box>
                                </>
                            }
                        />
                        <Button variant="outlined" color="primary" onClick={() => handleEditTodo(todo.id)}>Editar</Button>
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteTodo(todo.id)}>Deletar</Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default withAuth(Todos);
