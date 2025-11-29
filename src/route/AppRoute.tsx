import { Routes, Route } from 'react-router-dom'
import Index from '../components/index'
import Reg from '../components/Register'
import QuickSerach from '../components/Quick_search'
import Promotion from '../components/Promotion'
import HOME from '../components/home'
import UN from '../components/University-information'

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/Register" element={<Reg />} />
            <Route path="/quick_search" element={<QuickSerach/>} />
            <Route path="/Promotion" element={<Promotion/>} />
            <Route path="/HOME" element={<HOME/>} />
            <Route path="/search" element={<UN />} />
        </Routes>
    )
}
export default AppRoute
