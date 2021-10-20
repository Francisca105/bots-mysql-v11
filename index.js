const { Client, Collection } = require("discord.js");
const discord = require("discord.js");
const { token } = require("./config.json");
const bot = new discord.Client();
require("./handler")(bot);

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.afk = new Map();

module.exports.bot = bot;

bot.login(token);