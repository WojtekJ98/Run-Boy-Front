import styled from "styled-components";

const CartStyles = styled.div`
  padding: 20px;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 155;
  opacity: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`}
  ${(props) => props.open && `opacity: 1;`}
  @media (max-width: 680px) {
    min-width: 400px;
  }
  @media (max-width: 450px) {
    min-width: 300px;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #333;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    div {
      display: flex;
      align-items: center;
    }
    button {
      padding: 6px 10px;
      border: 1px solid #333;
      border-radius: 25px;
      background-color: #dadada;
      transition: all 0.3s;
      box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);

      &:hover {
        transform: scale(1.1);
        font-weight: bold;
        box-shadow: none;
      }
    }
  }
  footer {
    width: 100%;
    border-top: 10px double #333;
    margin-top: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 2rem;
    font-weight: 900;

    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: scroll;
  }
`;

export default CartStyles;
