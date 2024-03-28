import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {
  selectUserName,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/search");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [userName, navigate]);

  useEffect(() => {
    const unsubscribe = db.collection("movies").onSnapshot((snapshot) => {
      const movieData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movieData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      if (!userName) {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
      } else {
        await auth.signOut();
        dispatch(setSignOutState());
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <SearchInput>
            <SearchIconWrapper>
              <Icon />
            </SearchIconWrapper>
            <input
              type="text"
              placeholder="Movies, shows and more"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <IoClose onClick={() => setSearchTerm('')} style={{ fontSize: '24px'}}/>
            )}
          </SearchInput>
          {filteredMovies.length === 0 && searchTerm.trim() !== "" ? (
            <NoContentMessage>{`Couldn't find "${searchTerm.trim()}". Try searching for something else or try with a different spelling.`}</NoContentMessage>
          ) : (
            <Content>
              {filteredMovies.map((movie, index) => (
                <Wrap key={index}>
                  <Link to={`/detail/${movie.id}`}>
                    <img src={movie.cardImg} alt={movie.title} />
                  </Link>
                </Wrap>
              ))}
            </Content>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.main`
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 72px;
  padding: 10px;
  font-size: 20px;
  background-color: #35374b;
  color: #fff;
  position: relative;
  border-radius: 4px;

  input {
    flex: 1;
    border: none;
    background-color: transparent;
    color: #fff;
    outline: none;
    padding-left: 60px;
    height: 30px;

    &::placeholder {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 16px;
    margin-top: 52px;

    input {
      padding-left: 40px;
    }
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 100%;
  position: absolute;
  left: 0;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

const Icon = styled(FiSearch)`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const NoContentMessage = styled.p`
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

export default Search;
