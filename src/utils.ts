export const dateTimeArray = (date: Date): [number, number, number, number, number] => [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
];

export const dateArray = (date: Date): [number, number, number] => [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
];

export const getNextDay = (dateString: string) => {
    const date = new Date(dateString);
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
};
