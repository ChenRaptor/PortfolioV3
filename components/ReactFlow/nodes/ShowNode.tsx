import { Handle, Position } from 'reactflow';
import styles from './nodes.module.scss'
import StarIcon from '@/components/Icons/Star/main';

function ShowNode({data} : any) {

  return (
    <>
        <div className={styles.show}>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div>
                
            </div>
        </div>
      <Handle style={{ border: 0 }} type="target" position={Position.Left} id="left" />
      <Handle style={{ border: 0 }} type="source" position={Position.Right} id="right" />
    </>
  );
}

export default ShowNode;