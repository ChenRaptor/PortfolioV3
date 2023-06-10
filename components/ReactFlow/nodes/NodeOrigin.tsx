import { Handle, Position } from 'reactflow';
import styles from './nodes.module.scss'
import Image from 'next/image';
function NodeOrigin() {

  return (
    <>
      <div className={styles.origin}>
        <div>
          <Image src='/picme.png' alt="Antoine Bonneau" fill/>
        </div>
      </div>
      <Handle style={{background: "#45425c", border: 0, }} type="source" position={Position.Right} id="right" />
    </>
  );
}

export default NodeOrigin;