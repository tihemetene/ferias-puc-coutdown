const dotenv = require('dotenv')
const Twitter = require('twitter')

dotenv.config({ path: './config.env' });

const TwitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

const dataDasFerias = '07/04/2022'; // Manter data em padrão americano pra não precisar ficar convertendo 💀
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
    const qtdDias = calculaDataFerias(true);
    const qtdDiasAulas = calculaDataFerias(false);
    console.log(qtdDias + 1);

    if(qtdDias >= 0) {
        TwitterClient.post(
            'statuses/update',
            {
                status: qtdDias === 0 ? 'As férias chegaram!' : `Faltam ${qtdDias} para as férias!`
            },
             function (error, tweet, response) {
                 if (!error) {
                     console.log(tweet)
                 }
                 else if (error) {
                     console.log(error)
                 }
             }
        );
    }

    if(qtdDias < 0) {
        TwitterClient.post(
            'statuses/update',
            {
                status:`Faltam ${qtdDiasAulas} para o início das aulas :(`
            },
             function (error, tweet, response) {
                 if (!error) {
                     console.log(tweet)
                 }
                 else if (error) {
                     console.log(error)
                 }
             }
        );
    }
}

postar();

setInterval(postar, 1000 * 60 * 60 * 24) // Postar diariamente


