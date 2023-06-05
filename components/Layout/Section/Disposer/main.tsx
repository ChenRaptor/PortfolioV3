"use client"
import { useContext, useEffect, useMemo, useState } from 'react'
import styles from './main.module.scss'
import { ProjectsContextType, ProjectsContext } from '@/components/Provider/Projects/main'
import TagLanguage from '@/components/Display/TagLanguage/TagLanguage'
import FormBar from '@/components/Input/FormBar/main';
import Input from '@/components/Input/TextField/main';
import { BlogContext, BlogContextType } from '@/components/Provider/Blog/main';
import { useRouter } from 'next/navigation'

interface DisposerProps {
    type: 'projects' | 'blog',
    currentPage?: number
    dashboardLink?: boolean
}

interface getDataProps {
    page: number,
    wipe: boolean
    optionsSearch?: any
}

interface stateProps {
    currentPage: number, 
    nbByPage: number, 
    pages: any[], 
    valid: number | null, 
    total: number | null
}


function Disposer ({type, currentPage = 0, dashboardLink} : DisposerProps) {


    const router = useRouter()
    const nbByPage = useMemo(() => {
        if (typeof window !== 'undefined') {
          return window.innerWidth > 1200 ? 12 : window.innerWidth > 768 ? 9 : 6;
        }
        else {
            return 12
        }
    }, []);



    const [page, setPage] = useState<stateProps>({currentPage, nbByPage, pages: [], valid: null, total: null})


    const [optionsSearch2, setOptionsSearch] = useState({
        regex: null,
    })

    const context = useContext<ProjectsContextType | BlogContextType | null>((type === 'blog' ? BlogContext : ProjectsContext) as any)

    const getData = async ({ page, wipe, optionsSearch }: getDataProps) => {
        const data = await context?.getData(page, nbByPage, optionsSearch ?? optionsSearch2);
        setPage((prevState: any) => {
            const updatedPages = wipe
            ? { [page]: data.value }
            : { ...prevState.pages, [page]: data.value };
        
            return {
                ...prevState,
                currentPage: page,
                nbByPage,
                pages: updatedPages,
                valid: data.valid,
                total: data.total,
            };
        });
    };

    useEffect(() => {
        context && getData({
            page: page.currentPage,
            wipe: false
        })
    },[context, nbByPage])

    
    const onSubmit = (e: any) => {
        setOptionsSearch(e)
        getData({
            page: page.currentPage,
            wipe: true,
            optionsSearch: e
        })
    };

    return (
        <div className={styles.main}>
            <FormBar onSubmit={onSubmit} submitOnChange >
                <Input flex={5} placeholder='search' name="regex" />
                <input hidden type="submit" />
            </FormBar>
            <div className={styles.content}>


                { type === 'projects' 
                ? (page?.pages[page.currentPage] ?? []).map((repo: any) => (
                    <div key={repo._id} onClick={() => {
                        dashboardLink 
                        ? router.push(`/dashboard/projects/${repo.name}`)
                        : null
                    }}>
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
                    <div key={article._id} onClick={() => {
                        dashboardLink 
                        ? null
                        : router.push(`/blog/${article.name}`)
                    }}>
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
                    { Array(Math.ceil((page?.valid ?? 0) / page.nbByPage)).fill('').map((pagex, index) => 
                        <div key={index} onClick={() => {
                            if (page.pages[index]) {
                              setPage((prevState: any) => ({
                                ...prevState,
                                currentPage: index
                              }));
                            } else {
                              getData({
                                page: index,
                                wipe: false,
                                optionsSearch: optionsSearch2
                              });
                            }
                        }}>{index + 1}</div>
                    )}
                </div>
            </div>
        </div>
    );
    
    
}

export default Disposer