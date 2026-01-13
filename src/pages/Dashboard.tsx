import { useEffect, useState, type ElementType } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Ícones
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// --- TIPOS ---
interface Lancamento {
  id: string;
  tipo: number;
  valor: number;
}

interface CardProps {
  titulo: string;
  valor: number;
  cor: string;
  Icone: ElementType;
}

// --- COMPONENTE DO CARTÃO (Separado) ---
function CardResumo({ titulo, valor, cor, Icone }: CardProps) {
  return (
    <Paper elevation={3} sx={{ padding: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="subtitle1" color="textSecondary">{titulo}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: cor }}>
          R$ {valor.toFixed(2)}
        </Typography>
      </Box>
      <Icone sx={{ fontSize: 40, color: cor, opacity: 0.7 }} />
    </Paper>
  );
}

// --- TELA PRINCIPAL ---
export default function Dashboard() {
  const navigate = useNavigate();
  
  // ESTADOS (Aqui guardamos os valores)
  const [saldo, setSaldo] = useState(0);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);

  useEffect(() => {
    async function calcularTotais() {
    try {
      const resposta = await api.get('/Lancamentos');
      const lista = resposta.data;

      let totalEntrada = 0;
      let totalSaida = 0;

      // O LOOP DA MATEMÁTICA
      lista.forEach((item: Lancamento) => {
        if (item.tipo === 1) {
          totalEntrada += item.valor;
        } else if (item.tipo === 2) {
          totalSaida += item.valor;
        }
      });

      // ATUALIZA A TELA (Conecta a matemática com o visual)
      setEntradas(totalEntrada);
      setSaidas(totalSaida);
      setSaldo(totalEntrada - totalSaida);

    } catch (erro) {
      console.error("Erro ao calcular", erro);
    }
  }
    calcularTotais();
  }, []);

  

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Visão Geral 📊</Typography>
        <Button variant="contained" onClick={() => navigate('/menu')}>
          Menu Principal
        </Button>
      </Box>

      <Grid container spacing={3}>
        
        {/* ENTRADAS */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <CardResumo 
            titulo="Entradas" 
            valor={entradas} // Conectado com o estado 'entradas'
            cor="green" 
            Icone={ArrowUpwardIcon} 
          />
        </Grid>

        {/* SAÍDAS */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <CardResumo 
            titulo="Saídas" 
            valor={saidas} // Conectado com o estado 'saidas' (Onde está o 290.06)
            cor="red" 
            Icone={ArrowDownwardIcon} 
          />
        </Grid>

        {/* SALDO */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <CardResumo 
            titulo="Saldo Total" 
            valor={saldo} 
            cor={saldo >= 0 ? '#1976d2' : 'red'} 
            Icone={AccountBalanceWalletIcon} 
          />
        </Grid>

      </Grid>

      <Box mt={5} textAlign="center">
        <Typography variant="body1" color="textSecondary" mb={2}>
          Quer ver os detalhes?
        </Typography>
        <Button variant="outlined" size="large" onClick={() => navigate('/lancamentos')}>
          Ir para o Extrato Completo
        </Button>
      </Box>

    </Container>
  );
}