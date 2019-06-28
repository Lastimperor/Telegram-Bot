const Etherscan = require('etherscan');

const Telegraf = require('telegraf');
const bot = new Telegraf("mykey");
const axios = require('axios');

bot.start((ctx) => ctx.reply('Hello my friend, welcome to Edgeless Staking Surplus Bot!!'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('price', (ctx) => ctx.reply('The price is: ' + price))
bot.launch()

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

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;


$.getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c&address=0x91f273b7A28F5169FD7B7995A54B767cA797BC63&tag=latest&apikey=myetherscankey', function (data) {
  var surplus = 0;
  surplus = JSON.parse(data.result);

}

/*edgeless contract = "0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c"
edgeless bankroll wallet = "0x91f273b7A28F5169FD7B7995A54B767cA797BC63"
amount staked 5th round = 5183037
reserve bankroll = 1031734
starting bankroll = 1309142
surplus = edgeless bankroll wallet - (amount staked + reserve bankroll + starting bankroll)*/


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
