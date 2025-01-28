import * as SecureStore from "expo-secure-store";
import {
  allChaptersEndpoint,
  allSkillsEndpoint,
  createGameByLessonId,
  createLessonEndpoint,
  createScenarioEndpoint,
  loginEndpoint,
  updateCurrentChapterEndpoint,
  validateChapterEndpoint,
  getImageEndpoint,
  correctionEndpoint
} from "./endpoints";

import { getTextOfJSDocComment } from "typescript";

/**
 *
 * @param {the email of the user} email
 * @param {the password of the user} password
 * @returns a token
 */
export const signin = async (email, password) => {
  let token = ""
  await fetch(loginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mail: email,
      password: password
    })
  })
  .then((response) => response.json())
  .then((data) => {
    token = data["jwt"]
  })
  .catch((error) => {
    console.log(email)
    console
    console.error(error)
  })

  return token
};

export const getAuthToken = async () => {
  return await SecureStore.getItemAsync("authToken");
}

export const getCompetences = async () => {
  try {
    let token = await getAuthToken();

    if (!token)
      throw Error("the user token could not be found (getCompetences)");

    let response = await fetch(allSkillsEndpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (response.status == 400) {
      await SecureStore.deleteItemAsync('authToken')
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getChapters = async (id) => {
  try {
    let token = await getAuthToken();
    if (!token) throw Error("the token could not be found (getChapters)");

    let response = await fetch(allChaptersEndpoint(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const validateChapter = async (id) => {
  try {
    let token = await getAuthToken();
    let response = await fetch(validateChapterEndpoint(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (response.status == 3002) return true;
  } catch (error) {
    console.error(error);
  }
};

export const setCurrentChapter = async (id) => {
  try {
    let token = await getAuthToken();
    let response = await fetch(updateCurrentChapterEndpoint(id), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
    });
    if (response.status === 3003) return true;
  } catch (error) {
    console.error(error);
  }
};


export const getLoessons = async (chapterId) => {
  try {
    let token = await getAuthToken()
    console.log("lesson token", token)
    let response = await fetch(createLessonEndpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(chapterId)
    })

    let data = await response.json()
    console.log("\n\nthe lessons are \n"+data)
    return data
  } catch(error) {
    console.error(error)
  }
}

export const getGames = async (lessonId) => {
  try {
    let token = await getAuthToken()
    console.log("token ", token)
    console.log("lesonId ", lessonId)
    let response = await fetch(createGameByLessonId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(1)
    })

  

    let data = await response.json()
    console.log("\n\n\nThe games are:\n"+data);
    return data
  } catch(error) {
    console.error(error)
  }
}

export const fetchImage = async (path) => {
  console.log("image path", path)
  const token = await getAuthToken()
  if (!token) throw Error("token not found")

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `${token}`)

  try {
    let response = await fetch(getImageEndpoint, {
      method: "POST",
      headers: headers,
      body: path
    })

    const data = await response.blob()
    console.log(path)
    return data

  } catch(error) {
    console.log(error)
  }
}

export const getCorrection = async (gameId, answer) => {
  try {
    let token = await getAuthToken()
    console.log("game id ", gameId)
    let response = await fetch(correctionEndpoint(gameId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
        "GameId": `${gameId}`
      },
      body: JSON.stringify({
        useresponse: answer
      })
    })

    let data = await response.json()
    console.log("correction is ", data)
    return data
  } catch(error) {
    console.error(error)
  }
}