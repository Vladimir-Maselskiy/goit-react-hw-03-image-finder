import { ImageGalleryItemStyled, ImageStyled } from './ImageGalleryItem.styled';

export default function ImageGalleryItem(props) {
  const {
    item: { webformatURL, tags },
  } = props;
  return (
    <ImageGalleryItemStyled>
      <ImageStyled src={webformatURL} alt={tags} />
    </ImageGalleryItemStyled>
  );
}
