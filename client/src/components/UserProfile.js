import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./css/UserProfile.css";

const UserProfile = () => {
  return (
    <div id="userProfile">
      <h1>Profile Test</h1>
    </div>
  );
};
// export const BASE_URL = "localhost:3000";

// //import "./css/UserProfile.css"; //need to create

// //finds user token specific
// export const getMe = async (token) => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/users`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// //setting state to check what posts belong to the said token
// const UserProfile = ({
//   token,
//   setToken,
//   isLoggedIn,
//   currentUser,
//   username,
// }) => {
//   const [myGames, setMyGames] = useState([]);

//   useEffect(() => {
//     const getMyProfile = async () => {
//       const userObject = await getMe(JSON.parse(localStorage.token));
//       setMyGames(userObject.data.posts);
//     };

//     getMyProfile();
//     console.log("isLoggedin:", isLoggedIn);
//   }, [isLoggedIn, setMyGames]);

//   return (
//     <div>
//       {!isLoggedIn ? (
//         <Navigate to="/login/" />
//       ) : (
//         <div>
//           <h1 id="welcome">Welcome, {username}</h1>

//           <section>
//             <h1 id="games-title">My Games</h1>
//             {myGames.length === 0 ? (
//               <h3>You Don't Have Any Games</h3>
//             ) : (
//               myGames.map((mygame, idx) => {
//                 return (
//                   <section
//                     key={idx}
//                     id={mygame.active ? "active-game" : "deleted-game"}
//                   >
//                     <span id="game-id">id:{mygame._id}</span>
//                     <br></br>
//                     <span>Game: </span>
//                     <span>{mygame.title}</span>
//                     <br></br>
//                     <span>Price: </span>
//                     <span>{mygame.price}</span>
//                     <br></br>
//                     <span>Status in Cart: </span>
//                     <span>
//                       {mygame.active ? "Active" : <em>"No Longer Active"</em>}
//                     </span>
//                     <br></br>
//                     <span>Publisher: </span>
//                     <span>{mygame.publisher}</span>
//                     <br></br>
//                   </section>
//                 );
//               })
//             )}
//           </section>
//         </div>
//       )}
//     </div>
//   );
// };

// // const UserProfile = () => {
// //   const [user, setUser] = useState({});
// //   const token = localStorage.getItem("token");

// //   // const fetchUserProfile = async () => {
// //   //   const profile = await getUser(user);
// //   //   console.log("current user profile:", profile);
// //   //   setUser(profile);
// //   // };

// //   useEffect(() => {
// //     // fetchUserProfile();
// //   }, []);
// //   return (
// //     <>
// //       <div>{token ? MyGames() : "Please Log In to See Your User Profile"}</div>
// //       <div id="home">
// //         <p id="homeMessage">Mist: Your One Stop Shop For All Things Games</p>
// //         <div id="homeNavBar">
// //           <Link to={"/login"}>Log In</Link>
// //           <Link to={"/games"} id="homeGamesButton">
// //             Games
// //           </Link>
// //           <Link to={"/register"}>Register</Link>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

export default UserProfile;
