-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/10/2024 às 20:02
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `loja`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id`, `nome`, `preco`, `quantidade`, `descricao`) VALUES
(1, 'Açúcar', 2.99, 80, 'Açúcar cristal, 1 kg, ideal para doces.'),
(2, 'Café', 12.99, 40, 'Café torrado e moído, 500g, aroma intenso.'),
(3, 'Óleo de Soja', 6.49, 60, 'Óleo de soja, 900 ml, ideal para frituras.'),
(4, 'Sal', 1.29, 200, 'Sal refinado, 1 kg, para tempero.'),
(5, 'Macarrão', 3.50, 70, 'Macarrão espaguete, 500g, para diversas receitas.'),
(6, 'Frango', 9.99, 25, 'Peito de frango, 1 kg, fresco e livre de hormônios.'),
(7, 'Batata', 3.00, 50, 'Batata inglesa, 1 kg, ótima para cozidos.'),
(8, 'Cenoura', 2.49, 40, 'Cenoura, 1 kg, rica em vitaminas.'),
(9, 'Tomate', 4.50, 30, 'Tomate maduro, 1 kg, ideal para saladas.'),
(10, 'Queijo', 15.00, 20, 'Queijo muçarela, 400g, excelente para pizzas.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'João Silva', 'joao.silva@example.com', 'senha123'),
(2, 'Maria Oliveira', 'maria.oliveira@example.com', 'senha456'),
(3, 'Carlos Pereira', 'carlos.pereira@example.com', 'senha789'),
(4, 'Ana Santos', 'ana.santos@example.com', 'senha101'),
(5, 'Lucas Almeida', 'lucas.almeida@example.com', 'senha112'),
(6, 'Fernanda Costa', 'fernanda.costa@example.com', 'senha131'),
(7, 'Ricardo Lima', 'ricardo.lima@example.com', 'senha415'),
(8, 'Juliana Rocha', 'juliana.rocha@example.com', 'senha161'),
(9, 'Eduardo Martins', 'eduardo.martins@example.com', 'senha718'),
(10, 'Patrícia Ferreira', 'patricia.ferreira@example.com', 'senha192');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
