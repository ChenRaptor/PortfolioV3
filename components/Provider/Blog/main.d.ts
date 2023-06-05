export type BlogContextType = {
    data: {
        value: any[],
        valid: number | null
        total: number | null
    }
    getData: (page: number, nbByPage: number, optionsSearch?: any) => Promise<any>
    getOneData: (repo: string) => Promise<any>
}