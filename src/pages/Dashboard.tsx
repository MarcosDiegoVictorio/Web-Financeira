import { useEffect, useState, type ElementType } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// IMPORTS DO GRÁFICO
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

// 1. A CORREÇÃO MÁGICA ESTÁ AQUI 👇
interface DadosGrafico {
  name: string;
  value: number;
  // Essa linha permite que o Recharts leia os dados sem reclamar
  [key: string]: string | number; 
}

// --- COMPONENTE DO CARTÃO ---
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
  
  const [saldo, setSaldo] = useState(0);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  
  // O Estado usa a interface corrigida
  const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico[]>([]);

  useEffect(() => {
    async function calcularTotais() {
    try {
      const resposta = await api.get('/Lancamentos');
      const lista = resposta.data;

      let totalEntrada = 0;
      let totalSaida = 0;

      lista.forEach((item: Lancamento) => {
        if (item.tipo === 1) {
          totalEntrada += item.valor;
        } else if (item.tipo === 2) {
          totalSaida += item.valor;
        }
      });

      setEntradas(totalEntrada);
      setSaidas(totalSaida);
      setSaldo(totalEntrada - totalSaida);

      // Prepara os dados
      setDadosGrafico([
        { name: 'Entradas', value: totalEntrada },
        { name: 'Saídas', value: totalSaida },
      ]);

    } catch (erro) {
      console.error("Erro ao calcular", erro);
    }
  }

    calcularTotais();
  }, []);

  

  const CORES = ['#2e7d32', '#d32f2f']; 

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, paddingBottom: 10 }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Visão Geral 📊</Typography>
        <Button variant="contained" onClick={() => navigate('/menu')}>
          Menu Principal
        </Button>
      </Box>

      <Grid container spacing={3}>
        
        {/* CARTÕES DE RESUMO */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <CardResumo titulo="Entradas" valor={entradas} cor="#2e7d32" Icone={ArrowUpwardIcon} />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <CardResumo titulo="Saídas" valor={saidas} cor="#d32f2f" Icone={ArrowDownwardIcon} />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <CardResumo titulo="Saldo Total" valor={saldo} cor={saldo >= 0 ? '#1976d2' : '#d32f2f'} Icone={AccountBalanceWalletIcon} />
        </Grid>

        {/* ÁREA DO GRÁFICO */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ padding: 3, marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Resumo Visual</Typography>
            
            {entradas === 0 && saidas === 0 ? (
              <Typography color="textSecondary" sx={{ py: 5 }}>
                Sem dados para gerar gráfico.
              </Typography>
            ) : (
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosGrafico}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dadosGrafico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number | undefined) => `R$ ${Number(value || 0).toFixed(2)}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </Paper>
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