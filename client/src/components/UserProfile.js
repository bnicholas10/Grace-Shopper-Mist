import React, { useEffect, useState } from "react";
import MyGames from "./MyGames";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  // const fetchUserProfile = async () => {
  //   const profile = await getUser(user);
  //   console.log("current user profile:", profile);
  //   setUser(profile);
  // };

  useEffect(() => {
    // fetchUserProfile();
  }, []);
  return <div>{token ? MyGames() : "Please Log In to See Your Cart"}</div>;
};

export default UserProfile;
