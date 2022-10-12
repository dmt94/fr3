import BoundingBox from '../BoundingBox/BoundingBox';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
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
            box.faceRecognized.map(
              (personObject) => {
              return(
              <BoundingBox person={personObject} />
              )}
            )
            } 
            
        </div>
      </div>

    </div>
  )
}

export default FaceRecognition;