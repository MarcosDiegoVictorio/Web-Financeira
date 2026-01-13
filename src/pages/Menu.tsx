import { Button, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid'; // Importação padrão da v6
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem('financeiro_token');
    navigate('/');
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Sistema! 🚀
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        O que você deseja fazer hoje?
      </Typography>

      {/* Container: define o espaçamento */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        
        {/* OPÇÃO 1: Lançamentos */}
        {/* Note: NÃO tem 'item'. O tamanho fica dentro de 'size' */}
        <Grid size={{ xs: 12, sm: 4 }}> 
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">💰 Financeiro</Typography>
            <Button variant="outlined" fullWidth style={{ marginTop: '10px' }}
            onClick={() => navigate('/lancamentos')}>
              Ver Lançamentos
            </Button>
          </Paper>
        </Grid>

        {/* OPÇÃO 2: Categorias */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">📂 Organização</Typography>
            <Button 
            variant="outlined" 
            fullWidth style={{ marginTop: '10px' }}
            onClick={() => navigate('/Categorias')}>
              Gerenciar Categorias
            </Button>
          </Paper>
        </Grid>

        {/* OPÇÃO 3: Tipos */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">⚙️ Configurações</Typography>
            <Button variant="outlined" fullWidth style={{ marginTop: '10px' }}>
              Tipos de Lançamento
            </Button>
          </Paper>
        </Grid>

        {/* OPÇÃO 4: DASHBOARD (NOVO!) */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">📊 Visão Geral</Typography>
            <Button 
              variant="outlined" // Botão preenchido (azul) para destacar
              fullWidth 
              style={{ marginTop: '10px' }}
              onClick={() => navigate('/Dashboard')} // Leva para o Dashboard
            >
              Ver Gráficos
            </Button>
          </Paper>
        </Grid>

      </Grid>

      <Button color="error" onClick={sair} style={{ marginTop: '40px' }}>
        Sair do Sistema
      </Button>
    </Container>
  );
}