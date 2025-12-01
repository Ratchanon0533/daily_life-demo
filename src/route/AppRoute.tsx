import { Routes, Route } from 'react-router-dom'
import Index from '../components/index'
import Reg from '../components/Register'
import QuickSerach from '../components/Quick_search'
import About from '../components/About'
import HOME from '../components/home'
import UN from '../components/University-information'
import Faculty from '../components/UniversityInfo'
import Profile from '../components/Profile'

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Reg />} />
            <Route path="/quick_search" element={<QuickSerach />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<HOME />} />
            <Route path="/search" element={<UN/>} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}
export default AppRoute
