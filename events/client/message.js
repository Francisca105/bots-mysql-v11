const { prefix } = require("../../config.json");
const fs = require('fs')
module.exports = async (bot, message) => { 
    //Resposta a menção
    if (message.content.startsWith(`<@${bot.user.id}>`)){
      message.channel.send(`Quem me chamou?`)
    }    
    //Palavras Proibidas
      let WordArray = message.content.split(" ")
      let blaclist = ["fuck", "fuder", "foder", "foda-se", "fodasse", "puta", "otário", "otario", "cabrão", "cabrao", "caralho", "merda", "pussy"]
      
      for (var i = 0; i < blaclist.length; i++){
        if(WordArray.includes(blaclist[i])){
          message.delete(),
          message.reply("Parece que a sua mensagem continha uma __palavra proibída__!")
        }
      }
    //sistema de perguntas
        if (message.content.startsWith("Bot, como te chamas?")){
            message.channel.send(`Olá, eu chamo-me ${client.user.username}!`)
        }      

    //Bloqueador de invites
    let membro = message.member
    let guild = message.guild
    //let role = guild.roles.find(r => r.name === "💫▸Divulgador")
    let convite = /(discord.gg|discordapp.com)\/(invite)?/ig.test(message.content)
        if(convite === true) {
          if(membro.guild.id !== "677993935628664854") return;
          if(membro.roles.has("681833768461402112")) return;
            message.delete()
            message.reply('Não pode divulgar convites de outros servidores aqui!')
        }        
        
    //Comandos
    if(message.author.bot || message.channel.type === "dm") return;

    let prefixo = prefix;
    let args = message.content.slice(prefixo.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefixo)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
    
    let TicketE = new discord.RichEmbed()
    .setColor('GREEN')
    .setAuthor('Ticket Suporte', bot.avatarURL)
    .setDescription('Reaje com o emoji > 🎫 < para criar o teu ticket!')
    .setFooter('Tens uma dúvida? Abre um ticket!')
    .setTimestamp()

    if(message.content === 'TicketE') message.channel.send(TicketE).then(message => message.react('🎫'))

}