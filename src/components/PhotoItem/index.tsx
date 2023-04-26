import * as Sty from './style'

type Props = {
    url: string
    name: string
}

export const PhotoItem = ({url, name}: Props) => {
    return(
        <Sty.Container>
            <img src={url} alt={name} />
            {name}
        </Sty.Container>
    )
}