export type BlogContextType = {
    data: {
        value: any[]
        count: number | null
    }
    getData: (page: number, nbByPage: number) => Promise<any>
}