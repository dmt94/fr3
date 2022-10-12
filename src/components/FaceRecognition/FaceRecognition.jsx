import BoundingBox from '../BoundingBox/BoundingBox';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
  const { faceRecognized } = box;
  return (
    <div className='center'>
      <div className='img-backdrop center'>
        <img 
          src={imageUrl} 
          alt="" 
          className='img-specs'
          id='inputimage'
          />
        <div 
          className='bounding-box-list'
          >
           {
            faceRecognized.forEach(object => {
              console.log(object)
            })
            } 
            
        </div>
      </div>

    </div>
  )
}

export default FaceRecognition;