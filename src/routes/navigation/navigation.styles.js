import styled from "styled-components"; //arriva con tutti i tag html possibili
import { Link } from "react-router-dom"; // posso inserire un componente già esistente dentro styled
// ora  praticamente dobbiamo creare tutti tag html nei quali inserire il nostro contenuto
export const NavigationContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`
// .navigation {
    // height: 70px;
    // width: 100%;
    // display: flex;
    // justify-content: space-between;
    // margin-bottom: 25px;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`
  
//     .logo-container { //era classe del componente Link di react-router-dom
//       height: 100%;
//       width: 70px;
//       padding: 25px;
//     }

export const NavLinksContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
//     .nav-links-container { //era la classe di un div
    //   width: 50%;
    //   height: 100%;
    //   display: flex;
    //   align-items: center;
    //   justify-content: flex-end;
  
export const NavLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`
//       .nav-link { //erano i singoli link nela navBar
//         padding: 10px 15px;
//         cursor: pointer;
//       }
//     }
//   }
  