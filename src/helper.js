import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./components/firebaseConfig";

export function generateUniqueId(length) {
  let result = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  const charactersLength = characters.length;

  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const createRoom = async (router) => {
  try {
    const id = generateUniqueId(6);
    const randomUserName = "USER_" + generateUniqueId(4);

    await setDoc(doc(db, "rooms", id), {
      admin: randomUserName,
      id: id,
      players: [],
    });

    localStorage.setItem("user", "admin");

    router.push(`/lobby/${id}`);
  } catch (e) {
    alert("Couldn't create the room, Sorry!");
    return;
  }
};

export const addPlayersInTheRoom = async (roomId) => {
  try {
    const currentData = (await getDoc(doc(db, "rooms", roomId))).data();
    const randomUserName = "USER_" + generateUniqueId(4);

    await updateDoc(doc(db, "rooms", roomId), {
      players: [...currentData.players, randomUserName],
    });

    localStorage.setItem("user", randomUserName);
  } catch (e) {
    return;
  }
};
