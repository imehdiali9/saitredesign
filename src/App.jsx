import { Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import People from './pages/People';
import Events from './pages/Events';
import Placements from './pages/Placements';
import Alumni from './pages/Alumni';
import Achievements from './pages/Achievements';
import Activity from './pages/Activity';
import Notices from './pages/Notices';
export default function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/people" element={<People/>}/><Route path="/events" element={<Events/>}/><Route path="/placements" element={<Placements/>}/><Route path="/alumni" element={<Alumni/>}/><Route path="/achievements" element={<Achievements/>}/><Route path="/activity" element={<Activity/>}/><Route path="/notices" element={<Notices/>}/></Routes></Layout>}
