import {Message} from "discord.js";
import {CommandInt} from "../interfaces/CommandInt";

export const fuel: CommandInt = {
    name: "fuel",
    description: "Get price of fuel in LL",
    run: async (message: Message) => {

        try{

            if(fuelRate[0] == "NULL") {
                await message.channel.send("This command is currently unavailable.");
                return ;
            }

            await message.channel.send(`Octane 95: ${fuelRate[1]}\nOctane 98: ${fuelRate[2]}\nDiesel: ${fuelRate[3]}\nGas: ${fuelRate[4]}\nCrude Oil: ${fuelRate[5]}\n${fuelRate[0]}`);

        } catch(error) {
            console.log(error);
            await message.channel.send("This command is currently unavailable.");
        }
    }
}