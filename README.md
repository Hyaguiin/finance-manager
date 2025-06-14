# 📊 **API de Gerenciamento de Finanças Empresariais**

A **API de Gerenciamento de Finanças Empresariais** foi desenvolvida para ajudar empresários a controlar e analisar os dados financeiros de seus serviços e produtos. A API oferece autenticação, controle de dados financeiros, dashboard interativo e diversas funcionalidades para facilitar a gestão financeira da empresa.

## 🚀 **Funcionalidades Principais**

- **Autenticação de Usuário**: Sistema seguro de login e registro com suporte a autenticação via JWT.
- **Gerenciamento de Produtos/Serviços**: Criação, leitura, atualização e exclusão de produtos/serviços oferecidos pela empresa.
- **Controle de Transações Financeiras**: Registro de entradas e saídas financeiras, categorização e relatórios detalhados.
- **Dashboard Financeiro**: Visualização das finanças em tempo real, com gráficos e relatórios financeiros.
- **Relatórios Personalizados**: Geração de relatórios financeiros detalhados por período, categoria ou serviço/produto.
- **Administração de Categorias**: Classificação das transações financeiras em diferentes categorias (ex: vendas, despesas, investimentos).
- **Notificações e Alertas**: Envio de notificações sobre metas financeiras e alertas sobre transações importantes ou fora do padrão.

---

## ⚙️ **Tecnologias Utilizadas**

- **Node.js + Typescript** – Framework para back-end.
- **Express** – Framework para criação da API.
- **JWT (JSON Web Tokens)** – Autenticação e autorização de usuários.
- **Sequelize** – ORM para comunicação com o banco de dados (PostgreSQL, MySQL, etc.).
- **PostgreSQL / MySQL** – Banco de dados relacional.
- **Chart.js** – Biblioteca para gráficos no dashboard.
- **Recharts.js** - Biblioteca para gráficos no dashboard.
- **bcryptjs** – Criptografia de senhas.
- **Swagger** – Documentação da API interativa.

---

## 🏗️ **Estrutura da API**

### **EndPoints Principais**

#### 1. **Autenticação**

- **POST** `/api/auth/register` - Registra um novo usuário
- **POST** `/api/auth/login` - Faz login de um usuário existente
- **GET** `/api/auth/logout` - Faz logout do usuário

#### 2. **Usuários**

- **GET** `/api/users/me` - Obtém os dados do usuário autenticado
- **PUT** `/api/users/update` - Atualiza dados do usuário (e.g., nome, email)

#### 3. **Produtos/Serviços**

- **GET** `/api/products` - Lista todos os produtos/serviços
- **POST** `/api/products` - Cria um novo produto/serviço
- **GET** `/api/products/:id` - Obtém detalhes de um produto/serviço específico
- **PUT** `/api/products/:id` - Atualiza um produto/serviço
- **DELETE** `/api/products/:id` - Exclui um produto/serviço

#### 4. **Transações Financeiras**

- **GET** `/api/transactions` - Lista todas as transações financeiras
- **POST** `/api/transactions` - Registra uma nova transação
- **GET** `/api/transactions/:id` - Detalha uma transação financeira específica
- **PUT** `/api/transactions/:id` - Atualiza uma transação
- **DELETE** `/api/transactions/:id` - Exclui uma transação

#### 5. **Dashboard Financeiro**

- **GET** `/api/dashboard/overview` - Visão geral das finanças (entradas, saídas, saldo)
- **GET** `/api/dashboard/category/:categoryId` - Relatório detalhado por categoria
- **GET** `/api/dashboard/analytics` - Gráficos e relatórios financeiros

---

## 🔑 **Autenticação**

A API utiliza **JWT (JSON Web Tokens)** para autenticação de usuários. Para fazer login, um token JWT será retornado e deverá ser enviado nos headers das requisições subsequentes.

### Exemplo de Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Apresentação do sistema:

https://github.com/user-attachments/assets/7f0b41c9-9849-483b-8ce1-b4a73338e3c9



