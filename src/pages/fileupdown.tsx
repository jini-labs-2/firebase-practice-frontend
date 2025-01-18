import React from 'react'
import { fbStorage } from '../firebase'
import { uploadBytes, ref } from 'firebase/storage'

const Fileupdown = () => {
  const onFileUploadtoFirebase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files ? e.target.files[0] : null;
    console.log(uploadFile?.name);
    const storageRef = 
      uploadFile?.name ?
      ref(fbStorage, `${uploadFile.name}`) : 
      null;
    if (storageRef && uploadFile) {
      uploadBytes(storageRef, uploadFile).then(() => {
        console.log('Upload a blob or file.!');
      });
    }
  }
  return (
    <div>
      <div className='imageUploadBox'>
        <div className='imageUploadText'>
          <h2>image upload</h2>
          <p>jpg or png</p>
        </div>
      </div>
        <input
          name="fileUpload"
          type="file"
          multiple
          accept='.png, .jpeg, .jpg, .pdf'
          onChange={onFileUploadtoFirebase}
        />
    </div>
  )
}

export default Fileupdown