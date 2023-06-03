export interface Project {
    name: string
    full_name: string
    private: boolean
    html_url: string
    description: string | null
    fork: boolean
    created_at: string
    updated_at: string
    pushed_at: string
    size: number
    main_language: string
    languages_distribution: {[key: string] : number}
    visibility: string
    default_branch: string
}


export type Projects = Project[]

export type ProjectsContextType = {
    data: {
        value: Projects
        count: number | null
    }
    getDataFromDb: (page: number, nbByPage: number) => void
    getData: (page: number, nbByPage: number) => Promise<any>
}