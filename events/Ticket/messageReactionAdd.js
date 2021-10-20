const db = require("../../database/database.js")
const Ticket = require("../../models/Ticket.js")
const ready = require("../client/ready.js")

module.exports = async (reaction, user) => {
    if(user.bot) return;
    if(reaction.emoji.name === '🎫') {
        console.log('A criar o ticket.')
    }
}