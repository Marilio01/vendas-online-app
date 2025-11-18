# 📱 Vendas Online - Aplicativo Mobile

Aplicativo mobile oficial da plataforma **Vendas Online**, desenvolvido
em **React Native** para proporcionar uma experiência rápida, estável e
intuitiva em dispositivos Android.

## 🚀 Funcionalidades Principais

O app oferece uma experiência completa de e-commerce, desde a descoberta
de produtos até o checkout.

### 🔐 Autenticação

- Cadastro e login de usuários
- Sessão persistente

### 🛍️ Produtos e Categorias

- Exibição por categorias
- Detalhes completos do produto
- Avaliações e descontos destacados

### 🛒 Carrinho de Compras

- Adição e remoção de itens
- Alteração de quantidade
- Carrinho salvo mesmo ao fechar o app

### 💳 Checkout e Pagamento

- Seleção de endereço
- Pagamento via **PIX** ou **Cartão de Crédito**

### 📦 Pedidos

- Histórico de pedidos
- Detalhamento de cada pedido

### 👤 Área do Cliente

- Edição de perfil
- Alteração de senha

## 📊 Diagrama de Caso de Uso

![Diagrama de Caso de
Uso](./src/assets/diagramas/Diagrama-de-casos-de-uso-Vendas-Online.png)

## 🎨 Protótipo (Figma)

🔗 **Figma**:\
https://www.figma.com/design/RN03CQdT647qJtUM78c97y/Vendas-Online?node-id=0-1

## 🛠️ Tecnologias Utilizadas

- **React Native CLI**
- **TypeScript**
- **Redux Toolkit**
- **Axios**
- **React Navigation**
- **Styled-components**
- **React Native Vector Icons**

## 🧱 Arquitetura

- Módulos por funcionalidade
- Redux Toolkit para estado global
- React Navigation para navegação
- Hooks personalizados (ex: `useRequests`)
- Organização em:
  - `/modules`
  - `/shared/components`
  - `/shared/services`
  - `/shared/themes`

## 🧹 Qualidade de Código

- **ESLint**
- **Prettier**
- Regras otimizadas para TypeScript e React Native

## ⚙️ Configuração do Ambiente

Configure seu ambiente React Native seguindo o guia oficial:

- 🖥️ Windows\
  https://reactnative.dev/docs/set-up-your-environment?platform=android&os=windows

- 🍏 macOS\
  https://reactnative.dev/docs/set-up-your-environment?platform=ios&os=macos

- 🐧 Linux\
  https://reactnative.dev/docs/set-up-your-environment?platform=android&os=linux

### 📌 Requisitos recomendados

- **Node.js LTS (18+)**
- **JDK 17**
- Android Studio com:
  - Android 15 (API 35)\
  - Emulador configurado (AVD)

## ▶️ Como Rodar o Projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Iniciar no Android

```bash
npx react-native run-android
```

O app será aberto no emulador ou no dispositivo conectado via USB.
