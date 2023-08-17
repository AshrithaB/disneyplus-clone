import styled from 'styled-components';
import ImageSlider from "./ImageSlider";
import Viewers from './Viewers';
import NewDisney from "./NewDisney";
import ComingSoon from "./ComingSoon";
import Recommends from "./Recommends";
import Trending from "./Trending";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../firebase";
import { setMovies } from '../features/movie/MovieSlice';
import { selectUserName } from '../features/user/UserSlice';
import { collection, onSnapshot } from 'firebase/firestore';

const Home = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'movies'), (snapshot) => {
            const recommends = [];
            const newDisneys = [];
            const comingsoon = [];
            const trending = [];

            snapshot.forEach((doc) => {
                const movieData = { id: doc.id, ...doc.data() };

                switch (movieData.type) {
                    case 'recommend':
                        recommends.push(movieData);
                        break;
                    case 'new':
                        newDisneys.push(movieData);
                        break;
                    case 'comingsoon':
                        comingsoon.push(movieData);
                        break;
                    case 'trending':
                        trending.push(movieData);
                        break;
                }
            });

            dispatch(
                setMovies({
                    recommend: recommends,
                    newDisney: newDisneys,
                    comingSoon: comingsoon,
                    trending: trending
                })
            );
        });
        return () => {
            unsubscribe();
        };
    }, [userName]);

    return(
        <Container>
            <ImageSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Trending />
            <ComingSoon />
        </Container>
    );
};

const Container = styled.main`
    position: relative;
    top: 72px;
    display: block;
    min-height: calc(100vh - 75px);
    overflow-x: hidden;
    padding: 0 calc(3.5vw + 5px);

    &:after {
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        z-index: -1;
        inset: 0px;
        opacity: 1;
    }
`;

export default Home;