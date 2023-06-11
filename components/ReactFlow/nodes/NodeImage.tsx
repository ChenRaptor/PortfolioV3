import styles from './nodes.module.scss'
import Image from 'next/image';

function NodeImage({data}:any) {

  return (
    <>
      {/* <div style={data.style}>
        <div>
          <Image src='/CV_Bonneau_Antoine.png' alt="Antoine Bonneau CV" fill />
        </div>
      </div> */}
      <div style={data.style}>
        <Image
            alt={data.alt}
            src={data.src}
            fill
        />
      </div>
    </>
  );
}

export default NodeImage;