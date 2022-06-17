import styled from "styled-components";
import { colors } from "../components/colors";
import {Link} from "react-router-dom"
import { keyframes } from 'styled-components'
import { profileBackground } from "../assets";


const slideAnimation = keyframes`
 0% { transform: translateX(50%) }
 50% { transform: translateX(70%) }
 100% { transform: translateX(100%) }
`

const SecondaryBtn = styled.button`
  outline: none;
  border: 2px solid ${colors.black};
  background-color: ${colors.secondary};
  width: 100%;
  height: 50px;
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border-radius: 50px;
  margin: 20px 0;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  padding-top: 15px;
`;

const WhiteBtn = styled(SecondaryBtn)`
  background-color: ${colors.white};
`;

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const StyledInput = styled.input`
  outline: none;
  padding: 10px;
  width: 100%;
  height: 50px;
  color: ${colors.black};
  border-radius: 50px;
  margin: 10px 0;
  border: 2px solid ${colors.black};
  padding-right: 50px;
  font-weight: 400;
`;

const WhiteInput = styled(StyledInput)`
  border: none;
  border-bottom: 1px solid #fff;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  color: #fff;
  background: none;
  border-radius: 0px;
  &::placeholder {
    color: #ccc
  }
`

const AmountInput = styled.input`
  outline: none;
  border: none;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  padding: 15px;
  font-weight: 500;
  width: 100%;
  height: 50px;
  color: ${colors.black};
`;

const CustomColoredBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 30px;
  color: ${colors.white};
  background-color: ${props=>props.bgColor};
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
  outline: none;
  border: none;
  opacity: ${props => props.disabled ? "0.5" : 1}
`;

const CustomModal = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: ${props =>props.height}px;
  width: ${props =>props.width}%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white}
`;

const MenuContainer = styled.div`
  position: absolute;
  padding: 10px;
  top: 0;
  z-index: 1;
  height: 100vh;
  width: 100%;
  background-color: ${colors.white};
`;

const MenuItem = styled(Link)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: ${colors.black};
  &:active {
    color: ${colors.black};
  }
  &:focus {
    color: ${colors.black};
  }
  &:visited {
    color: ${colors.black};
  }
`;

const UploadField = styled.input`
  height: 120px;
  width: 100%;
  border-radius: 20px;
  outline: none;
  border: 2px solid #ccc;
  padding: 10px;
`;

const StyledProfileBackground = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${profileBackground});
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
`;

const WhiteSection = styled.div`
  background-color: #fff;
  border-radius: 20px;
  width: 100%;
  height: 150px;
  padding: 10px;
  box-shadow: 2px 2px 20px 2px #ccc;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const GreenSection = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  height: 400px;
  width: 100%;
  padding: 10px;
`;

const OptionCircle = styled.div`
  background-color: ${props=>props.color};
  border-radius: 50%;
  height: 130px;
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

export { SecondaryBtn, WhiteBtn, Container, StyledInput, CustomColoredBtn, AmountInput, CustomModal, MenuContainer, MenuItem, UploadField, StyledProfileBackground, WhiteSection, GreenSection, WhiteInput, OptionCircle };
