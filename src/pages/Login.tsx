import { useState } from "react";
import { TextField, Button, Container, Paper, Typography, Box } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function fazerLogin() {
    try {
      const response = await api.post("/Auth/login", {
        email: email,
        senha: senha
      });

    const token = response.data.token;

    localStorage.setItem("financeiro_token", token);
    navigate("/menu");

    } catch (erro) {
      alert("Erro ao fazer login. Verifique suas credenciais. Erro: "+ erro);
    }
  }

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px'}}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5">Acesso ao Sistema</Typography>

        <Box component="form" style={{ marginTop: '20px', textAlign: 'center' }}>
          <TextField
            label="Seu e-mail"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Sua senha"
            type="password"
            fullWidth
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
            onClick={fazerLogin}
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}