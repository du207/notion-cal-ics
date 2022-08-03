import "dotenv/config";
import { createEvents } from "ics";
import { readNotionCal } from "notion-cal-lib";
import { writeFile } from "fs/promises";
import { notify } from "node-notifier";
import { dateArray, dateTimeArray, getNextDay } from "./utils";

const syncToIcs = async () => {
    const token = process.env.NOTION_TOKEN;
    const database_id = process.env.DATABASE_ID;

    if (!token) throw new Error("No token provided");
    if (!database_id) throw new Error("No database id provided");

    const notionCal = await readNotionCal(token, database_id);

    createEvents(
        notionCal.map(({ title, date: { start, end } }) => {
            let startArray, endArray;
            if (start.includes("T")) {
                // time included
                startArray = dateTimeArray(new Date(start));
                endArray = end ? dateTimeArray(new Date(end)) : startArray;
            } else {
                // time not included => all day event
                startArray = dateArray(new Date(start));
                // end have to be the day after start.
                endArray = end ? dateArray(new Date(end)) : dateArray(getNextDay(start));
            }

            return {
                title,
                start: startArray,
                end: endArray,
                startOutputType: "local",
                endOutputType: "local",
            };
        }),
        async (err, value) => {
            if (err) throw err;

            const withTZ = value
                .replaceAll("DTSTART:", "DTSTART;TZID=Asia/Seoul:")
                .replaceAll("DTEND:", "DTEND;TZID=Asia/Seoul:");

            await writeFile("./notion.ics", withTZ);
        }
    );
};

const main = async () => {
    try {
        await syncToIcs();
    } catch (err) {
        console.error(err);
        notify({
            title: "Notion ICS Syncing Error",
            message: "Check the log",
        });
    }
};
main();
