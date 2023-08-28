// 
// import { Routes, Route, useNavigate } from "react-router-dom";
// import "./App.css";
// 
// 
// 
// import {
//   Dashboard,
//   Home,
//   Loader,
//   Login,
//   MusicPlayer,
//   UserProfile,
// } from "./components";
// 
// 
// 

// function App() {
//   const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
//     useStateValue();
//   const [isLoading, setIsLoading] = useState(false);

//   

 

//   useEffect(() => {
//     if (!allSongs && user) {
//       getAllSongs().then((data) => {
//         dispatch({
//           type: actionType.SET_ALL_SONGS,
//           allSongs: data.data,
//         });
//       });
//     }
//   }, []);

//   return (
//     <AnimatePresence>
//       <div className="h-auto flex items-center justify-center min-w-[680px]">
//         {isLoading ||
//           (!user && (
//             <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
//               <Loader />
//             </div>
//           ))}
//         <Routes>
//           <Route path="/login" element={<Login setAuth={setAuth} />} />
//           <Route path="/*" element={<Home />} />
//           
//           <Route path="/userProfile" element={<UserProfile />} />
//         </Routes>

//         {isSongPlaying && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
//           >
//             <MusicPlayer />
//           </motion.div>
//         )}
//       </div>
//     </AnimatePresence>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Login, Dashboard } from './components';
import { app } from "./config/firebase.config";
import { getAuth,GoogleAuthProvider,inMemoryPersistence,signInWithPopup,} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const  App= () => {
  const firebaseAuth=getAuth(app);
  const navigate=useNavigate();

  const [{ user}, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
      false || window.localStorage.getItem("auth") === "true"
       );

       useEffect(() => {
        // setIsLoading(true);
        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              console.log(token);
        //       window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                })
        // console.log(data);
                });
            });
        //     setIsLoading(false);
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            // setIsLoading(false);
            // window.localStorage.setItem("auth", "false");
            navigate("/login");
          }
        });
      }, []);

  return (
    <AnimatePresence mode="wait">
    <div className='h-auto min-w-[680px] bg-primary flex justify-center items-center'>
    <Routes>
    <Route path="/login" element={<Login  setAuth={setAuth}/>} />
    <Route path="/*" element={<Home />} />
    <Route path="/dashboard/*" element={<Dashboard />} />
</Routes>
</div>
</AnimatePresence>
  )
}

export default App