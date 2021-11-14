import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const Cheerio = require("../../node_modules/cheerio");
const fetch = require("../../node_modules/node-fetch");

// use Fetch to get the website
const getRawData = (URL: string) => {
    return fetch(URL)
        .then((response: any) => response.text())
        .then((data: string) => {
            return data;
        });
};

// website, might modify later
const URL: string = "https://lbprate.com/";

// Process the website then return List
// of desired values
const getWebsiteData = async () => {
    const lbpRaw = await getRawData(URL);
    const parsedData = Cheerio.load(lbpRaw);

    let list: string[] = []; // i refers to the index, e refers to the element
    parsedData(".text-white").each(function (i: any, e: any) {
        list[i] = parsedData(e).text();
    });

    return list;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lbprate')
        .setDescription("use Fetch and Cheerio to get the LBP rate"),
    async execute(interaction: CommandInteraction) {

        const buyRate = await getWebsiteData();

        // quirklines on the top
        const quirkline = [
            "El lira b2alf 5er tfarrage:",
            "I did some handaset, and the new Lira value is:",
            "Your local serraf says:",
            "Ana ma 5assni, bss llira lyom:",
            "Bisallem 3lek Michel Aoun:",
            "Discount 51%, bss la 2elak:",
        ];

        // create the response, the extended response, concat then return
        const response = `${quirkline[Math.floor(Math.random()*quirkline.length)]}`;
        const extendedResponse = (`\nThe BUY rate is ${buyRate[2]}\nThe SELL rate is ${buyRate[4]}\n${buyRate[0]}`);
        await interaction.reply(response.concat(extendedResponse));
    }
};