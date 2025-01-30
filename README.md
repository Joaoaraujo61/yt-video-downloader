# Downloader de Vídeos do YouTube com Atualização de Timestamp

## Descrição do Projeto
Este projeto é uma aplicação de linha de comando em Node.js que baixa vídeos do YouTube utilizando a ferramenta `yt-dlp`. Permite aos usuários selecionar a qualidade do download, escolher um caminho de salvamento e atualizar automaticamente o timestamp do arquivo para a data atual.

## Funcionalidades
- Baixar vídeos do YouTube especificando uma URL.
- Selecionar a qualidade do vídeo a partir de uma lista.
- Escolher um caminho personalizado para salvar o vídeo.
- Atualizar automaticamente o timestamp do arquivo baixado.

## Requisitos
- Node.js instalado no sistema.

## Instalação
1. Clone este repositório ou copie o código para um novo diretório.
2. Fazer download do ffmpeg.exe nos releases e coloque no diretório principal do yt-video-downloader

## Como Usar
1. Abra um terminal e navegue até o diretório do projeto.
2. Execute a aplicação com:

   ```bash
   node app.js
   ```

3. Siga as instruções:
   - Escolha a qualidade do download (144p, 240p, 360p, 480p, 720p ou 1080p).
   - Especifique o caminho onde o vídeo será salvo.

4. Após a conclusão do download, o timestamp do arquivo será atualizado automaticamente.

## Exemplo de Fluxo
```
Em qual qualidade você quer baixar o vídeo?
1- 144p
2- 240p
3- 360p
4- 480p
5- 720p
6- 1080p
Escolha uma qualidade (1-6): 5
Onde será salvo? C:\user\username\downloads
Iniciando download...
Download concluído com sucesso!
Arquivo baixado: C:\user\username\downloads\video-title.mp4
Timestamp atualizado para o arquivo: ./downloads/video-title.mp4
```



## Dependências
- [yt-dlp-exec](https://www.npmjs.com/package/yt-dlp-exec)
- Módulos nativos do Node.js: `fs`, `path`, `readline`
- 
- ## Autor

Este projeto foi criado por [Joaoaraujo61](https://github.com/Joaoaraujo61)

## Licença
Este projeto está licenciado sob a Licença MIT.

