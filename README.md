# Ateliê Dani Costa

Site separado em HTML, CSS, JavaScript e imagens, preservando o conteúdo original.

## Arquivos

- `index.html`: estrutura e conteúdo da página.
- `css/style.css`: estilos personalizados e animações.
- `js/script.js`: menu, galeria, formulário do WhatsApp e interações.
- `js/tailwind-config.js`: cores e fontes do Tailwind, carregado após a biblioteca no cabeçalho.
- `images/`: imagens extraídas do arquivo original, sem recompressão.

## Abrir no computador

1. Extraia o ZIP.
2. Abra a pasta `atelie-dani-costa` no VS Code.
3. Abra `index.html` no navegador ou pelo Live Server.
4. Mantenha as pastas `css`, `js` e `images` ao lado de `index.html`.

## Enviar ao GitHub

1. Crie ou abra seu repositório.
2. Envie o conteúdo da pasta `atelie-dani-costa`, preservando as subpastas.
3. Deixe `index.html` na raiz do repositório e salve o envio com um commit.
4. Para disponibilizar um endereço público do site, habilite o GitHub Pages no repositório, apontando para a branch e pasta que contêm `index.html`.

Não envie apenas o ZIP: envie os arquivos extraídos. Nenhuma instalação ou compilação é necessária.

## Dependências e funcionamento

O original utiliza Tailwind por CDN, Google Fonts, Font Awesome e AOS. Esses recursos, o mapa e links externos precisam de internet. A configuração do Tailwind permanece em arquivo próprio para preservar a ordem de carregamento.

O formulário abre uma mensagem no WhatsApp do salão; não salva agendamentos em banco de dados nem confirma disponibilidade automaticamente. O envio final da mensagem é feito pelo visitante no WhatsApp.

Os textos, contatos, links, mapa e serviços foram mantidos como no arquivo enviado. Para editar contatos ou endereço, procure os valores em `index.html` e `js/script.js`.
