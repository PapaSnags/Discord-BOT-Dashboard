const discord = require ("discord.js");
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const chalk = require('chalk');

exports.run = (client, message, args) =>{
    if(jsonfile.readFileSync(file).kick == "true"){
        const {member, mentions } = message

        const tag = `<@${member.id}>`
        if(message.guild.me.hasPermission('KICK_MEMBERS')){        
            if(
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')){
                const target = mentions.users.first()
                if(target){
                    const targetMember = message.guild.members.cache.get(target.id)
                    targetMember.kick()
                    const kick = new discord.MessageEmbed()
                    .setColor('#eb9d17')
                    .setTitle(`User Kicked`)
                    .addField("User",`${target} was kicked from the server!`)
                    .addField("Moderator",`${member}`)
                    .setThumbnail(target.avatarURL())
                    .setFooter("Made using Discord BOT Dashboard v1.1 by LachlanDev#8014", "https://avatars1.githubusercontent.com/u/58458169?s=460&u=79564adeae9287fecf24814f64ed89cff91ca358&v=4")
                    message.channel.send({embed: kick })
                }else{
                    message.channel.send(`${tag} please specify a user!`)
                }
            }else{
                message.channel.send(`${tag} you dont have permission.`)
            }
        }else{
            message.channel.send(`${tag} Sorry I dont have permission to Kick Members!`)
        }
    }
    else
    {
        console.log(chalk.red("Plugin Kick not enabled."))
    }
}