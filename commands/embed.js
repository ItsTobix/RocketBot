const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const bot = new Discord.Client();


const COLORS = {

    red: 0xe74c3c,
    green: 0x2ecc71,
    yellow: 0xf1c40f,
    orange: 0xe67e22,
    white: 0xecf0f1,
    blue: 0x3498db,
    darkblue: 0x2c3e50,
    purple: 0x8e44ad
};






module.exports = {

    xpCount (chan, cont, title,){
        var message;
        var emb = new RichEmbed()
            .setColor(COLORS.green)
            .setImage("https://media.giphy.com/media/3JZeYzXaChSfFVx5m0/giphy.gif")
            .setTitle(title)

        chan.send("",emb).then((m) =>{
            message = m
        });

    }

};







