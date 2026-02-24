// main.tsx
import Nav from './nav-bar(login)';
import SearchSection from './HomeSection/search-section';
import Carousel from './HomeSection/carousel-section';
import University from './HomeSection/university-section';
import QuickSearchHome from './HomeSection/quick-search(Home)';
import PopularCareer from './HomeSection/career';
import Applying from './HomeSection/applying';
import Banner from './HomeSection/banner';
import Suggestion from './HomeSection/suggestion';
import Partner from './HomeSection/partner';
import Contact from './HomeSection/contact';

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
            <Banner />
            <Suggestion />
            <Partner />
            <Contact />

        </>
    )
}

export default Home