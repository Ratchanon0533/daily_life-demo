// main.tsx
import Nav from './nav-bar';
import SearchSection from './search-section';
import Carousel from './carousel-section';
import University from './university-section';
import QuickSearchHome from './quick-search(Home)';
import PopularCareer from './career';


const Main = () => {
    return (
        <>
            <Nav />
            <SearchSection />
            <Carousel />
            <University />
            <QuickSearchHome />
            <PopularCareer />
            
        </>
    )
}

export default Main