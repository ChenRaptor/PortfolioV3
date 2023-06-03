import { useContext, useEffect, useState } from 'react'
import styles from './main.module.scss'
import { ProjectsContextType, ProjectsContext } from '@/components/Provider/Projects/main'
import TagLanguage from '@/components/Display/TagLanguage/TagLanguage'
import FormBar from '@/components/Input/FormBar/main';
import Input from '@/components/Input/TextField/main';
import { BlogContext, BlogContextType } from '@/components/Provider/Blog/main';
import { ClientContext, ClientContextType } from '@/components/Provider/Client/main';


function Disposer ({type, currentPage = 0} : {type: 'projects' | 'blog', currentPage?: number}) {

    const [page , setPage] = useState({currentPage, nbByPage: 6, pages: []})

    const context = useContext<ProjectsContextType | BlogContextType | null>((type === 'blog' ? BlogContext : ProjectsContext) as any)
    const { window } = useContext(ClientContext) as ClientContextType

    const getData = async (page: number, nbByPage: number) => {
        if (type === 'blog') {
            const data = await (context as ProjectsContextType).getData(page, nbByPage)
            setPage((prevState: any) => ({ ...prevState, currentPage: page, nbByPage, pages: { ...prevState.pages, [page]: data.value } }))
        }
        else {
            const data = await (context as BlogContextType).getData(page, nbByPage)
            setPage((prevState: any) => ({ ...prevState, currentPage: page, nbByPage, pages: { ...prevState.pages, [page]: data.value } }))
        }
    }

    useEffect(() => {
        context && getData(page.currentPage, window.width > 1200 ? 12 : window.width > 768 ? 9 : 6)
    },[context,window.width])

    const onSubmit = (e:any) => {console.log(e)};

    return (
        <div className={styles.main}>
            <FormBar onSubmit={onSubmit}>
                <Input flex={5} placeholder='search' name="search" />
                <input hidden type="submit" />
            </FormBar>
            <div className={styles.content}>


                { type === 'projects' 
                ? (page?.pages[page.currentPage] ?? []).map((repo: any) => (
                    <div key={repo._id} onClick={() => {}}>
                        <div>
                            <h3>{`${repo.name} (${repo.visibility})`}</h3>
                            <p>{repo.description}</p>
                        </div>
                        <div className={styles.tags}>
                            { repo.language ? <TagLanguage language={repo.language}/> : null }<p className={styles.updated}>{`Updated at: ${repo.updated_at}`}</p>
                        </div>
                    </div>
                )) 
                : (page?.pages[page.currentPage] ?? []).map((article: any) => (
                    <div key={article._id} onClick={() => {}}>
                        <div>
                            <h3>{`${article.name}`}</h3>
                            <p>{article.description}</p>
                        </div>
                    </div>
                ))
                }



            </div>
            <div className={styles.pagination}>
                <div>
                    { Array(Math.ceil((context?.data?.count ?? 0) / page.nbByPage)).fill('').map((pagex, index) => 
                        <div key={index} onClick={() => { 
                            console.log(page.nbByPage)
                            page.pages[index] 
                            ? setPage((prevState: any) => {
                                const newState = {...prevState}
                                newState.currentPage = index
                                return newState
                            })
                            : getData(index, page.nbByPage)
                        
                        }}>{index + 1}</div>
                    )}
                </div>
            </div>
        </div>
    );
    
    
}

export default Disposer