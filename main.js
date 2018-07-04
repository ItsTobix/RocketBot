
//Imoprts
const Discord = require('discord.js');
const fs      = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const token  = JSON.parse(fs.readFileSync("token.json","utf8"))
const Embed = require("./commands/embed.js")

var bot = new Discord.Client()




var xp = JSON.parse(fs.readFileSync("xp.json", "utf8"));



var cmdmap = {
    say: cmd_say,
    test: cmd_test,
    xp: cmd_xp

}


function cmd_say(msg, args) {
    msg.channel.send(args.join(' '))
}

function cmd_test(msg, args) {
    console.log("test")
}


function cmd_xp(msg) {
    Embed.xpCount(msg.channel,"",`DEIN SCORE IST: ${xp[msg.member.id].messageSent}`)
}






bot.on('message', (msg) => {



    var  content = msg.content,
         author  = msg.member,
         chan    = msg.channel,
         guild   = msg.guild

    if (author.id != bot.user.id && content.startsWith(config.prefix)) {

        var invoke = content.split(' ')[0].substr(config.prefix.length),
        args   = content.split(' ').slice(1)

        if (invoke in cmdmap) {
        cmdmap[invoke](msg, args)
        }
    };



// Level System




    if(!xp[author.id]) xp[author.id] ={
        messageSent:0

    }

    xp[author.id].messageSent++;


    fs.writeFile("xp.json", JSON.stringify(xp), (err) => {
        if (err) console.error(err);

    });






























});

//Welcome Message

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find('name', 'willkommen');

if (!channel) return;

channel.send(`Housten we have a Problem, ${member} joined!`);
});



bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}...`)
})


bot.login(token.token);