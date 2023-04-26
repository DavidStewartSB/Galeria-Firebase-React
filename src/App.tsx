import { useState, useEffect, FormEvent } from 'react'
import * as Sty from './App.styles'
import * as Photos from './services/photos'
import { Photo } from './types/photo'
import {PhotoItem} from './components'

function App() {
  const [uploading, setUploading] = useState(false)
  const [loading, setState] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const getPhotos = async () => {
      setState(true)
      setPhotos(await Photos.getAll())
      setState(false)

    }
    getPhotos()
  }, [])

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File

    if(file && file.size > 0) {
      setUploading(true)
      let result = await Photos.insert(file)
      setUploading(false)

      if(result instanceof Error) {
        alert(`${result.name} - ${result.message} `)
      } else {
        let newPhotoList = [...photos]
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
    }
  }

  return(
    <Sty.Container>
      <Sty.Area>
       {/*=================Header====================*/}
        <Sty.Header>Galeria de Fotos</Sty.Header>
       {/*=================Área Upload====================*/}

        <Sty.UploadForm method="POST" onSubmit={handleFormSubmit}>
            <input type="file" name="image"/>
            <input type="submit" value={!uploading ? "Enviar" : "Enviando..."}/>
        </Sty.UploadForm>

       {/*=================Área Image===================*/}
        {loading &&
          <Sty.ScreenWarning>
            <span>Carregando...</span>
          </Sty.ScreenWarning>//Response return
        }

        {!loading && photos.length > 0 && 

          <Sty.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} url={item.url} name={item.name}/>
            ))}
          </Sty.PhotoList>//Response return
        }

        {!loading && photos.length === 0 &&
          <Sty.ScreenWarning>
            <span>Não há fotos</span>
          </Sty.ScreenWarning> //Response return

        }
      </Sty.Area>
    </Sty.Container>
  )
}

export default App
