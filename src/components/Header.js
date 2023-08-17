import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, provider} from "../firebase";
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from "../features/user/UserSlice";

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                history("/home");
            }
        });
    }, [userName]);

    const handleAuth = () => {
        if (!userName) {
            signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
            })
            .catch((error) => {
                alert(error.message);
            });
        } else if (userName) {
            signOut(auth)
            .then(() => {
                dispatch(setSignOutState());
                history("/");
            })
            .catch((err) => alert(err.message));
        }
    };

    const setUser = (user) => {
        dispatch(
          setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
    };

  return (
    <Nav>
        <Logo>
            <img src='/images/logo.svg' />
        </Logo>
        {!userName ? (
            <Login onClick={handleAuth}>Login</Login>
            ) : (
                <>
                <NavMenu>
                    <a href='/home'>
                        <img src='/images/home-icon.svg' alt="HOME" />
                        <span>HOME</span>
                    </a>
                    <a href='/search'>
                        <img src='/images/icon-search.svg' alt="SEARCH" />
                        <span>SEARCH</span>
                    </a>
                    <a href='/watchlist'>
                        <img src='/images/icon-watchlist.svg' alt="WATCHLIST" />
                        <span>WATCHLIST</span>
                    </a>
                    <a href='/orginals'>
                        <img src='/images/icon-originals.svg' alt="ORIGINALS" />
                        <span>ORIGINALS</span>
                    </a>
                    <a href='/movies'>
                        <img src='/images/icon-movies.svg' alt="MOVIES" />
                        <span>MOVIES</span>
                    </a>
                    <a href='/series'>
                        <img src='/images/icon-series.svg' alt="SERIES" />
                        <span>SERIES</span>
                    </a>
                </NavMenu>
                <SignOut>
                    <UserImg src={userPhoto} alt={userName} />
                    <DropDown>
                    <span onClick={handleAuth}>Sign out</span>
                    </DropDown>
                </SignOut>
                </>
                )}
    </Nav>
  );
};

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    poition: relative;
    margin-right: auto;
    margin-left: 30px;

    a {
        padding: 0px 15px;
        display: flex;
        align-items: center;

        img{
            height: 22px;
            min-width: 22px;
            width: 50px;
            align: center;
            z-index: auto;
        }

        span {
            color: rgb(249, 249, 249);
            font-size: 14px;
            letter-spacing: 1.5px;
            light-height: 1;
            padding: 3px 0px;
            white-space: nowrap;
            position: relative;

            &:before {
                background-color: rgb(249, 249, 249);
                broder-radius: 0px 4px;
                width: auto;
                position: absolute;
                bottom: -4px;
                height: 2px;
                left: 0px;
                right: 0px;
                content: "";
                opacity: 0;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bexier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
            }
        }
        &:hover {
            span:before {
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 8px 16px;
    border: 1.5px solid #f9f9f9;
    border-radius: 3px;
    transition: all .2s ease 0s;

    &:hover {
        color: #000;
        background-color: #f9f9f9;
        border-color: transparent;
    }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;