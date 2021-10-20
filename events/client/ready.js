const db = require("../../database/database.js")
const Ticket = require("../../models/Ticket.js")
module.exports = async bot => {
    console.log(`${bot.user.username} está online em ${bot.guilds.size} servidores com ${bot.users.size} membros.`)
    bot.user.setActivity("fiquei online!", {type: "STREAMING", url:"https://discord.gg/KBHNPYh"});

   let statuses = [
       `Bot teste.`,
       "Bot teste",
       `Bot teste!`
   ]

   setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status, {type: "WATCHING"});

   }, 5000)
   
   db.authenticate().then(() => {
        console.log("Conectado à base de dados!")
        Ticket.init(db)
        Ticket.sync()
        
    }).catch(function(err){console.log("\n\nOcorreu um erro ao conectar na base de dados!\n" + err)})
}