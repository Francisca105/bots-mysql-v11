const {bot} = require('../index');
const config = require("../config.json");

const Ticket = require("../models/Ticket.js")
const discord = require('discord.js')

bot.on("messageReactionAdd", async (reaction, user) => {
    if(user.bot) return;
    if(reaction.emoji.name === '🎫') {
        let findTicket = await Ticket.findOne({ where: { authorId: user.id, resolved: false }}).catch(err => console.log(err));
        if(findTicket) {
            user.send("Já tens um ticket aberto!");
        }
        else {
            console.log("A criar o ticket.")
            try {
                console.log("Criando o ticket.");
                let channel = await reaction.message.guild.createChannel('ticket', { 
                    type: 'text', 
                    permissionOverwrites: [
                        {
                            allow: 'VIEW_CHANNEL',
                            id: user.id
                        },
                        {
                            allow: 'VIEW_CHANNEL',
                            id: '290092310002270218'
                        },
                        {
                            deny: 'VIEW_CHANNEL',
                            id: reaction.message.guild.id
                        }
                    ]
                });

                // Create Embed Message and send it to channel.
                let embed = new discord.RichEmbed();
                embed.setTitle(`Ticket`);
                embed.setDescription("Olá! Espera aqui por ajuda!\nE já agora, ao reagires com ✅ fechas o ticket.");
                embed.setColor("#00FF4D");
                embed.setTimestamp();
                embed.setFooter("Bot teste mysql");
                let msg = await channel.send(embed);
                await msg.react('✅');

                let newTicket = await Ticket.create({
                    authorId: user.id,
                    channelId: channel.id,
                    guildId: reaction.message.guild.id,
                    resolved: false,
                    closeMessageId: msg.id
                });
                console.log("Ticket salvo...");
                let ticketId = String(newTicket.dataValues.ticketId).padStart(4, "0");
                await channel.edit({ name: `${channel.name}-${ticketId}`});
            }
            catch(ex) {
                console.log(ex);
            } 
        }
    }
    else if(reaction.emoji.name === "✅") {
        let embeds = reaction.message.embeds;
        if(embeds.length !== 1) {
            console.log("Mensagem incorreta.");
            return;
    }
    if(embeds[0].title === 'Ticket') {
        try {
            let tickets = await Ticket.update({ resolved: true }, { where: { closeMessageId: reaction.message.id }});
            let findTicket = await Ticket.findOne({ where: { closeMessageId: reaction.message.id }});
            let channel = reaction.message.channel;
            let updatedChannel = await channel.delete(15000).then(console.log('Ticket deletado.'))
        }
            catch(ex) {
                console.log(ex);
            }
        }
    }
})