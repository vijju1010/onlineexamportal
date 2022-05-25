import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Exams from './Components/Exams';

// const NavRoute = ({ exact, path, component: Component }) => (
//     <Route
//         exact={exact}
//         path={path}
//         render={(props) => (
//             <div>
//                 <Component {...props} />
//             </div>
//         )}
//     />
// );

function App() {
    return (
        <div>
            <Exams />
        </div>
    );
}

export default App;
