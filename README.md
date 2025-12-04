# 🍃 Calculadora de Emissão de CO₂

[![Deploy to GitHub Pages](https://github.com/seu-usuario/seu-repo/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/seu-usuario/seu-repo/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Uma aplicação web interativa para calcular emissões de CO₂ em viagens entre cidades brasileiras, comparar diferentes meios de transporte e estimar créditos de carbono necessários para compensação.

## 🎯 Funcionalidades

- ✅ **Cálculo de Emissões**: Calcule emissões de CO₂ baseadas em distância e meio de transporte
- 🗺️ **Rotas Pré-cadastradas**: 40+ rotas entre principais cidades brasileiras
- 🔄 **Comparação de Transportes**: Compare emissões entre bicicleta, carro, ônibus e caminhão
- 💰 **Créditos de Carbono**: Estime custos para compensar suas emissões
- 📱 **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- ♿ **Acessibilidade**: Suporte a `prefers-reduced-motion`

## 🚀 Demo

[Ver aplicação ao vivo](https://https://fahlula.github.io/calculadoraCO2/)

## 📸 Screenshots

![Calculadora](docs/screenshot-calculator.png)
![Resultados](docs/screenshot-results.png)
![Comparação](docs/screenshot-comparison.png)

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com variáveis customizadas
- **JavaScript (Vanilla)**: Lógica da aplicação sem frameworks
- **GitHub Pages**: Hospedagem estática
- **GitHub Actions**: Deploy automatizado

## 📁 Estrutura do Projeto

```
DIO/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de deploy
├── css/
│   └── style.css               # Estilos da aplicação
├── js/
│   ├── routes-data.js          # Banco de dados de rotas
│   ├── config.js               # Configurações e constantes
│   ├── calculator.js           # Lógica de cálculos
│   ├── ui.js                   # Funções de interface
│   └── app.js                  # Inicialização e eventos
├── index.html                  # Página principal
└── README.md                   # Documentação
```

## 🎨 Arquitetura

### Módulos JavaScript

#### `routes-data.js`
Banco de dados com rotas entre cidades brasileiras:
- 40+ conexões entre capitais e cidades importantes
- Métodos: `getAllCities()`, `findDistance()`

#### `config.js`
Configurações globais da aplicação:
- Fatores de emissão por transporte (kg CO₂/km)
- Metadados dos meios de transporte
- Valores de créditos de carbono
- Métodos de setup da UI

#### `calculator.js`
Lógica de cálculos:
- `calculateEmission()`: Calcula emissão para um modo
- `calculateAllModes()`: Compara todos os modos
- `calculateSavings()`: Calcula economia vs baseline
- `estimateCreditPrice()`: Estima custo de créditos

#### `ui.js`
Gerenciamento de interface:
- Formatação de números e moedas
- Renderização de resultados
- Controle de visibilidade de elementos
- Estados de loading

#### `app.js`
Ponto de entrada da aplicação:
- Inicialização do DOM
- Manipulação de eventos do formulário
- Validação de inputs
- Orquestração dos módulos

## 💻 Instalação Local

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Abra com Live Server** (VS Code)
   - Instale a extensão "Live Server"
   - Clique com botão direito em `index.html`
   - Selecione "Open with Live Server"

3. **Ou abra diretamente**
   - Abra o arquivo `index.html` no navegador

## 🌐 Deploy no GitHub Pages

### Configuração Automática

1. **Habilite GitHub Pages**
   - Vá em Settings → Pages
   - Source: GitHub Actions

2. **Faça push para main**
   ```bash
   git add .
   git commit -m "feat: deploy inicial"
   git push origin main
   ```

3. O workflow executará automaticamente e sua aplicação estará disponível em:
   `https://seu-usuario.github.io/seu-repo/`

## 📊 Fatores de Emissão

| Transporte | Emissão (kg CO₂/km) |
|-----------|---------------------|
| 🚴 Bicicleta | 0.00 |
| 🚗 Carro | 0.12 |
| 🚌 Ônibus | 0.089 |
| 🚚 Caminhão | 0.96 |

*Fonte: Valores médios baseados em estudos de emissões veiculares*

## 🎓 Conceitos Aplicados

### Padrões de Código
- ✅ **Convenção BEM**: Nomenclatura CSS consistente
- ✅ **Module Pattern**: Encapsulamento de lógica
- ✅ **Separation of Concerns**: Módulos independentes
- ✅ **DRY Principle**: Código reutilizável

### Boas Práticas
- Variáveis CSS customizadas
- Comentários JSDoc
- Validação de dados
- Tratamento de erros
- Design responsivo
- Acessibilidade

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

**Fabiana** - *Desenvolvimento inicial* - Projeto DIO

## 🙏 Agradecimentos

- [DIO](https://dio.me) - Plataforma de ensino
- GitHub Copilot - Assistência no desenvolvimento
- Comunidade Open Source

## 📧 Contato

- GitHub: [@seu-usuario](https://github.com/fahlula)
- LinkedIn: [Seu Nome](https://linkedin.com/in/fabiana-almeida-dev)

---

Desenvolvido com ❤️ para a DIO | Projeto GitHub Copilot
