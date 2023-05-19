export type DateContextType = {
    value: {
        days: string[]
        months: string[]
        offdays: {
            [key: string]: string
        }
        dateObject: Date
    }
    getFullDate: () => string
    isOffDay: () => string
    getNumericDate: () => string
};


