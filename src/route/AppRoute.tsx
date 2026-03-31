import { Routes, Route } from 'react-router-dom'
import Index from '../components/index'
import Reg from '../components/Register'
import QuickSerach from '../components/Quick_search'
import About from '../components/About'
import HOME from '../components/home'
import UN from '../components/University-information'
import Faculty from '../components/UniversityInfo'
import Profile from '../components/Profile'
import Setting from '../components/Setting'
import Activities from '../components/activities'
import Activitiesinfo from '../components/activitiesinfo'
import Portfolio from '../components/portfolio'
import SelfDiscoveryQuiz from '../components/Quiz'
import Genport from '../components/genport'
import Organization from '../components/organization/Login'
import Dashboarduniversity from '../components/organization/dashboarduniversity'
import DashboardOrganizers from '../components/organization/dashboarduniversity'
import AddEvent from '../components/organization/Addevent'

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/Register" element={<Reg />} />
            <Route path="/quick_search" element={<QuickSerach/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/HOME" element={<HOME/>} />
            <Route path="/search" element={<UN />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/setting' element={<Setting/>}/>
            <Route path='/activities' element={<Activities/>}/>
            <Route path='/activities/:id' element={<Activitiesinfo/>}/>
            <Route path='/portfolio' element={<Portfolio/>}/>
            <Route path='/genport' element={<Genport/>}/>
            <Route path='/quiz' element={<SelfDiscoveryQuiz/>}/>
            <Route path='/organization' element={<Organization/>}/>
            <Route path='/dashboard-university' element={<Dashboarduniversity/>}/>
            <Route path="/dashboard-organizers" element={<DashboardOrganizers />} />
            <Route path="/add-event" element={<AddEvent />} />
        </Routes>
    )
}
export default AppRoute