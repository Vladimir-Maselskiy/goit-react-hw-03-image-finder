import { ImageGalleryItemStyled, ImageStyled } from './ImageGalleryItem.styled';

export default function ImageGalleryItem(props) {
  const {
    item: { webformatURL, tags,  largeImageURL },
  } = props;
  return (
    <ImageGalleryItemStyled>
      <ImageStyled
        src={webformatURL}
        alt={tags}
        data-largeimageurl={largeImageURL}
      />
    </ImageGalleryItemStyled>
  );
}
