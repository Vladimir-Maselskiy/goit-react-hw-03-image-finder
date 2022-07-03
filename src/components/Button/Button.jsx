import { ButtonStyled } from './Button.styled';

export default function Button(props) {
  return (
    <ButtonStyled onClick={props.onLoadMoreButtonClick}>Load more</ButtonStyled>
  );
}
