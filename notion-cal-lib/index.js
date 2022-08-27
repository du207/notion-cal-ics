const { Client, isFullPage } = require("@notionhq/client");

const readNotionCal = async function (token, database_id) {
    try {
        const notion = new Client({
            auth: token,
        });

        const data = await notion.databases.query({
            database_id,
        });

        const ids = data.results.map((page) => isFullPage(page) && page.id);

        const getProperties = async (p) =>
            await Promise.all(
                data.results.map(
                    (page) =>
                        isFullPage(page) &&
                        notion.pages.properties.retrieve({
                            page_id: page.id,
                            property_id: page.properties[p].id,
                        })
                )
            );

        const titles = await getProperties("이름");
        const dates = await getProperties("날짜");

        return titles.reduce(
            (prev, curr, i) =>
                curr.results[0]?.title && dates[i].date
                    ? [
                          ...prev,
                          {
                              id: ids[i],
                              title: curr.results[0]?.title ? curr.results[0].title.plain_text : "",
                              date: dates[i].date,
                          },
                      ]
                    : prev,
            []
        );
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    readNotionCal,
};
