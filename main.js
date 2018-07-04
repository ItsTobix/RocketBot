const Discord = require('discord.js');
const fs      = require('fs');
var xp      = require("./xp.json")

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var bot = new Discord.Client();




bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}...`)
    bot.user.setActivity("Prepare for a launch!");

});

var cmdmap = {
    say: cmd_say,
    test: cmd_test
};

function cmd_say(message, args) {
    message.channel.send(args.join(' '))
}

function cmd_test(message, args) {
    console.log("test")
}


bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;{


    var cmd = message.content.split(' ')[0].substr(config.prefix.length),
        args   = message.content.split(' ').slice(1)

    if (cmd in cmdmap) {
        cmdmap[cmd](message, args)
    }
}


});

//Welcome Message

bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'willkommen');

if (!channel) return;

channel.send(`Housten we have a Problem, ${member} joined!`);
});



let xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if(!xp[message.author.id]){
    xp[message.author.id] = {
        xp: 0,
        level: 1
    };
}


let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp =  curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
        .setTitle("Level Up!")
        .setColor(purple)
        .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
});




bot.login(token.token);