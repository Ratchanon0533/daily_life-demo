// main.tsx
import Nav from './nav-bar(login)';
import SearchSection from './search-section';
import Carousel from './carousel-section';
import University from './university-section';
import QuickSearchHome from './quick-search(Home)';
import PopularCareer from './career';
import Applying from './applying';

const Home = () => {
    return (
        <>
            <Nav />
            <SearchSection />
            <Carousel />
            <University />
            <QuickSearchHome />
            <PopularCareer />
            <Applying />
            หน้าแรกหลังจากloginสำเร็จ

        </>
    )
}

export default Home