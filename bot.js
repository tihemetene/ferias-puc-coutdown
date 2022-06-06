const dotenv = require('dotenv')
const twitterApi = require('twitter-api-v2').default;

dotenv.config({ path: './config.env' });

const TwitterClient = new twitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET
});

const rwClient = TwitterClient.readWrite;

const dataDasFerias = '07/08/2022'; // Manter data em padrão americano pra não precisar ficar convertendo 💀
const dataDasAulas = '08/01/2022'; // ☝
const dataAtual = new Date().getTime();
const dias = 1000 * 60 * 60 * 24;

const calculaDataFerias = (ehDataFerias = true) => {
    const data1 = Math.round(Date.parse(ehDataFerias ? dataDasFerias : dataDasAulas) / dias);
    const data2 = Math.round((dataAtual) / dias);
    const qtdDias = data1 - data2;
    return qtdDias;
}

const postar = async () => {
    try {
        const qtdDias = calculaDataFerias(true);
        const qtdDiasAulas = calculaDataFerias(false);
        console.log(qtdDias + 1);
    
        if(qtdDias >= 0) {
            await rwClient.v1.tweet(qtdDias === 0 ? "É férias caraio 🎉✨🎇🎉" : qtdDias === 1 ? `FALTA ${qtdDias} DIA PARA AS FÉRIAS!` : `Faltam ${qtdDias} dias para as férias!`);
        }
        if(qtdDias < 0) {
            await rwClient.v1.tweet(qtdDiasAulas === 1 ? `FALTA ${qtdDiasAulas} DIA PARA A VOLTA AS AULAS!` : `Faltam ${qtdDiasAulas} dia(s) para as aulas voltarem...`)
        } 
    } catch (e) {
        console.error(e);
    }    
}

postar();

setInterval(postar, 1000 * 60 * 60 * 24) // Postar diariamente


