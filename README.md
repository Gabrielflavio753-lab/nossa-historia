# Nossa História ❤️

**Uma Experiência Romântica Interativa e Cinematográfica**

## Sobre

Nossa História é uma aplicação web interativa, premium e cinematográfica que celebra o relacionamento especial entre você e sua pessoa amada. Uma jornada através de memórias, jogos, desafios e momentos compartilhados.

## Funcionalidades

✨ **16 Experiências Diferentes:**

1. **Abertura Cinematográfica** - Introdução épica com animações
2. **Dois Pontos de Luz** - Capítulo introdutório
3. **Capítulos** - Navegação através da história
4. **Mapa/Timeline** - Visualização dos momentos importantes
5. **Caça às Memórias** - 5 memórias + 1 secreta
6. **Cofre com Senha** - Conteúdo desbloqueável
7. **Quiz Romântico** - Teste seu conhecimento
8. **Jogo da Memória** - Pareamento de cartas
9. **Puzzle 3×3** - Quebra-cabeça interativo
10. **Chuva de Corações** - Recolha 15 corações
11. **Carta Romântica** - Com efeito de digitação
12. **Fotos & Memórias** - Galeria de imagens
13. **Contador de Tempo** - Dias juntos
14. **Diário** - Registre suas memórias
15. **Elementos Secretos** - Desbloqueáveis ao longo da jornada
16. **Final Cinematográfico** - Conclusão épica

## Tecnologia

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e animações suaves
- **JavaScript Vanilla** - Sem dependências externas
- **LocalStorage** - Persistência de dados

## Como Usar

### Instalação

1. Clone ou faça download do repositório
2. Abra `index.html` em um navegador moderno
3. Customize as informações:
   - Edite `js/quiz.js` para as perguntas do quiz
   - Edite `js/memories.js` para as memórias
   - Edite `js/main.js` para a senha do cofre
   - Adicione fotos na galeria

### Personalização

Os seguintes pontos precisam ser customizados com suas informações:

**Em `index.html`:**
- Datas na timeline
- Mensagens e descrições

**Em `js/main.js`:**
- Senha do cofre (linha ~180)
- Conteúdo do cofre

**Em `js/quiz.js`:**
- Perguntas e respostas corretas
- Conteúdo da carta romântica

**Em `js/memories.js`:**
- Títulos e descrições das memórias
- Respostas corretas para desafios

### Música

Para adicionar música de fundo:
1. Coloque o arquivo `background-music.mp3` em `assets/audio/`
2. Ou atualize o src em `index.html` linha ~18

## Design

**Paleta de Cores:**
- Primário: Rosa/Magenta (#ff6b9d)
- Secundário: Roxo (#7c3aed)
- Acentos: Dourado (#fbbf24)
- Fundo: Escuro/Preto (#0f0f1f)

**Responsividade:**
- Otimizado para celular, tablet e computador
- Funciona em todos os navegadores modernos
- Totalmente tátil e responsivo ao toque

## Compatibilidade

✅ Chrome/Edge
✅ Firefox
✅ Safari
✅ Mobile browsers
✅ GitHub Pages

## Deploy

### GitHub Pages

1. Faça push para `main` branch
2. Vá em Settings > Pages
3. Selecione o branch `main` como fonte
4. Seu site estará em `https://seu-usuario.github.io/nossa-historia`

## Estrutura de Pastas

```
├── index.html          # Arquivo principal
├── css/
│   └── style.css      # Estilos (cinematográfico & responsivo)
├── js/
│   ├── main.js        # Lógica principal
│   ├── memories.js    # Sistema de memórias
│   ├── games.js       # Jogos (memória, puzzle, corações)
│   └── quiz.js        # Quiz, carta, diário, galeria, timer
├── assets/
│   ├── audio/         # Música e efeitos sonoros
│   ├── images/        # Fotos e ícones
│   └── icons/         # Ícones da interface
└── README.md          # Este arquivo
```

## Dicas de Customização

1. **Alterar cores**: Edite as variáveis CSS em `style.css` (linhas 1-10)
2. **Adicionar mais capítulos**: Copie a estrutura de cena em `index.html`
3. **Modificar animações**: Ajuste os tempos em `style.css`
4. **Personalizações avançadas**: Edite o JavaScript conforme necessário

## Bugs & Sugestões

Se encontrar bugs ou tiver sugestões, abra uma issue no repositório.

## Licença

MIT License - Sinta-se livre para usar, modificar e compartilhar!

## Feito com ❤️

Para celebrar o amor e os momentos especiais compartilhados.

---

**Última atualização**: Agosto 2026
