import { NavWrapper } from "./Navigation.styles";
import Search from "../Search/Search";
import LogoImg from "../../assets/img/taxscouts-logo.svg";

const Navigation = () => (
  <NavWrapper>
    <div><img src={LogoImg} alt="UNDO Logo" width="150" /></div>
    <div><Search /></div>
  </NavWrapper>
);

export default Navigation;
