const Telegraf = require('telegraf');
const bot = new Telegraf("mykey");
const axios = require('axios');

const amountStaked = 6926686;
const reserveBankroll = 1000000;
const startingBankroll = 1500000;

var getJSON = require('get-json')

var surplus = 0

  function test() {

    getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c&address=0x91f273b7A28F5169FD7B7995A54B767cA797BC63&tag=latest&apikey=BVYKSWHMF296JTM7PJPC3EGBGMJ24MAUVQ', function (error, response){
      //console.log(error);
      //console.log(response);
      initialBankroll = amountStaked + reserveBankroll + startingBankroll;
      console.log(initialBankroll);

      bankroll = response["result"];
      console.log(bankroll);

      surplus = bankroll - initialBankroll;
      //console.log("surplus is: ",surplus);
  });
  return surplus;
}


bot.start((ctx) => ctx.reply('Hello my friend, welcome to Edgeless Staking Surplus Bot!!'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('surplus', (ctx) => ctx.reply(`The surplus is: ${surplus}`))
bot.hears('staked', (ctx) => ctx.reply(`The staked amount is: ${amountStaked}`))
bot.hears('twitter', (ctx) => ctx.reply('Take a look here: https://twitter.com/edgelessproject'))
bot.hears('facebook', (ctx) => ctx.reply('Take a look here: https://www.facebook.com/EdgelessCasino'))
bot.hears('reddit', (ctx) => ctx.reply('Take a look here: https://www.reddit.com/r/Edgeless'))
bot.hears('blog', (ctx) => ctx.reply('Take a look here: https://blog.edgelessgroup.io'))
bot.hears('staking', (ctx) => ctx.reply('Take a look here: https://staking.edgelessgroup.io'))
bot.hears('token', (ctx) => ctx.reply('Take a look here: https://www.edgelessgroup.io/token'))
bot.hears('casino', (ctx) => ctx.reply('Enjoy: https://edgeless.io/?ref=59cd635dfef2f72b003e2ea8'))

bot.launch()

// reddit [superfluo]

bot.on('text', message=> {
  const subreddit = message.message.text;
  axios
    .get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
    .then(res => {
      const data = res.data.data;
      if (data.children.length < 1)
        return message.reply("The search on reddit haven't results.");
      const link = `https://reddit.com/${data.children[0].data.permalink}`;
      return message.reply(link);
    })
    .catch(err => {
      console.log(err);
      return message.reply('try to another search (in english) or contact me @Lastimperor');
    });
});


bot.startPolling();

// etherscan api usage => https://www.npmjs.com/package/etherscan   [non mi serve, solo da esempio]

const Etherscan = require('etherscan');
const etherscan = new Etherscan("myetherscankey"); // Some methods working without API_KEY


  (async () => {
    const data = await etherscan.getEtherBalance({
        address: '0x91f273b7A28F5169FD7B7995A54B767cA797BC63'
    });
})();

etherscan.getEtherBalance({
    address: '0x91f273b7A28F5169FD7B7995A54B767cA797BC63',
    tag: 'latest' // Optional, default 'latest'
});

// Get ERC20-Token Account Balance for TokenContractAddress [mi serve]
// => inserito il contratto di creazione di un token y e un wallet, si ottiene il numero di token y nel wallet

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;


$.getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c&address=0x91f273b7A28F5169FD7B7995A54B767cA797BC63&tag=latest&apikey=myetherscankey', function (data) {
  var EdgelessWallet = JSON.parse(data);
  

}

/*edgeless contract = "0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c"
edgeless wallet = "0x91f273b7A28F5169FD7B7995A54B767cA797BC63"
*/


/*
Get Contract ABI for Verified Contract Source Codes

https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken
A simple sample for retrieving the contractABI using Web3.js and Jquery to interact with a contract


    var Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider());
    var version = web3.version.api;

    $.getJSON('http://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', function (data) {
        var contractABI = "";
        contractABI = JSON.parse(data.result);
        if (contractABI != ''){
            var MyContract = web3.eth.contract(contractABI);
            var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
            var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
            console.log("result1 : " + result);
            var result = myContractInstance.members(1);
            console.log("result2 : " + result);
        } else {
            console.log("Error" );
        }
    });
    */
