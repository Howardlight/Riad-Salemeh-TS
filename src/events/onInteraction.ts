import { CommandInteraction, InteractionType, Interaction } from "discord.js";
import { interactions } from "..";
// import { deleteCommands } from "../utils/delete-commands";

export const onInteraction = async (interaction: Interaction) => {


    // console.log(`${interaction.user.tag} in #${interaction.channel!} triggered an interaction.`);
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    const command: any = interactions.get(interaction.commandName);

    // Remove this if you're trying to remove commands!
    if (!command) return;

    try {
        // executes commands    
        await command.execute(interaction);

        // ONLY UNCOMMENT WHEN TRYING TO DELETE COMMANDS
        // await deleteCommands(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
    }
}