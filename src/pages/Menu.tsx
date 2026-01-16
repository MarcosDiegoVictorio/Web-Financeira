import { Container, Typography, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid'; // Ou o import que funcionou pra você no Dashboard
import { useNavigate } from 'react-router-dom';

// Ícones
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BarChartIcon from '@mui/icons-material/BarChart';

interface MenuButtonProps {
  titulo: string;
  subtitulo: string;
  icone: React.ElementType;
  onClick: () => void;
  cor: string;
}

function MenuButton({ titulo, subtitulo, icone: Icone, onClick, cor }: MenuButtonProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          backgroundColor: `${cor}20`,
          p: 2,
          borderRadius: '50%',
          mr: 2,
          display: 'flex',
        }}
      >
        <Icone sx={{ fontSize: 32, color: cor }} />
      </Box>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitulo}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function Menu() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      
      <Box textAlign="center" mb={6}>
        <AccountBalanceWalletIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Minha Carteira
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          O que você deseja fazer hoje?
        </Typography>
      </Box>

      <Grid container spacing={3}>
        
        {/* 1. DASHBOARD */}
        {/* AGORA SIM: Usando size={{...}} conforme você corrigiu */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MenuButton 
            titulo="Dashboard" 
            subtitulo="Visão geral e gráficos"
            icone={BarChartIcon}
            cor="#9c27b0"
            onClick={() => navigate('/dashboard')}
          />
        </Grid>

        {/* 2. EXTRATO */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MenuButton 
            titulo="Meu Extrato" 
            subtitulo="Adicionar ou editar lançamentos"
            icone={ListAltIcon}
            cor="#2e7d32"
            onClick={() => navigate('/lancamentos')}
          />
        </Grid>

        {/* 3. CATEGORIAS */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MenuButton 
            titulo="Categorias" 
            subtitulo="Organize seus gastos"
            icone={CategoryIcon}
            cor="#ed6c02"
            onClick={() => navigate('/categorias')}
          />
        </Grid>

        {/* 4. SAIR */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MenuButton 
            titulo="Sair do Sistema" 
            subtitulo="Encerrar sessão"
            icone={ExitToAppIcon}
            cor="#d32f2f"
            onClick={() => {
                alert("Até logo! 👋");
                navigate('/'); 
            }}
          />
        </Grid>

      </Grid>

      <Box mt={8} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          Versão 1.0.0 — Desenvolvido com React & Material UI
        </Typography>
      </Box>

    </Container>
  );
}