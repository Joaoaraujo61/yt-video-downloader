const { rejects } = require('assert');
const { resolve } = require('path');
const ytdlp = require('yt-dlp-exec');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const fs = require('fs')
const path = require('path')


function askUrl() {  
    return new Promise((resolve, reject)=>{
        readline.question('Digite a URL do vídeo que será baixado: ', (res)=>{
            if(res){
                resolve(res)
                readline.close
            }else{
                console.log('URL inválida!')
                readline.close
                reject('URL Inválida, rejected')
            }
        })
    })
}

function setFileTimestamp(filePath){
    const currentDate = new Date()

    if(fs.existsSync(filePath)){
        fs.utimesSync(filePath, currentDate, currentDate)
        console.log('Timestamp atualizado para o arquivo:', filePath)
    }else{
        console.log('Arquivo não encontrado', filePath)
    }
}

async function getVideoTitle(url) {
    try {
        const videoInfo = await ytdlp(url, {
            'dump-json': true, // Opção para obter as informações do vídeo em formato JSON
        });

        return videoInfo.title; // Retorna o título do vídeo
    } catch (error) {
        console.error('Erro ao obter título do vídeo:', error);
        return null;
    }
}
function askPath(){
    return new Promise((resolve, reject)=>{
        readline.question('Onde será salvo?', (path)=>{
            if(path){
                resolve(path)
            }else{
                reject('caminho inválido!')
            }
        })
    })
  }

async function chooseQuality(url) {

    return new Promise((resolve, reject) => {
        ytdlp(url, {
            'list-formats': true,
        })
            .then((output) => {
                console.log(
                    'Em qual qualidade você quer baixar o vídeo?\n' +
                    '1- 144p\n' +
                    '2- 240p\n' +
                    '3- 360p\n' +
                    '4- 480p\n' +
                    '5- 720p\n' +
                    '6- 1080p\n'
                );

                readline.question('Escolha uma qualidade (1-6): ', (res) => {
                    let format;
                    try {
                        switch (res) {
                            case '1':
                                format = 'bestvideo[height=144]+bestaudio';
                                break;
                            case '2':
                                format = 'bestvideo[height=240]+bestaudio';
                                break;
                            case '3':
                                format = 'bestvideo[height=360]+bestaudio';
                                break;
                            case '4':
                                format = 'bestvideo[height=480]+bestaudio';
                                break;
                            case '5':
                                format = 'bestvideo[height=720]+bestaudio';
                                break;
                            case '6':
                                format = 'bestvideo[height=1080]+bestaudio';
                                break;
                            default:
                                console.error('Opção inválida. Por favor, escolha entre 1 e 6.');
                                reject('Formato inválido');
                                return;
                        }
                        resolve(format);
                    } catch (error) {
                        console.error('Erro ao processar o formato. Tente novamente.');
                        reject(error);
                    }
                });
                
            })
            .catch((error) => {
                console.error('Erro ao listar qualidades:', error);
                reject(error);
            });
    });
}

async function downloadVideo() {
    try {
        const newUrl = await askUrl()
        const videoQuality = await chooseQuality(newUrl);
        let savePath = await askPath()
        let videoTitle = await getVideoTitle(newUrl)
        
        
        videoTitle = videoTitle.replace(/[<>:"/\\|?*\[\]]/g, '-');
        savePath = path.join(savePath,'/', videoTitle)

        console.log('Iniciando download...');
        const output = await ytdlp(newUrl, {
            output: savePath, // Define o nome do arquivo de saída
            format: videoQuality,
        });

        console.log('Download concluído com sucesso!');

        const videoData = await ytdlp(newUrl, {
            format: videoQuality,
            print: 'ext', // Retorna apenas a extensão
        });

        const ext = path.extname(savePath)
        const downloadedFilePath = savePath + '.' + videoData.trim()

        setFileTimestamp(downloadedFilePath)
    } catch (error) {
        console.error('Erro ao baixar o vídeo:', error);
    } finally {
        readline.close(); // Fecha o readline corretamente
    }
}

downloadVideo();
