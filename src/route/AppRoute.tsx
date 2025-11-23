import { Routes, Route } from 'react-router-dom'
import Index from '../components/index'
import Reg from '../components/Register'
import QuickSerach from '../components/Quick_search'
import Promotion from '../components/Promotion'

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/Register" element={<Reg />} />
            <Route path="/quick_search" element={<QuickSerach/>} />
            <Route path="/Promotion" element={<Promotion/>} />
        </Routes>
    )
}
export default AppRoute
