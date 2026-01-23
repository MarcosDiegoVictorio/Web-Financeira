<div align="center">

# 💻 Web Financeira - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<p>
  Interface web moderna e responsiva para gestão financeira pessoal. Desenvolvida em <strong>React</strong>, esta aplicação consome a API .NET para oferecer uma experiência fluida de controle de receitas, despesas e investimentos.
</p>

[🔗 Acessar Aplicação (Vercel)](https://web-financeira.vercel.app) • [⚙️ Repositório Backend](https://github.com/MarcosDiegoVictorio/GerenciadorFinanceiro-API)

</div>

---

## 🚀 Tecnologias Utilizadas

- **React.js** (Biblioteca principal)
- **Axios** (Consumo de API)
- **Chart.js** (Visualização de dados/Gráficos)
- **React Router** (Navegação)
- **Vercel** (Deploy e CI/CD)

## ✨ Funcionalidades

A aplicação oferece uma interface amigável para:

- 📊 **Dashboard Interativo:** Visão geral com gráficos de receitas vs. despesas.
- 💰 **Gestão de Lançamentos:**
  - Cadastro rápido de novas transações.
  - Edição e remoção de lançamentos.
  - Filtros por data e tipo.
- 🏷️ **Controle de Categorias:** Visualização e cadastro de categorias personalizadas.
- 📱 **Responsividade:** Layout adaptável para Desktop e Mobile.

## 🔌 Integração com API

Este frontend se comunica com o backend hospedado no Render.

| Recurso | Endpoint Base | Descrição |
| :--- | :--- | :--- |
| **API URL** | `https://financeiro-api-pessoal.onrender.com/api` | Base de todas as requisições |
| **Auth** | *Open/Bearer* | Método de autenticação (se houver) |

---

## 🛠️ Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior)
- Backend rodando localmente (opcional, para testes completos)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/MarcosDiegoVictorio/Web-Financeira.git](https://github.com/MarcosDiegoVictorio/Web-Financeira.git)
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto (baseado no `.env.example`) e defina a URL da API:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```
   **O app estará disponível em `http://localhost:5173` (ou porta similar).**

---

### 📦 Estrutura do Projeto

A organização das pastas segue o padrão de componentes funcionais:

- **`/src/components`**: Elementos reutilizáveis (Cards, Botões, Header).
- **`/src/pages`**: Páginas principais (Dashboard, Lançamentos).
- **`/src/services`**: Configuração do Axios e chamadas à API.
- **`/src/contexts`**: Gerenciamento de estado global (se aplicável).
- **`/src/assets`**: Imagens, ícones e estilos globais.

### 🤝 Contribuição e Backend
Para entender como os dados são processados, consulte o repositório da API:
👉 **[https://github.com/MarcosDiegoVictorio/GerenciadorFinanceiro-API](https://github.com/MarcosDiegoVictorio/GerenciadorFinanceiro-API)**

<div align="center">

#### Desenvolvido por Marcos Diego Victorio

</div>