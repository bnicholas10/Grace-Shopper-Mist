const { client } = require(".");
const { createUser } = require("./users");
const { createGame } = require("./games");

async function dropTables() {
  console.log("Dropping All Tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables...");
  } catch (error) {
    console.log("Error while dropping tables...");
    console.log(error);
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false,
        "isActive" BOOLEAN DEFAULT true
      );
      
      CREATE TABLE games(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(5, 2) NOT NULL,
        publisher VARCHAR(255) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        rating VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL
      );

      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "gameId" INTEGER REFERENCES games(id),
        quantity INTEGER NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "gameId" INTEGER REFERENCES games(id),
        message VARCHAR(1000),
        rating INTEGER NOT NULL
      );

    `);
    console.log("Finished building tables...");
  } catch (error) {
    console.log("Error while creating tables...");
    throw error;
  }
}

//need to create/add createGame function
async function createInitialGames() {
  try {
    console.log("Starting to create games...");
    //list of FPS games
    await createGame({
      name: "Halo Infinite",
      price: "60",
      publisher: "Xbox Game Studios",
      description:
        "Halo Infinite is a 2021 first-person shooter game developed by 343 Industries and published by Xbox Game Studios. It is the sixth mainline entry in the Halo series, following Halo 5: Guardians.",
      rating: "7/10",
      category: "FPS",
    });

    await createGame({
      name: "Call of Duty: Modern Warfare II",
      price: "70",
      publisher: "Activision",
      description:
        "Call of Duty: Modern Warfare II is a 2022 first-person shooter game developed by Infinity Ward and published by Activision. It is a sequel to the 2019 reboot, and serves as the nineteenth installment in the overall Call of Duty series.",
      rating: "6/10",
      category: "FPS",
    });
    await createGame({
      name: "Arma 3",
      price: "30",
      publisher: "Bohemia Interactive",
      description:
        "Arma 3 is an open world realism-based military tactical shooter video game developed and published by Bohemia Interactive exclusively through the Steam distribution platform. It is the third main entry in the Arma series, and the eighth installment overall.",
      rating: "9/10",
      category: "FPS",
    });
    await createGame({
      name: "Counter-Strike: Source",
      price: "10",
      publisher: "Valve Corporation",
      description:
        "Counter-Strike: Source is a tactical first-person shooter video game developed by Valve and Turtle Rock Studios. Released in October 2004 for Windows, it is a remake of Counter-Strike using the Source game engine.",
      rating: "10/10",
      category: "FPS",
    });
    await createGame({
      name: "Borderlands 3",
      price: "60",
      publisher: "2k Games",
      description:
        "Borderlands 3 is an action role-playing first-person shooter video game developed by Gearbox Software and published by 2K. It is a sequel to 2012's Borderlands 2, and the fourth entry in the main Borderlands series.",
      rating: "9/10",
      category: "FPS",
    });
    //list of puzzle games
    await createGame({
      name: "Myst",
      price: "30",
      publisher: "Ubisoft",
      description:
        "Myst is a graphic adventure/puzzle video game designed by the Miller brothers, Robyn and Rand. It was developed by Cyan, Inc., published by Broderbund, and initially released for the Macintosh in 1993. In the game, the player's character travels via a special book to the island of Myst.",
      rating: "9/10",
      category: "puzzle",
    });
    await createGame({
      name: "Inscryption",
      price: "12",
      publisher: "Daniel Mullins Games",
      description:
        "Inscryption is a roguelike deck-building game developed by Daniel Mullins Games and published by Devolver Digital.",
      rating: "Devolver Digital",
      category: "puzzle",
    });
    await createGame({
      name: "Portal",
      price: "10",
      publisher: "Valve Corporation",
      description:
        "Portal is a series of first-person puzzle-platform video games developed by Valve.",
      rating: "10/10",
      category: "puzzle",
    });
    await createGame({
      name: "Professor Layton and the Curious Village",
      price: "35",
      publisher: "Level-5",
      description:
        "Professor Layton is a puzzle adventure video game series and transmedia franchise developed by Level-5.",
      rating: "9/10",
      category: "puzzle",
    });
    await createGame({
      name: "Stray",
      price: "30",
      publisher: "Annapurna",
      description:
        "Stray is a 2022 adventure game developed by BlueTwelve Studio and published by Annapurna Interactive. The story follows a stray cat who falls into a walled city populated by robots, machines, and mutant bacteria, and sets out to return to the surface with the help of a drone companion, B-12.",
      rating: "10/10",
      category: "puzzle",
    });

    //below is list of sim/builder games
    await createGame({
      name: "Stardew Valley",
      price: "15",
      publisher: "ConcernedApe",
      description:
        "Stardew Valley is a simulation role-playing video game developed by Eric 'ConcernedApe' Barone. Players take the role of a character who takes over their deceased grandfather's dilapidated farm in a place known as Stardew Valley.",
      rating: "10/10",
      category: "SIM/Builder",
    });
    await createGame({
      name: "Farming Simulator 22",
      price: "50",
      publisher: "GIANTS Software",
      description:
        "Farming Simulator is a farming simulation video game series developed by GIANTS Software. The locations are based on American and European environments. Players are able to farm, breed livestock, grow crops and sell assets created from farming.",
      rating: "9/10",
      category: "SIM/Builder",
    });
    await createGame({
      name: "Factorio",
      price: "30",
      publisher: "Wube Software",
      description:
        "Factorio is a construction and management simulation game developed by the Czech studio Wube Software.",
      rating: "10/10",
      category: "SIM/Builder",
    });
    await createGame({
      name: "Dyson Sphere Program",
      price: "20",
      publisher: "Gamera Game",
      description:
        "Dyson Sphere Program is a factory simulation game developed by Youthcat Studio released for Microsoft Windows in January 2021 in early access.",
      rating: "10/10",
      category: "SIM/Builder",
    });
    await createGame({
      name: "Cult of the Lamb",
      price: "25",
      publisher: "Devolver Digital",
      description:
        "Cult of the Lamb is a single-player construction and management simulation, rogue-like action-adventure game developed by indie developer Massive Monster and published by Devolver Digital.",
      rating: "9/10",
      category: "SIM/Builder",
    });

    //this is fighting games
    await createGame({
      name: "Nickelodeon All-Star Brawl",
      price: "50",
      publisher: "Ludosity",
      description:
        "Nickelodeon All-Star Brawl is a crossover fighting game developed by Swedish developer Ludosity and Costa Rican developer Fair Play Labs, and published by GameMill Entertainment. It is the first console game in the Nickelodeon Super Brawl series of browser games and mobile games.",
      rating: "7/10",
      category: "Fighting",
    });

    await createGame({
      name: "Tekken 7",
      price: "40",
      publisher: "Bandai Namco Entertainment",
      description:
        "Tekken 7 is a fighting game developed and published by Bandai Namco Entertainment. It is the seventh main and ninth overall installment in the Tekken series.",
      rating: "9/10",
      category: "Fighting",
    });
    await createGame({
      name: "Street Fighter V",
      price: "20",
      publisher: "Capcom",
      description:
        "Street Fighter V is a fighting game developed by Capcom and Dimps and published by Capcom for the PlayStation 4 and Microsoft Windows in 2016.",
      rating: "7/10",
      category: "Fighting",
    });
    await createGame({
      name: "MultiVersus",
      price: "1",
      publisher: "Player First Games",
      description:
        "MultiVersus is a free-to-play crossover fighting game developed by Player First Games and published by Warner Bros. Interactive Entertainment. The game features various characters within the Warner Bros. Discovery catalog, including those from Warner Bros., DC Comics, HBO, Turner Entertainment, and Cartoon Network.",
      rating: "9/10",
      category: "Fighting",
    });
    await createGame({
      name: "Mortal Kombat 11",
      price: "50",
      publisher: "NetherRealm Studios",
      description:
        "Mortal Kombat 11 is a 2019 fighting game developed by NetherRealm Studios and published by Warner Bros. Interactive Entertainment.",
      rating: "9/10",
      category: "Fighting",
    });

    //these are racing games
    await createGame({
      name: "Mario Kart 8",
      price: "50",
      publisher: "Nintendo",
      description:
        "Mario Kart 8 is a kart racing video game developed and published by Nintendo for the Wii U in May 2012. It retains Mario Kart series game mechanics, where players control Mario franchise characters in kart racing, collecting a variety of items to hinder opponents or gain advantages in the race.",
      rating: "9/10",
      category: "Racing",
    });
    await createGame({
      name: "Forza Horizon 5",
      price: "60",
      publisher: "Xbox Game Studios",
      description:
        "Forza Horizon 5 is a 2021 racing video game developed by Playground Games and published by Xbox Game Studios. It is the fifth Forza Horizon title and twelfth main instalment in the Forza series. The game is set in a fictionalised representation of Mexico.",
      rating: "9/10",
      category: "Racing",
    });
    await createGame({
      name: "F1 22",
      price: "60",
      publisher: "EA Sports",
      description:
        "F1 22 is a racing video game developed by Codemasters and published by EA Sports. It is the thirteenth entry in the F1 series by Codemasters. The game holds an official license of the 2022 Formula One and Formula 2 championships.",
      rating: "6/10",
      category: "Racing",
    });
    await createGame({
      name: "Chocobo GP",
      price: "50",
      publisher: "Square Enix",
      description:
        "Chocobo GP is a kart racing game developed by Arika and published by Square Enix. The game is a spin-off of the Final Fantasy series and is a sequel to 1999's Chocobo Racing.",
      rating: "8/10",
      category: "Racing",
    });
    await createGame({
      name: "Gran Turismo 7",
      price: "60",
      publisher: "Polyphony Digital",
      description:
        "Gran Turismo 7 is a 2022 sim racing video game developed by Polyphony Digital and published by Sony Interactive Entertainment. The game is the eighth mainline installment in the Gran Turismo series.",
      rating: "8/10",
      category: "Racing",
    });
    //these are RPG games
    await createGame({
      name: "The Witcher 3: Wild Hunt",
      price: "40",
      publisher: "CD Projekt",
      description:
        "The Witcher 3: Wild Hunt is a 2015 action role-playing game developed and published by CD Projekt. It is the sequel to the 2011 game The Witcher 2: Assassins of Kings and the third game in The Witcher video game series, played in an open world with a third-person perspective.",
      rating: "10/10",
      category: "RPG",
    });
    await createGame({
      name: "Cyberpunk 2077",
      price: "60",
      publisher: "CD Projekt",
      description:
        "Cyberpunk 2077 is an action role-playing video game developed by CD Projekt Red and published by CD Projekt. The story takes place in Night City, an open world set in the Cyberpunk universe.",
      rating: "7/10",
      category: "RPG",
    });
    await createGame({
      name: "The Elder Scrolls V: Skyrim",
      price: "40",
      publisher: "Bethesda Game Studios",
      description:
        "The Elder Scrolls V: Skyrim is an action role-playing video game developed by Bethesda Game Studios and published by Bethesda Softworks.",
      rating: "9/10",
      category: "RPG",
    });
    await createGame({
      name: "Fallout 4",
      price: "20",
      publisher: "Bethesda Game Studios",
      description:
        "Fallout 4 is a 2015 action role-playing game developed by Bethesda Game Studios and published by Bethesda Softworks.",
      rating: "9/10",
      category: "RPG",
    });
    await createGame({
      name: "Elden Ring",
      price: "60",
      publisher: "FromSoftware",
      description:
        "Elden Ring is a 2022 action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment.",
      rating: "9/10",
      category: "RPG",
    });
    //these are multiplayer games
    await createGame({
      name: "Fall Guys: Ultimate",
      price: "1",
      publisher: "Mediatonic",
      description:
        "Fall Guys is a free-to-play platform battle royale game developed by Mediatonic. The game involves up to 60 players who control jellybean-like creatures and compete against each other in a series of randomly selected mini-games, such as obstacle courses or tag.",
      rating: "9/10",
      category: "Multiplayer",
    });

    await createGame({
      name: "Mario Party Superstars",
      price: "55",
      publisher: "NDcube",
      description:
        "Mario Party Superstars is a 2021 party video game developed by NDcube and published by Nintendo for the Nintendo Switch. It is the twelfth home console installment in the Mario Party series, and the second for the Nintendo Switch following Super Mario Party.",
      rating: "9/10",
      category: "Multiplayer",
    });
    await createGame({
      name: "Heave Ho",
      price: "10",
      publisher: "Le Cartel Studio",
      description:
        "Heave Ho is a platform party video game developed by Le Cartel Studio and published by Devolver Digital. In Heave Ho, players must navigate their characters through a ravine across a series of increasingly complex levels in order to reach the end goal.",
      rating: "9/10",
      category: "Multiplayer",
    });
    await createGame({
      name: "Jackbox Party Pack 9",
      price: "30",
      publisher: "Jackbox Games Inc",
      description:
        "The Jackbox Party Pack 9 is a party pack in The Jackbox Party Pack franchise. Jackbox Games announced The Jackbox Party Pack 9 on February 11, 2022.",
      rating: "7/10",
      category: "Multiplayer",
    });
    await createGame({
      name: "Overcooked 2",
      price: "25",
      publisher: "Team17",
      description:
        "Overcooked 2 is a cooperative cooking simulation video game developed by Team17 alongside Ghost Town Games, and published by Team17.",
      rating: "9/10",
      category: "Multiplayer",
    });

    //these are action games
    await createGame({
      name: "Horizon Forbidden West",
      price: "70",
      publisher: "Guerrilla Games",
      description:
        "Horizon Forbidden West is a 2022 action role-playing game developed by Guerrilla Games and published by Sony Interactive Entertainment.",
      rating: "9/10",
      category: "Action",
    });
    await createGame({
      name: "Uncharted 4: A Thief's End",
      price: "35",
      publisher: "Sony Computer Entertainment",
      description:
        "Uncharted 4: A Thief's End is a 2016 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment. It is the fourth main entry in the Uncharted series.",
      rating: "9/10",
      category: "Action",
    });
    await createGame({
      name: "LEGO Star Wars: The Skywalker Saga",
      price: "50",
      publisher: "Warner Bros Interactive Entertainment",
      description:
        "Lego Star Wars: The Skywalker Saga is a 2022 Lego-themed action-adventure game developed by Traveller's Tales and published by Warner Bros. Interactive Entertainment.",
      rating: "9/10",
      category: "Action",
    });
    await createGame({
      name: "Teenage Mutant Ninja Turtles: The Cowabunga Collection",
      price: "40",
      publisher: "Konami",
      description:
        "Teenage Mutant Ninja Turtles: The Cowabunga Collection is a compilation of video games developed by Digital Eclipse and published by Konami. It features thirteen Teenage Mutant Ninja Turtles video games developed by Konami between 1989 and 1994.",
      rating: "9/10",
      category: "Action",
    });
    await createGame({
      name: "Mist: Coding Adventures",
      price: "60",
      publisher: "Full Stack Academy",
      description:
        "'Mist:Coding Adventures' is an action game following 4 junior web developers on their journey to conquer all things Javascript.",
      rating: "10/10",
      category: "Action",
    });
    console.log("Finished creating games!");
  } catch (error) {
    console.error("Error creating games!");
    throw error;
  }
}

const createInitialUsers = async () => {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        username: "BernieAdmin",
        password: "pass1234",
        name: "Bernie",
        isAdmin: true,
      },
      {
        username: "DianaAdmin",
        password: "pass1234",
        name: "Diana",
        isAdmin: true,
      },
      {
        username: "DevinAdmin",
        password: "pass1234",
        name: "Devin",
        isAdmin: true,
      },
      {
        username: "BrettAdmin",
        password: "pass1234",
        name: "Brett",
        isAdmin: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
};

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialGames();
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB...");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
