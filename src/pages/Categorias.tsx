import { useEffect, useState } from 'react';
import { 
  Container, Typography, List, ListItem, 
  ListItemText, Paper, Divider, IconButton, Button, Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Categoria {
  id: string;
  nome: string;
  orcamentoMensal: string;
}

export default function Categorias() {
  const [lista, setLista] = useState<Categoria[]>([]);
  const navigate = useNavigate();

  // 1. O DESPERTADOR (Mudamos aqui!)
  useEffect(() => {
    
    // Definimos a função AQUI DENTRO (agora ela é privada desse efeito)
    async function carregarCategorias() {
      try {
        const resposta = await api.get('/Categorias');
        setLista(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar:", erro);
      }
    }

    // Chamamos ela imediatamente
    carregarCategorias();

  }, []); // [] significa: execute apenas uma vez quando a tela nascer

  // A função de deletar continua fora, pois ela é chamada pelo clique do usuário (botão)
  async function deletar(id: string) {
    if(!confirm("Tem certeza que quer apagar?")) return;

    try {
      await api.delete(`/Categorias/${id}`);
      setLista(listaAntiga => listaAntiga.filter(item => item.id !== id));
    } catch (erro) {
      alert('Não deu pra apagar.'+erro);
    }
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Categorias 📂
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/menu')}>
          Voltar
        </Button>
      </Box>

      <Paper elevation={3}>
        <List>
          {lista.map((categoria) => (
            <div key={categoria.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deletar(categoria.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={categoria.nome} 
                  secondary={`orcamentoMensal: ${categoria.orcamentoMensal || 'Padrão'}`} 
                />
              </ListItem>
              <Divider />
            </div>
          ))}

          {lista.length === 0 && (
            <Typography style={{ padding: 20, textAlign: 'center', color: 'gray' }}>
              Nenhuma categoria encontrada. 😢
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
}