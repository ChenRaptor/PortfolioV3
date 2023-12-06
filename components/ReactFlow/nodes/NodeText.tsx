import { Handle, Position } from 'reactflow';
import styles from './nodes.module.scss'
import StarIcon from '@/components/Icons/Star/main';
import Link from 'next/link';

function NodeText({data} : any) {

  
  return (
    <>
      <div className={styles.text}>
        <div>
            <div style={data?.colorLabel ? {background: data.colorLabel} : undefined}>
                <StarIcon/> <p>{ data.title }</p>
            </div>
            <div>
                { data.description }
            </div>
        </div>
        { data?.type === 'auto-eval' ?
            <div style={data?.value?.acquisition === null ? {background: '#1c1c1c'} : undefined}>


            
                <div className={styles[`activated${data?.value?.acquisition}`]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <p>
                        { data?.value?.acquisition === 0
                        ? "Pas du tout acquis" : 
                        data?.value?.acquisition === 1 
                        ? "Acquis Fragile" :
                        data?.value?.acquisition === 2 
                        ? "Acquis Partiel" :
                        data?.value?.acquisition === 3 
                        ? "Acquis" :
                        data?.value?.acquisition === 4 ? 
                        "Parfaitement Acquis" : null}
                    </p>
                </div>




                <div>
                    <p>{data?.value?.context}</p>
                </div>

                <div>
                    {
                        data?.value?.proof ? data?.value?.proof?.startsWith('http') ? 
			<Link target="blank" href={`${data?.value?.proof ?? ''}`}>Preuve</Link>
			: 
                        <Link target="blank" href={`${process.env.HOST}${data?.value?.proof ?? ''}`}>Preuve</Link>
                        : null
                    }
                </div>
            </div>
        : null }
      </div>
      <Handle style={{background: data.colorLabel, border: 0, }} type="target" position={Position.Left} id="left" />
      { data?.type !== 'auto-eval' ?
      <Handle style={{background: data.colorLabel, border: 0, }} type="source" position={Position.Right} id="right" />
      : null}
    </>
  );
}

export default NodeText;
