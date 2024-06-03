// pages/todos/index.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, List, ListItem, ListItemText, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
    const [open, setOpen] = useState(false);
    const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);
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

    const handleClickOpen = (id: number) => {
        setTodoIdToDelete(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTodoIdToDelete(null);
    };

    const handleDeleteTodo = async () => {
        if (todoIdToDelete !== null) {
            try {
                await api.delete(`/todos/${todoIdToDelete}`);
                fetchTodos();
                handleClose();
            } catch (err) {
                console.error('Erro ao deletar atividade', err);
            }
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
                        <Button variant="outlined" color="secondary" onClick={() => handleClickOpen(todo.id)}>Deletar</Button>
                    </ListItem>
                ))}
            </List>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmação de Exclusão"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja excluir esta tarefa?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteTodo} color="secondary" autoFocus>
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default withAuth(Todos);
