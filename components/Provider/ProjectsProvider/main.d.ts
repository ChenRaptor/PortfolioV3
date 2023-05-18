export interface ProjectInfo {
    configPath: string
    gitBranch: string
    gitUrl: string
    id: string
    name: string
    role: string
}

export interface Project {
    tabs: any
    tree: any
    info: ProjectInfo
    notifs: any
}

export type ProjectsContextType = {
    project: Project
};