// Require the necessary discord.js classes
const { Client, Intents, MessageButton, MessageActionRow, ButtonInteraction, Interaction, MessageAttachment, ContextMenuInteraction } = require('discord.js');
const { token } = require('./config.json');
const Canvas = require('canvas');



// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {

	if (interaction.isCommand()) {

		const { commandName } = interaction;

		if (commandName === 'ping') {
			await interaction.reply('Pong!');
		} else if (commandName === 'server') {
			await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		} else if (commandName === 'user') {
			await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
		} else if (commandName == 'jeux') {

			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('PileOuFace')
						.setLabel('Pile ou Face')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('BlackJack')
						.setLabel('BlackJack')
						.setStyle('PRIMARY'),

				);

			await interaction.reply({ content: "Quel jeu ?", components: [row] });

		}

	} else if (interaction.isButton()) {

		if (interaction.customId == "PileOuFace") {
			interaction.deferUpdate();

			const choix = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('Pile')
						.setLabel('Pile')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('Face')
						.setLabel('Face')
						.setStyle('SECONDARY'),
				);
			
			interaction.message.edit({ content: "Ton choix ?", components: [choix],files: ["./img/PileOuFace.png"] });
			console.log("PileOuFace");
		}
		if (interaction.customId == "Pile" || interaction.customId == "Face"){
			interaction.deferUpdate();
			const aleatoire = Math.floor(Math.random() * 2);
			let signe = " "
			let resultat = " "
			let image = " "
			if(aleatoire == 0){
				signe = "Face"
				image = "./img/face.png"
			}else{ signe = "Pile"; image = "./img/pile.png"}

			if(interaction.customId == signe){
				resultat = "gagné"
			}else{ resultat = "perdu" }

			const choix = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('PileOuFace')
						.setLabel('Rejouer')
						.setStyle(3),
					new MessageButton()
						.setCustomId('Stop')
						.setLabel('Quitter')
						.setStyle(4),
				);
			
			interaction.message.edit({ content: "C'est tombé sur "+ signe + " et vous avez donc " + resultat + " !", components: [choix] , files: [image]  });
		}
	

		if (interaction.customId == "Stop"){
			interaction.deferUpdate();
			interaction.message.edit({ content: "Bonne journée !", components: [], files: [] });
		}

		if (interaction.customId == "BlackJack") {
			interaction.deferUpdate();
			interaction.message.edit({ content: "Oops, something went wrong !", components: [] });
			console.log("BlackJack");
		}

		return;


	}

});

// Login to Discord with your client's token
client.login(token);