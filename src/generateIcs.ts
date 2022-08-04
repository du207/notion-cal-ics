import "dotenv/config";
import { createEvents } from "ics";
import { readNotionCal } from "notion-cal-lib";
import { dateArray, dateTimeArray, getNextDay } from "./utils";

export default async function () {
    const token = process.env.NOTION_TOKEN;
    const database_id = process.env.DATABASE_ID;

    if (!token) throw new Error("No token provided");
    if (!database_id) throw new Error("No database id provided");

    const notionCal = await readNotionCal(token, database_id);

    const { error, value } = createEvents(
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
        })
    );

    if (error || !value) throw error;

    const icsWithTZ = value
        .replaceAll("DTSTART:", "DTSTART;TZID=Asia/Seoul:")
        .replaceAll("DTEND:", "DTEND;TZID=Asia/Seoul:");

    return icsWithTZ;
}
