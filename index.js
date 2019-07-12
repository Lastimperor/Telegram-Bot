const Etherscan = require('etherscan');
const Telegraf = require('telegraf');
const bot = new Telegraf("mykey");

const axios = require('axios');

const amountStaked = 8780995;
const startingBankroll = 1902593;
var jquery = require('jquery')

var getJSON = require('get-json')
var surplus = 0;


function calcoloSurplus(ctx, val , calcoloDividendo) {
  getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c&address=0x91f273b7A28F5169FD7B7995A54B767cA797BC63&tag=latest&apikey=mykey' function (error, response){
    //console.log(error);
    //console.log(response);
    bankroll = response["result"];
    console.log(bankroll);
    initialBankroll = amountStaked + startingBankroll;
    console.log(initialBankroll);
    surplus = bankroll - initialBankroll;
    console.log("surplus is: ",surplus);

    ctx.reply(`The surplus is: ${surplus} edg`)
    if(calcoloDividendo){
          dividend = (surplus*0.4/amountStaked)*val
          ctx.reply(`your dividend is ${dividend} edg`);
    }
});
}

bot.on('text', (ctx)=> {
  const subreddit = ctx.message.text;

  var parsed = parseInt(subreddit);
  if (!isNaN(parsed)) { calcoloSurplus(ctx, parsed, true)}
  else {
  axios
    .get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
    .then(res => {
      const data = res.data.data;
      if (data.children.length < 1)
        return ctx.reply("try to another search (in english), for any problem contact the creator @Lastimperor");
      const link = `https://reddit.com/${data.children[0].data.permalink}`;
      return ctx.reply(link);
    })
    .catch(err => {
      console.log(err);
      return ctx.reply('try another search (in english), for any problem contact the creator @Lastimperor');
    });
  }
});

bot.start((ctx) => ctx.reply('Hello my friend, welcome to Edgeless Bot!!\
 \n\
 \nEdgeless Group Homepage:\
 \nhttps://www.edgelessgroup.io\
 \n\
 \nTake a look to the staking platform:\
 \nhttps://staking.edgelessgroup.io\
 \n\
 \nLast news here:\
 \nhttps://blog.edgelessgroup.io\
 \n -------------------------------------------------------------------\
 \n Here are a list of words you can write!\
 \n -------------------------------------------------------------------\
 \n surplus - Amount of surplus in this staking round\
 \n staked - Amount of edgeless staked in this staking round\
 \n staking - Staking platform where you can stake Edg\
 \n twitter, facebook or reddit - official social account\
 \n blog - Edgeless blog\
 \n token - Information about the Edgeless token\
 \n casino - Official casino website\
 '))
bot.help((ctx) => ctx.reply('Write <surplus> to get surplus level,\
\nWrite <staked> to get amount edg staked,\
\nWrite a number to get your dividend, according to the actual surplus'))
bot.on('sticker', (ctx) => ctx.reply('ehy, do not spam me'))
bot.on('Photo'), (ctx) => ctx.reply('oh, nice picture')
bot.hears('hi', (ctx) => ctx.reply('Hey there\
 \nhow are you?'))

//bot.hears('surplus', (ctx) => ctx.reply(`The surplus is: ${surplus}`))
bot.hears('surplus', (ctx) => calcoloSurplus(ctx));
bot.hears('staked', (ctx) => ctx.reply(`The number of edg staked is: ${amountStaked} edg`))
bot.hears('twitter', (ctx) => ctx.reply('Take a look here: https://twitter.com/edgelessproject'))
bot.hears('facebook', (ctx) => ctx.reply('Take a look here: https://www.facebook.com/EdgelessCasino'))
bot.hears('reddit', (ctx) => ctx.reply('Take a look here: https://www.reddit.com/r/Edgeless'))
bot.hears('blog', (ctx) => ctx.reply('Take a look here: https://blog.edgelessgroup.io'))
bot.hears('staking', (ctx) => ctx.reply('Take a look here: https://staking.edgelessgroup.io'))
bot.hears('token', (ctx) => ctx.reply('Take a look here: https://www.edgelessgroup.io/token'))
bot.hears('casino', (ctx) => ctx.reply('Enjoy: https://edgeless.io/?ref=59cd635dfef2f72b003e2ea8'))

bot.launch()

bot.startPolling();


/*edgeless contract = "0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c"
edgeless bankroll wallet = "0x91f273b7A28F5169FD7B7995A54B767cA797BC63"
