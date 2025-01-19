// import { getStorage, listAll, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { fbRef, fbStorage } from '../firebase';
import { listAll } from 'firebase/storage';

interface FileList {
  name: string,
  bucket: string,
  fullPath: string,
}

const Filelist = () => {
  const [filelist, setFilelist] = useState<FileList[]>([]);
  const [queryfile, setQueryfile] = useState('');

  const getFileList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setFilelist([]);
    const storageRef = fbStorage();
    const listRef = fbRef(storageRef, queryfile);
    listAll(listRef)
      .then((res) => {
        console.log(res);
        res.prefixes.forEach((folderRef) => {
          console.log('--folderRef--', folderRef)
        });
        
        const itemList = res.items.map((item) => {
          const {name, bucket, fullPath} = item;
          return {name, bucket, fullPath}
        })
        setFilelist(itemList)
      })
      .catch((err) => console.error(err))
    }

  return (
    <div>
      <input type='text' value={queryfile} onChange={(e) => setQueryfile(e.target.value)}/>
      <button onClick={getFileList}>Get File List</button>
      <p>件数：{filelist.length}</p>
      <div style={{padding: '0.5rem', display:'flex', justifyContent: 'space-between', color: 'black', fontWeight: '800'}}> 
        <span> name </span>
        <span> fullPath </span>
        <span> bucket </span>
      </div>
      {
        filelist ?  filelist.map((item, index) => (
          <div key={index} style={{padding: '0.5rem', display:'flex', justifyContent: 'space-between'}}> 
            <span> {item.name} </span>
            <span> {item.fullPath} </span>
            <span> {item.bucket} </span>
          </div>
        )) : ''
      }
    </div>
  )
}

export default Filelist