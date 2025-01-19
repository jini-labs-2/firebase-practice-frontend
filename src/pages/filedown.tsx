import React, { useState } from 'react'
import { fbRef, fbStorage } from '../firebase';
import { getDownloadURL } from 'firebase/storage';
// import { getDownloadURL, ref } from 'firebase/storage';

const Filedown = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [previewOk, setPreviewOk] = useState(false);
  const [error, setError] = useState('');
  // const storage = getStorage();
  // const pathReference = ref(storage, filename);

  // // Create a reference from a Google Cloud Storage URI
  // const gsReference = ref(storage, 'gs://bucket' + filename);

  // // Create a reference from an HTTPS URL
  // // Note that in the URL, characters are URL escaped!
  //const fileUrl = 'https://firebasestorage.googleapis.com/b/bucket/o' + '/' + filename;
  // const httpsReference = ref(storage, fileUrl);

  const handleInputFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const url = 'http://127.0.0.1:9199/v0/b/fir-test-04-2f5cd.firebasestorage.app/o/images%2Fday4-temp2.png?alt=media&token=64d46b2d-db9a-48fb-b0a7-410aa7df0214';
    setFilename(e.target.value);
  };
  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const downFileRef = fbRef(fbStorage(), filename);
    if (!downFileRef) {
      setError('unkown download file url.')
      return;
    }
    getDownloadURL(downFileRef)
      .then((url) => {
        setFileUrl(url);
        setPreviewOk(true);
      })
      .catch((err) => {
        setError(err)
      })
  }

  const handleFileDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const downFileRef = fbRef(fbStorage(), filename);
    if (!downFileRef) {
      setError('unkown download file url.')
      return;
    }
    getDownloadURL(downFileRef)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';

        xhr.onload = (event) => {
          const blob = xhr.response;

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        };

        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log(`download rate : ${percentComplete}%`);
            // プログレスUI
          } else {
            // if event.lengthComputable = false : unknown file size
            console.log("downloading ...");
          }
        }

        xhr.open('GET', url);
        xhr.send();
      })
      .catch((err) => {
        setError(err);
      })
  }
  return (
    <div>
      <div style={{display: 'flex'}}>
        <label>Input download filename : </label>
        <input
          type='text'
          style={{width: '300px'}}
          value={filename}
          onChange={handleInputFilename} />
        <button onClick={handlePreview}>Preview</button>
      </div>
      <div style={{display: 'flex'}}>
        <label>file url : </label>
        <p>
          {fileUrl}
        </p>
      </div>
      <div>
        {error}
      </div>
      <hr />

      <div style={{display: 'flex'}}>
      <h2>PREVIEW</h2>
      <button onClick={handleFileDownload} disabled={!previewOk}>filedownload</button>
      </div>
      <hr />
      <div>
        <img src={fileUrl} style={{width: '200px'}}/>
      </div>
    </div>
  )
}

export default Filedown