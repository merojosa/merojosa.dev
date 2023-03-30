export const getDateForTimeTag = (date: Date) => ({
    dateDisplay: new Intl.DateTimeFormat("local", {
        dateStyle: "long",
    }).format(date),
    datetime: `${date.getFullYear()}-${date.getMonth() + 1
        }-${date.getDate()}`
} as const)