import { Photo } from '../types/photo'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'
import { storage } from '../libs/firebase'
import {v4 as creatId} from 'uuid'

export const getAll = async () => {
    let list: Photo[] = []

    const imagesFolder = ref(storage, "images")
    const photoList = await listAll(imagesFolder)

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i])

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        })
    }

    return list 
}

export const insert = async (file: File) => {
    if(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)){
        let randomName = creatId()
        let newFile = ref(storage, `images/${randomName}`)

        let upload = await uploadBytes(newFile, file)
        let photoUrl = await getDownloadURL(upload.ref)
        
        return { name: upload.ref.name, url: photoUrl} as Photo
    } else {
        return new Error('Tipo de Arquivo não permitido!!')
    }
}