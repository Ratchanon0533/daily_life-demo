// main.tsx
import Nav from './nav-bar';
import SearchSection from './search-section';
import Carousel from './carousel-section';
import University from './university-section';
import QuickSearchHome from './quick-search(Home)';
import PopularCareer from './career';
import Applying from './applying';
import Banner from './banner';
import Suggestion from './suggestion';


const Main = () => {
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
        </>
    )
}

export default Main