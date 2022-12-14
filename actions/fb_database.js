import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref, onValue, update } from "firebase/database";
import { authFirebase, database } from "../config/firebase";
import { retrieveAllGames } from "./games";

const db = database;


export const registerUser = async (id_player, name, username, email) => {
  const dbRef = ref(db, `game_user/${id_player}`);
  console.log ('dbRef', dbRef)
  const data = {
    id_player,
    name,
    username,
    email, //isinya email
    total_score: 0,
    city: "",
    social_media: "",
    profile_picture:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e1fd5442419075.57cc3f77ed8c7.png",
    total_game: 0,
    player_rank: 0,
    playedGame:[]
  };
  await set(dbRef, data);
};


// get all user
export const retrieveAllUser = () => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, "game_user");
    onValue(dbRef, (snapshot) => {
      const value = [];
      // Ubah Object ke Array of Object
      Object.keys(snapshot.val()).map((key) => {
        value.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      resolve(value);
    });
  });
};

// get game score
export const retrieveAllScore = () => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, "game_score");
    onValue(dbRef, (snapshot) => {
      const value = [];
      // Ubah Object ke Array of Object
      Object.keys(snapshot.val()).map((key) => {
        value.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      resolve(value);
    });
  });
};

//read one biodata
export const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, `game_user/${id}`);
    onValue(dbRef, (data) => {
      const value = [];
      value.push({
        id: id,
        data: data.val(),
      });
      resolve(value);
    });
  });
};

//edit profile
export const updateProfile = (
  id,
  name,
  username,
  city,
  social_media,
  profile_picture
) => {
  const dbRef = ref(db, `game_user/${id}`);
  const data = {
    name,
    username,
    city,
    social_media,
    profile_picture,
  };
  update(dbRef, data);
  console.log("update done");
};

//update score
export const updateScore = (id, total_score) => {
  const dbRef = ref(db, `game_user/${id}`);
  const data = {
    total_score,
  };
  update(dbRef, data);
};

//update total game
export const updateTotalGame = (id, total_game) => {
  const dbRef = ref(db, `game_user/${id}`);
  const data = {
    total_game,
  };
  update(dbRef, data);
};

//Update played game
export const updatePlayedGame = (id, playedGame) => {
  const dbRef = ref(db, `game_user/${id}`);
  const data = {
    playedGame,
  };
  update(dbRef, data);
};

//update player rank
export const updatePlayerRank = (id, player_rank) => {
  const dbRef = ref(db, `game_user/${id}`);
  const data = {
    player_rank,
  };
  update(dbRef, data);
};

//update profile photo
export const updateProfileImg = (id, profile_picture) => {
  const dbRef = ref(db, `game_user/${id}`);
  const data = {
    profile_picture,
  };
  update(dbRef, data);
};
//get game info
export const getGameInfoById = (id) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, `game_info/${id}`);
    onValue(dbRef, (data) => {
      const value = data.val();
      resolve(value);
    });
  });
};
//total point
export const totalPointByUser = async (id) => {
  let store = [];
  let point = 0;
  const scoreAll = await retrieveAllScore();
  scoreAll.forEach((e) => {
    if (e.data.id_player == id) {
      store.push(e);
    }
  });
  store.forEach((e) => {
    point = point + e.data.score;
  });
  const id_generate = await getUserById(id);
  await updateScore(id_generate[0].id, point);

  return point;
};
//game history
export const historyByUser = async (id) => {
  let store = [];
  const scoreAll = await retrieveAllScore();
  scoreAll.forEach((e) => {
    if (e.data.id_player == id) {
      store.push(e);
    }
  });

  return store;
};
//leaderboard pergame
export const leaderBoardByGame = async (id) => {
  let temp = [];
  let result = [];

  const scoreAll = await retrieveAllScore();
  scoreAll.forEach((e) => {
    if (e.data.game_id == id) {
      temp.push(e);
    }
  });

  temp.reduce(function (res, value) {
    if (!res[value.data.id_player]) {
      res[value.data.id_player] = { id_player: value.data.id_player, score: 0 };
      result.push(res[value.data.id_player]);
    }
    res[value.data.id_player].score += value.data.score;
    return res;
  }, {});
  // const sorted = Object.keys(resultan).sort(function(a,b){return resultan[a]-resultan(b)})
  let tempSort = result.sort((a, b) => {
    return b.score - a.score;
  });

  return tempSort;
};
//jumlah user yang bermain pergame
export const countPlayerByGame = async (id) => {
  let counter = 0;
  let player = [];
  let game_player = [];
  const scoreAll = await retrieveAllScore();
  scoreAll.forEach((e) => {
    if (e.data.game_id == id) {
      player.push(e);
    }
  });
  player.forEach((e) => {
    if (game_player.includes(e.data.id_player) === false) {
      game_player.push(e.data.id_player);
      counter = counter + 1;
    }
  });
  return counter;
};
// player rank
export const playerRank = async (id) => {
  let result = [];
  const scoreAll = await retrieveAllScore();
  scoreAll.reduce(function (res, value) {
    if (!res[value.data.id_player]) {
      res[value.data.id_player] = { id_player: value.data.id_player, score: 0 };
      result.push(res[value.data.id_player]);
    }
    res[value.data.id_player].score += value.data.score;
    return res;
  }, {});
  let tempSort = result.sort((a, b) => {
    return b.score - a.score;
  });
  const rank = tempSort.findIndex((x) => x.id_player === id);
  updatePlayerRank(id, rank + 1);
  return rank + 1;
};
// total game per user
export const totalGameByUser = async (id) => {
  let game_list = [];
  let temp = [];
  const scoreAll = await retrieveAllScore();
  scoreAll.forEach((e) => {
    if (e.data.id_player == id) {
      temp.push(e);
    }
  });
  temp.forEach((e) => {
    if (game_list.includes(e.data.game_id) === false) {
      game_list.push(e.data.game_id);
    }
  });
  updateTotalGame(id, game_list.length);
  return game_list.length;
};

// played game

export const playedGame = async(id) =>{
  let game_list = [];
  let temp = [];
  const scoreAll = await retrieveAllScore();
  scoreAll.forEach((e) => {
    if (e.data.id_player == id) {
      temp.push(e);
    }
  });
  temp.forEach((e) => {
    if (game_list.includes(e.data.game_id) === false) {
      game_list.push(e.data.game_id);
    }
  });
  updatePlayedGame(id, game_list);
}
