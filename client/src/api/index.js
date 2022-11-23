export const BASE_URL = "http://localhost:4000/api";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (name, email, username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
      }),
    });
    const result = await response.json();
    if (!result) {
      return {
        success: false,
        error: {
          name: "error",
          message: "something went wrong, please try again",
        },
      };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchGameById = async (gameId) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

//list of FPS games
// await createGame({
//   name: "Halo Infinite",
//   https://upload.wikimedia.org/wikipedia/en/1/14/Halo_Infinite.png

// await createGame({
//   name: "Call of Duty: Modern Warfare II",
//https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Call_of_Duty_Modern_Warfare_II_Key_Art.jpg/220px-Call_of_Duty_Modern_Warfare_II_Key_Art.jpg

// await createGame({
//   name: "Arma 3",
//  https://upload.wikimedia.org/wikipedia/ka/8/8e/ArmA_III.jpeg

// await createGame({
//   name: "Counter-Strike: Source",
//  https://upload.wikimedia.org/wikipedia/en/4/43/Counter-Strike_Source_%28box_art%29.jpg

// await createGame({
//   name: "Borderlands 3",
//   https://upload.wikimedia.org/wikipedia/en/2/21/Borderlands_3_cover_art.jpg

// //list of puzzle games
// await createGame({
//   name: "Myst",
// https://upload.wikimedia.org/wikipedia/en/6/6a/MystCover.png

// await createGame({
//   name: "Inscryption",
//  https://cdn1.epicgames.com/spt-assets/709ac59000cd4eb99c3397e7c35b68f1/inscryption-logo-1ajh1.png?h=270&resize=1&w=480

// await createGame({
//   name: "Portal",
//  https://upload.wikimedia.org/wikipedia/en/9/9f/Portal_standalonebox.jpg

// await createGame({
//   name: "Professor Layton and the Curious Village",
//   https://upload.wikimedia.org/wikipedia/en/1/1b/Professor_Layton_and_the_Curious_Village_NA_Boxart.JPG?20200513072024

// await createGame({
//   name: "Stray",
//   https://upload.wikimedia.org/wikipedia/en/f/f1/Stray_cover_art.jpg

// //below is list of sim/builder games
// await createGame({
//   name: "Stardew Valley",
//  https://lh3.googleusercontent.com/IRzV1qSynfxIIS3huwZuAc5V8Jbej8N2dvX-yuVcCeCbRfgMGOxOjO_KlJpVH9d8jQ1cOXdSp5cL__8KOdlMeVyh0Q

// await createGame({
//   name: "Farming Simulator 22",
//  https://cdn1.epicgames.com/salesEvent/salesEvent/725818d8-9768-4a6a-a723-3039aaee1e23_1200x1600-3b6116d3fc1b566b71251d04bce27938

// await createGame({
//   name: "Factorio",
//  https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg?t=1664264081

// await createGame({
//   name: "Dyson Sphere Program",
//   https://upload.wikimedia.org/wikipedia/en/0/07/Dyson_Sphere_Program_cover.jpg

// await createGame({
//   name: "Cult of the Lamb",
//   https://upload.wikimedia.org/wikipedia/fr/d/de/Cult_of_the_Lamb_Logo.png

// //this is fighting games
// await createGame({
//   name: "Nickelodeon All-Star Brawl",
//  https://static.wikia.nocookie.net/nickelodeon/images/5/58/Nickelodeon_All-Star_Brawl_for_Xbox_One.jpg/revision/latest?cb=20211108062204

// await createGame({
//   name: "Tekken 7",
//  https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Official_Tekken_7_Logo.jpg/220px-Official_Tekken_7_Logo.jpg

// await createGame({
//   name: "Street Fighter V",
//   https://upload.wikimedia.org/wikipedia/en/8/80/Street_Fighter_V_box_artwork.png

// await createGame({
//   name: "MultiVersus",
//  https://upload.wikimedia.org/wikipedia/en/1/1d/MultiVersus_Cover_Art.png

// await createGame({
//   name: "Mortal Kombat 11",
//   https://upload.wikimedia.org/wikipedia/en/7/7e/Mortal_Kombat_11_cover_art.png

// //these are racing games
// await createGame({
//   name: "Mario Kart 8",
//   https://m.media-amazon.com/images/I/51g8LljhiNL._AC_SY780_.jpg

// await createGame({
//   name: "Forza Horizon 5",
//  https://cdn.akamai.steamstatic.com/steam/apps/1551360/capsule_616x353.jpg?t=1668017884

// await createGame({
//   name: "F1 22",
//  https://upload.wikimedia.org/wikipedia/en/thumb/b/be/F1_22_cover_art.jpg/220px-F1_22_cover_art.jpg

// await createGame({
//   name: "Chocobo GP",
//   https://square.images.gamespress.com/Content/Artwork/NickNack/Square-Enix-Europe/artwork/2021/09/21094225-6a9b8654-8bac-4643-87e5-c74ff4ed986e/Choco_logo_English_1116.png?w=360&mode=max&otf=y&quality=80&format=png&bgcolor=transparent&ex=2022-12-01+03%3A00%3A00&sky=ae5543d1c73a3d5f5e39f956582fe3e0e79672c13518501bcacda33b38ed5b42

// await createGame({
//   name: "Gran Turismo 7",
//  https://upload.wikimedia.org/wikipedia/en/1/14/Gran_Turismo_7_cover_art.jpg

// //these are RPG games
// await createGame({
//   name: "The Witcher 3: Wild Hunt",
//  https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/EN_The-Witcher-3_Logo-Black_RGB.svg/1200px-EN_The-Witcher-3_Logo-Black_RGB.svg.png

// await createGame({
//   name: "Cyberpunk 2077",
//   https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/220px-Cyberpunk_2077_box_art.jpg

// await createGame({
//   name: "The Elder Scrolls V: Skyrim",
//  https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png

//   name: "Fallout 4",
//   https://upload.wikimedia.org/wikipedia/en/7/70/Fallout_4_cover_art.jpg

// await createGame({
//   name: "Elden Ring",
//   https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png

// //these are multiplayer games
// await createGame({
//   name: "Fall Guys: Ultimate",
//   https://upload.wikimedia.org/wikipedia/en/5/5e/Fall_Guys_cover.jpg

// await createGame({
//   name: "Mario Party Superstars",
//  https://upload.wikimedia.org/wikipedia/en/1/1a/Mario_Party_Superstars_cover_art.jpg

// await createGame({
//   name: "Heave Ho",
//   price: "10",
//  https://upload.wikimedia.org/wikipedia/en/2/29/HeaveHocover.jpg

// await createGame({
//   name: "Jackbox Party Pack 9",
//  https://cdn.cloudflare.steamstatic.com/steam/apps/1850960/header.jpg?t=1666294390

// await createGame({
//   name: "Overcooked 2",
// https://upload.wikimedia.org/wikipedia/en/0/03/Overcooked_2_cover_art.png

// //these are action games
// await createGame({
//   name: "Horizon Forbidden West",
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playstation.com%2Fen-us%2Fgames%2Fhorizon-forbidden-west%2F&psig=AOvVaw0dOWztJ5ZHsQkzWVVpz4_n&ust=1669251344857000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCICz-_6Lw_sCFQAAAAAdAAAAABAD

// await createGame({
//   name: "Uncharted 4: A Thief's End",
//   https://static.wikia.nocookie.net/whumpapedia/images/9/9d/Uncharted_4-_A_Thief%27s_End.jpg/revision/latest?cb=20211101174012

// await createGame({
//   name: "LEGO Star Wars: The Skywalker Saga",
//   https://static.wikia.nocookie.net/starwars/images/5/59/LEGO_Star_Wars_The_Skywalker_Saga_cover_art.png/revision/latest?cb=20211211202203

// await createGame({
//   name: "Teenage Mutant Ninja Turtles: The Cowabunga Collection",
//   https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nintendolife.com%2Freviews%2Fnintendo-switch%2Fteenage-mutant-ninja-turtles-the-cowabunga-collection&psig=AOvVaw1G1l3mbz9Ksd5aItZvla1n&ust=1669251446990000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOjjhK-Mw_sCFQAAAAAdAAAAABAD

// await createGame({
//   name: "Mist: Coding Adventures",
// https://s3.us-east-1.amazonaws.com/fsa2-assets/assets/Logos/fullstack-academy-logo-full-color-rgb.jpg
