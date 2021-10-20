const fs = require("fs");

module.exports = (bot) => {

    fs.readdir("./events/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return console.log("There are no events to load...");
        console.log(`\nA carregar ${jsfiles.length} eventos...`);
        jsfiles.forEach((f, i) => {
            require(`./events/${f}`);
            console.log(`${i + 1}: ${f} carregado!`);
        });
    });

    fs.readdir("./commands/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log("Não existem comandos para carregar...");

        console.log(`\nA carregar ${jsfiles.length} comandos...`);
        jsfiles.forEach((f, i) => {
            let props = require(`./commands/${f}`);
            console.log(`${i + 1}: ${f} carregado!`);
            bot.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            });
        });
    });

};