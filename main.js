const Discord = require('discord.js')
const fs      = require('fs')


const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))


var client = new Discord.Client()



client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}...`)
})

var cmdmap = {
    say: cmd_say,
    test: cmd_test
}


function cmd_say(msg, args) {
    msg.channel.send(args.join(' '))
}


function cmd_test(msg, args) {
    console.log("test")
}

client.on('message', (msg) => {


    var cont   = msg.content,
    author = msg.member,
    chan   = msg.channel,
    guild  = msg.guild

    if (author.id != client.user.id && cont.startsWith(config.prefix)) {


    var invoke = cont.split(' ')[0].substr(config.prefix.length),
        args   = cont.split(' ').slice(1);

    if (invoke in cmdmap) {
        cmdmap[invoke](msg, args)
    }
}

})


client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find('willkommen', 'member-log');

if (!channel) return;

channel.send(`Welcome to the server, ${member}`);
});





client.login(config.token);


