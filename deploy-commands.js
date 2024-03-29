const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Dit pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Retourne des infos sur le serv'),
	new SlashCommandBuilder().setName('user').setDescription('Retourne des infos sur toi'),
	new SlashCommandBuilder().setName('jeux').setDescription('Permet de jouer à des jeux !'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);