import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Card, CardContent } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [saldo, setSaldo] = useState<number>(0);
  const navigate = useNavigate();

  // Busca o saldo assim que a tela carrega
  useEffect(() => {
    api.get('/Lancamentos/saldo')
       .then(response => setSaldo(response.data))
       .catch(err => console.error("Erro ao buscar saldo", err));
  }, []);

  function logout() {
    localStorage.removeItem('financeiro_token');
    navigate('/login');
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meu Financeiro
          </Typography>
          <Button color="inherit" onClick={logout}>Sair</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Card sx={{ minWidth: 275, maxWidth: 300, bgcolor: '#e3f2fd' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Saldo Atual
            </Typography>
            <Typography variant="h4" component="div" color={saldo >= 0 ? "green" : "red"}>
              R$ {Number(saldo || 0).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}