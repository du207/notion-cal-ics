type CalData = {
    id: string;
    title: string;
    date: {
        start: string;
        end: string | null;
    };
};

export function readNotionCal(token: string, database_id: string): Promise<CalData[]>;
