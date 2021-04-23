const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const config = require('./config.json');
const command = require('./command');
const categories = require('./categories.json')

client.on('ready', () => {
        console.log('Bot is ready!');

        command(client, 'createtextchanneleverywhere', (message) => {
            const name = message.content.replace('!createtextchanneleverywhere ','');
            if (message.channel === 'bot-testing') {
                categories.categories.forEach(category => {
                    message.guild.channels.create(name, {
                        type: 'text'
                    })
                    .then((channel) => {
                        channel.setParent(category.id)
                    })
                });
            }
        });

        command(client, 'createvoicechanneleverywhere', (message) => {
            const name = message.content.replace('!createvoicechanneleverywhere ','');
            if (message.channel === 'bot-testing' && message.author.tag === 'Hassen Khouja#8728') {
                categories.categories.forEach(category => {
                    message.guild.channels.create(name, {
                        type: 'voice'
                    })
                    .then((channel) => {
                        channel.setParent(category.id)
                    })
                });
            }
        });

        command(client, 'consolelogchannels', (message) => {
            author = message.author.tag;
            message.guild.channels.cache.forEach(channel => {
                console.log(`Channel: ${channel.name} + | Type: ${channel.type}`);
            });
            console.log(`Command run by: ${author}`);
        });

        
});

client.on("guildMemberAdd", (member) => {
    const memberRole = member.guild.roles.cache.find(role => role.name === 'Member');
    const channel = client.channels.cache.find(channel => channel.name === 'bot-testing');
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    channel.send(`"${member.user.username}" has joined this server`);
    member.roles.add(memberRole);
    console.log(`New User "${member.user.username}" was given the role "${memberRole.name}"` );
    channel.send(`"${member.user.username}" was given the role "${memberRole.name}"`);
});

client.on('guildMemberRemove', (member) => {
    const channel = client.channels.cache.find(channel => channel.name === 'bot-testing');
    console.log(`User "${member.user.username}" was removed from "${member.guild.name}"`);
    channel.send(`"${member.user.username}" was removed from this server`); 
});

client.on('message', (msg) => {
        if (msg.content === 'Ray3oun' || msg.content === 'ray3oun') {
            msg.reply('Bonjour :D')
        }
});

client.login(process.env.BOT_TOKEN);

