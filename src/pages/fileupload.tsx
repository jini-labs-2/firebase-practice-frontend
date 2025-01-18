import React, { useState } from 'react'
import { fbStorage } from '../firebase'
import { ref, uploadBytesResumable } from 'firebase/storage'

const Fileupload = () => {
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const onFileUploadtoFirebase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files ? e.target.files[0] : null;
    console.log(uploadFile?.name);
    const storageRef = 
      uploadFile?.name ?
      ref(fbStorage, `${uploadFile.name}`) : 
      null;
    if (storageRef && uploadFile) {
      // uploadBytes(storageRef, uploadFile).then(() => {
      //   console.log('Upload a blob or file.!');
      // });
      const uploadTask = uploadBytesResumable(storageRef, uploadFile);
      uploadTask.on("state_changed",
        (snapshot) => {
          setUploading(true);
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('uploaded is '    + progress + '%');
          switch(snapshot.state) {
            case 'paused': console.log('upload pause');
              break;
            case 'running': console.log('uploading');
              break;
          }
        },
        (err) => {
          console.log(`uploading fail, ${uploadFile.name}`, err);
        },
        () => {
          console.log(`uploading completed`);
          setUploading(false);
          setIsUploaded(true);
        }
      )

    }
  }
  return (
    <div>
      {uploading ? (
        <>
          <h2>アップロード中</h2>
        </>
       ) : (
        <>
        {isUploaded ? (
          <>
            <h2>アップロード完了..</h2>
          </>
        ) : (
          <>
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
          </>
        )}
        </>
       )
      }
    </div>
  )
}

export default Fileupload