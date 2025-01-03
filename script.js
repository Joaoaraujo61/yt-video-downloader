const { rejects } = require('assert');
const { resolve } = require('path');
const ytdlp = require('yt-dlp-exec');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let url = 'https://youtu.be/UIDWaGB7AFY'

function chooseQuality(){
    return new Promise((resolve, reject)=>{
        ytdlp(url, {
            'list-formats': true
        }).then(output => {
            console.log('Em qual formato você quer baixar o video?\n Vídeo: 1- 144p  2- 240p  3- 360p  4- 480p  5- 720p  6- 1080p:\n')
            readline.question('Escolha um formato(1-6)', (res)=>{
                let format
                try{
                    switch(res){
                        case '1':
                            format = 'bestvideo[height=144]+bestaudio'
                            break
                        case '2':
                            format = 'bestvideo[height=240]+bestaudio'
                            break
                        case '3':
                            format = 'bestvideo[height=360]+bestaudio'
                            break
                        case '4':
                            format = 'bestvideo[height=480]+bestaudio'
                            break
                        case '5':
                            format = 'bestvideo[height=720]+bestaudio'
                            break
                        case '6':
                            format = 'bestvideo[height=1080]+bestaudio'
                            break
                        default:
                            console.error('Tente um formato válido!')
                            reject('formato invalido')
                            return
                    }
                    resolve(format)
                }catch(error){
                    console.error('Formato não encontrado, tente outro!')
                    reject('erro')
                    readline.close()
                }
            })
        }).catch(error =>{
            reject(error)
        })
    })
}
async function downloadVideo(){
    try{
        let videoQuality = await chooseQuality()

        const output = await ytdlp(url, {
            output: './downloads/video.mp4', // Define o nome do arquivo de saída
            format: videoQuality
        })
    } catch(error){
        console.log(error)
    } finally{
        readline.close
    }
}
downloadVideo()
/*
readline.question(
    }).then(output =>{
        console.log('Em qual formato você quer baixar o video?\n Vídeo: 1- 144p  2- 240p  3- 360p  4- 480p  5- 720p  6- 1080p:\n' + output)
    }), (res)=>{
        let format
        try{
            switch(res){
                case '1':
                    format = 'bestvideo[height=144]+bestaudio'
                    break
                case '2':
                    format = 'bestvideo[height=240]+bestaudio'
                    break
                case '3':
                    format = 'bestvideo[height=360]+bestaudio'
                    break
                case '4':
                    format = 'bestvideo[height=480]+bestaudio'
                    break
                case '5':
                    format = 'bestvideo[height=720]+bestaudio'
                    break
                case '6':
                    format = 'bestvideo[height=1080]+bestaudio'
                    break
                default:
                    console.error('Tente um formato válido!')
            }
        }catch{
            console.log('Formato não encontrado, tente outro!')
            readline.close()
        }
        
    })

ytdlp(url, {
    output: './downloads/video.mp4', // Define o nome do arquivo de saída
    format: videoQuality       // Escolhe o melhor formato disponível
}).then(output => {
    console.log('Download concluído:', output);
}).catch(error => {
    console.error('Erro ao baixar:', error);
}).finally(()=>{
    readline.close()
})
*/