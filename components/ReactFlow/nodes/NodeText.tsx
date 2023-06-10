import { Handle, Position } from 'reactflow';
import styles from './nodes.module.scss'
import StarIcon from '@/components/Icons/Star/main';

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
            <div>
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
                        ? "Acquis" : "Parfaitement Acquis" }
                    </p>
                </div>
                <div>
                    <p>{data?.value?.content}</p>
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