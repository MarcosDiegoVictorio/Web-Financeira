import { useEffect, useState } from 'react';
import { 
  Container, Typography, List, ListItem, ListItemText, Paper, Divider, 
  IconButton, Button, Box, Fab, Dialog, DialogTitle, DialogContent, 
  TextField, DialogActions 
} from '@mui/material';

// Ícones
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit'; 

import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Categoria {
  id: string;
  nome: string;
  orcamentoMensal: number; // 🆕 Campo novo
}

export default function Categorias() {
  const navigate = useNavigate();
  
  const [lista, setLista] = useState<Categoria[]>([]);
  const [open, setOpen] = useState(false);
  const [idEdicao, setIdEdicao] = useState(''); 
  
  // Estados do Formulário
  const [nome, setNome] = useState('');
  const [orcamento, setOrcamento] = useState(''); // 🆕 Estado para o valor

  useEffect(() => {
    async function carregarDados() {
    try {
      const resposta = await api.get('/Categorias');
      setLista(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar categorias", erro);
    }
  }
  
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const resposta = await api.get('/Categorias');
      setLista(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar categorias", erro);
    }
  }

  function abrirNovo() {
    setIdEdicao(''); 
    setNome('');
    setOrcamento(''); // Limpa o orçamento
    setOpen(true);
  }

  function abrirEdicao(item: Categoria) {
    setIdEdicao(item.id);
    setNome(item.nome);
    setOrcamento(item.orcamentoMensal.toString()); // Preenche com o valor atual
    setOpen(true);
  }

  async function salvar() {
    if (!nome.trim()) return alert("Digite um nome!");

    try {
      // Prepara o objeto que a API espera
      const payload = {
        nome,
        orcamentoMensal: parseFloat(orcamento) || 0 // Se vazio, manda 0
      };

      if (idEdicao) {
        // --- EDIÇÃO (PUT) ---
        // Alguns backends pedem o ID dentro do corpo também
        await api.put(`/Categorias/${idEdicao}`, { id: idEdicao, ...payload });
        alert('Categoria atualizada!');
      } else {
        // --- CRIAÇÃO (POST) ---
        await api.post('/Categorias', payload);
        alert('Categoria criada!');
      }
      
      setOpen(false); 
      carregarDados(); 
      
    } catch (erro) {
      console.error(erro);
      alert('Erro ao salvar.');
    }
  }

  async function deletar(id: string) {
    if(!confirm("Tem certeza?")) return;
    
    try {
      await api.delete(`/Categorias/${id}`);
      setLista(atual => atual.filter(item => item.id !== id));
    } catch (erro) {
      console.error(erro);
      alert("Erro ao deletar. Verifique se não há lançamentos usando esta categoria.");
    }
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', paddingBottom: '100px' }}>
      
      {/* CABEÇALHO */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
            <Typography variant="h4">Categorias 📂</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={abrirNovo}>
                Nova Categoria
            </Button>
        </Box>
        <Button variant="outlined" onClick={() => navigate('/menu')}>Voltar</Button>
      </Box>

      {/* LISTAGEM */}
      <Paper elevation={3}>
        <List>
          {lista.map((item) => (
            <div key={item.id}>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingRight: 2
                }}
              >
                {/* Mostramos o Nome e o Orçamento embaixo (secondary text) */}
                <ListItemText 
                  primary={item.nome} 
                  secondary={`Orçamento: R$ ${item.orcamentoMensal?.toFixed(2) || '0.00'}`}
                />
                
                <Box>
                  <IconButton onClick={() => abrirEdicao(item)} size="small" sx={{ mr: 1 }}>
                    <EditIcon color="primary" />
                  </IconButton>
                  
                  <IconButton onClick={() => deletar(item.id)} size="small">
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>

              </ListItem>
              <Divider />
            </div>
          ))}
          
          {lista.length === 0 && (
            <Typography variant="body1" align="center" sx={{ p: 4, color: 'text.secondary' }}>
              Nenhuma categoria cadastrada.
            </Typography>
          )}

        </List>
      </Paper>

      {/* BOTÃO FLUTUANTE (+) */}
      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}
        onClick={abrirNovo}
      >
        <AddIcon />
      </Fab>

      {/* JANELA MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{idEdicao ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            label="Nome da Categoria"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Mercado, Lazer..."
          />

          {/* 🆕 CAMPO DE ORÇAMENTO */}
          <TextField
            margin="dense"
            label="Orçamento Mensal (Meta)"
            type="number"
            fullWidth
            value={orcamento}
            onChange={(e) => setOrcamento(e.target.value)}
            placeholder="Ex: 500.00"
            helperText="Quanto você planeja gastar por mês?"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={salvar} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}