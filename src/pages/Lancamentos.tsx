import { useEffect, useState } from 'react';
import { 
  Container, Typography, List, ListItem, ListItemText, Paper, Divider, 
  IconButton, Button, Box, Fab, Dialog, DialogTitle, DialogContent, 
  TextField, DialogActions, MenuItem, Select, InputLabel, FormControl,
  ToggleButton, ToggleButtonGroup 
} from '@mui/material';

// Ícones
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit'; 
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // 📈 Agora vamos usar de verdade!

import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Lancamento {
  id: string;
  descricao: string;
  valor: number;
  dataLancamento: string;
  tipo: number; // 1=Receita, 2=Despesa, 3=Investimento
  categoriaId: string;
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
  
  // Estados do Formulário
  const [idEdicao, setIdEdicao] = useState(''); 
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaId, setCategoriaId] = useState(''); 
  const [tipo, setTipo] = useState(2); 

  useEffect(() => {
    async function carregarDados() {
    try {
      const respLancamentos = await api.get('/Lancamentos');
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
      setExtrato(respLancamentos.data);

      const respCategorias = await api.get('/Categorias');
      setCategorias(respCategorias.data);
    } catch (erro) {
      console.error("Erro ao carregar dados", erro);
    }
  }

  function abrirNovo() {
    setIdEdicao(''); 
    setDescricao('');
    setValor('');
    setCategoriaId('');
    setTipo(2);
    setOpen(true);
  }

  function abrirEdicao(item: Lancamento) {
    setIdEdicao(item.id); 
    setDescricao(item.descricao);
    setValor(item.valor.toString());
    setCategoriaId(item.categoriaId);
    setTipo(item.tipo);
    setOpen(true);
  }

  async function salvar() {
    if (!descricao || !valor || !categoriaId) return alert("Preencha tudo!");

    try {
      const payload = {
        descricao,
        valor: parseFloat(valor),
        categoriaId,
        dataLancamento: new Date().toISOString(),
        tipo: tipo
      };

      if (idEdicao) {
        await api.put(`/Lancamentos/${idEdicao}`, { ...payload, id: idEdicao });
        alert('Lançamento atualizado!');
      } else {
        await api.post('/Lancamentos', payload);
        alert('Lançamento criado!');
      }
      
      setOpen(false); 
      carregarDados(); 
      
    } catch (erro) {
      console.error(erro);
      alert('Erro ao salvar.');
    }
  }

  async function deletar(id: string) {
    if(!confirm("Tem certeza que quer apagar?")) return;
    try {
      await api.delete(`/Lancamentos/${id}`);
      setExtrato(atual => atual.filter(item => item.id !== id));
    } catch (erro) {
      console.error(erro);
      alert("Erro ao deletar");
    }
  }

  // Função auxiliar para decidir a cor do VALOR
  const getCorValor = (tipo: number) => {
    if (tipo === 1) return 'green';      
    if (tipo === 2) return 'red';        
    if (tipo === 3) return '#1976d2';    // Azul
    return 'black';
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', paddingBottom: '100px' }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
            <Typography variant="h4">Meu Extrato 💲</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={abrirNovo}>
                Novo Lançamento
            </Button>
        </Box>
        <Button variant="outlined" onClick={() => navigate('/menu')}>Voltar</Button>
      </Box>

      <Paper elevation={3}>
        <List>
          {extrato.map((item) => (
            <div key={item.id}>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingRight: 2
                }}
              >
                <ListItemText 
                  primary={item.descricao} 
                  secondary={new Date(item.dataLancamento).toLocaleDateString()} 
                  sx={{ maxWidth: '50%' }}
                />
                
                <Box display="flex" alignItems="center">
                  
                  {/* ÁREA DO VALOR E ÍCONE */}
                  <Box display="flex" alignItems="center" mr={2}>
                    {/* Se for Investimento (3), mostra o ícone. Se não, mostra + ou - */}
                    {item.tipo === 3 ? (
                        <TrendingUpIcon sx={{ color: '#1976d2', marginRight: 1 }} fontSize="small" />
                    ) : (
                        <Typography 
                            component="span" 
                            sx={{ 
                                fontWeight: 'bold', 
                                marginRight: 1, 
                                color: item.tipo === 1 ? 'green' : 'red' 
                            }}
                        >
                            {item.tipo === 1 ? '+ ' : '- '}
                        </Typography>
                    )}

                    <Typography 
                        variant="body1" 
                        sx={{ 
                        color: getCorValor(item.tipo),
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap'
                        }}
                    >
                        R$ {item.valor.toFixed(2)}
                    </Typography>
                  </Box>

                  {/* BOTÕES DE AÇÃO */}
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
        </List>
      </Paper>

      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}
        onClick={abrirNovo}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{idEdicao ? 'Editar Lançamento' : 'Novo Lançamento'}</DialogTitle>
        <DialogContent>
          
          <Box display="flex" justifyContent="center" mb={2} mt={1}>
             <ToggleButtonGroup
                value={tipo}
                exclusive
                onChange={(e, novoTipo) => { if(novoTipo) setTipo(novoTipo) }}
                aria-label="Tipo de Lançamento"
             >
                <ToggleButton value={1} sx={{ color: 'green' }}>💰 Receita</ToggleButton>
                <ToggleButton value={2} sx={{ color: 'red' }}>💸 Despesa</ToggleButton>
                
                {/* AQUI ESTÁ O ÍCONE SENDO USADO 👇 */}
                <ToggleButton value={3} sx={{ color: '#1976d2' }}>
                    <TrendingUpIcon sx={{ mr: 1 }} /> Investimento
                </ToggleButton>
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
          <Button onClick={salvar} variant="contained">
            {idEdicao ? 'Atualizar' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}