import { useEffect, useState } from 'react';
import { 
  Container, Typography, List, ListItem, ListItemText, Paper, Divider, 
  IconButton, Button, Box, Fab, Dialog, DialogTitle, DialogContent, 
  TextField, DialogActions, MenuItem, Select, InputLabel, FormControl,
  ToggleButton, ToggleButtonGroup 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddIcon from '@mui/icons-material/Add'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// 1. AJUSTEI AQUI CONFORME SEU PRINT DO CONSOLE
interface Lancamento {
  id: string;
  descricao: string;
  valor: number;
  dataLancamento: string; // Mudou de 'data' para 'dataLancamento'
  tipo: number; // Adicionei o tipo (1 ou 2)
  categoriaNome?: string; 
}

interface Categoria {
  id: string;
  nome: string;
}

export default function Lancamentos() {
  const navigate = useNavigate();
  
  const [extrato, setExtrato] = useState<Lancamento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]); 
  
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaId, setCategoriaId] = useState(''); 
  const [tipo, setTipo] = useState(2); // Começa como 2 (Despesa) por padrão

  useEffect(() => {
    async function carregarDados() {
    try {
      const respLancamentos = await api.get('/Lancamentos');
      console.log("DADOS REAIS:", respLancamentos.data); // Pra gente conferir
      setExtrato(respLancamentos.data);

      const respCategorias = await api.get('/Categorias');
      setCategorias(respCategorias.data);
    } catch (erro) {
      console.error("Erro ao carregar dados", erro);
    }
  }
  
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const respLancamentos = await api.get('/Lancamentos');
      console.log("DADOS REAIS:", respLancamentos.data); // Pra gente conferir
      setExtrato(respLancamentos.data);

      const respCategorias = await api.get('/Categorias');
      setCategorias(respCategorias.data);
    } catch (erro) {
      console.error("Erro ao carregar dados", erro);
    }
  }

  async function criarLancamento() {
    if (!descricao || !valor || !categoriaId) return alert("Preencha tudo!");

    try {
      const payload = {
        descricao,
        valor: parseFloat(valor),
        categoriaId,
        dataLancamento: new Date().toISOString(), // Mudei aqui para dataLancamento também
        tipo: tipo // Usa o tipo que escolhemos (1 ou 2)
      };

      await api.post('/Lancamentos', payload);
      
      setOpen(false); 
      carregarDados(); 
      
      setDescricao('');
      setValor('');
      setCategoriaId('');

    } catch (erro) {
      alert('Erro ao salvar lançamento. ' + erro);
    }
  }

  async function deletar(id: string) {
    if(!confirm("Apagar este lançamento?")) return;
    try {
      await api.delete(`/Lancamentos/${id}`);
      setExtrato(atual => atual.filter(item => item.id !== id));
    } catch (erro) {
      alert("Erro ao deletar lançamento. " + erro);
    }
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', paddingBottom: '80px' }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Meu Extrato 💲</Typography>
        <Button variant="outlined" onClick={() => navigate('/menu')}>Voltar</Button>
      </Box>

      <Paper elevation={3}>
        <List>
          {extrato.map((item) => (
            <div key={item.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => deletar(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={item.descricao} 
                  // 2. CORRIGIDO AQUI: dataLancamento
                  secondary={new Date(item.dataLancamento).toLocaleDateString()} 
                />
                
                {/* 3. LÓGICA DA COR: Se tipo for 2 (Despesa), Vermelho. Senão, Verde */}
                <Typography 
                  variant="body1" 
                  style={{ 
                    color: item.tipo === 2 ? 'red' : 'green', 
                    fontWeight: 'bold' 
                  }}
                >
                  {/* Coloca um sinalzinho de menos visualmente se for despesa */}
                  {item.tipo === 2 ? '- ' : '+ '}
                  R$ {item.valor.toFixed(2)}
                </Typography>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>

      <Fab color="primary" style={{ position: 'fixed', bottom: 20, right: 20 }} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Novo Lançamento</DialogTitle>
        <DialogContent>
          
          {/* BOTÕES PARA ESCOLHER RECEITA OU DESPESA */}
          <Box display="flex" justifyContent="center" mb={2} mt={1}>
             <ToggleButtonGroup
                value={tipo}
                exclusive
                onChange={(e, novoTipo) => { if(novoTipo) setTipo(novoTipo) }}
             >
                <ToggleButton value={1} color="success">💰 Receita</ToggleButton>
                <ToggleButton value={2} color="error">💸 Despesa</ToggleButton>
             </ToggleButtonGroup>
          </Box>

          <TextField
            autoFocus margin="dense" label="Descrição" fullWidth
            value={descricao} onChange={(e) => setDescricao(e.target.value)}
          />
          
          <TextField
            margin="dense" label="Valor (R$)" type="number" fullWidth
            value={valor} onChange={(e) => setValor(e.target.value)}
          />

          <FormControl fullWidth margin="dense" style={{ marginTop: 20 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={categoriaId}
              label="Categoria"
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              {categorias.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={criarLancamento} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}