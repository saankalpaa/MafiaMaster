import { generateUniqueId } from "@/helper";
import * as fs from "fs";
import * as path from "path";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

const getRoomsPath = (filename) => {
  return path.join(path.resolve(), "rooms", filename);
};

async function createRoom(body) {
  try {
    const id = generateUniqueId(6);
    const roomPath = getRoomsPath(id);
    const contents = JSON.stringify({ ...body, id }, null, 4);

    await fs.promises.writeFile(roomPath, contents);

    return id;
  } catch (e) {
    return null;
  }
}

// async function getChallenges() {
//   try {
//     const challengePath = getChallengePath("");
//     let fileNames = await fs.promises.readdir(challengePath);

//     if (fileNames.includes(".DS_Store")) {
//       fileNames = fileNames.filter(
//         (fileName: string) => fileName !== ".DS_Store"
//       );
//     }

//     const filesContents = await Promise.all(
//       fileNames.map(async (fileName: string) => {
//         const fileContent = await fs.promises.readFile(
//           getChallengePath(fileName),
//           "utf8"
//         );

//         return { id: fileName, contents: JSON.parse(fileContent) };
//       })
//     );

//     return filesContents;
//   } catch (e) {
//     return null;
//   }
// }

export default async function handler(req, res) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case "GET": {
      //   const challenges = await getChallenges();
      //   if (!challenges) {
      //     res.status(200).json({ message: "No challenges has been created." });
      //     return;
      //   }

      //   res.json({ data: challenges });
      break;
    }

    case "POST": {
      const { body } = req;
      const newRoomId = await createRoom(body);

      if (!newRoomId) {
        res.status(400).json({ message: "Room Creation Failed." });
      }

      res.json({
        message: `Room Created ID: ${newRoomId}`,
        id: newRoomId,
      });

      break;
    }

    default:
      res.status(400).json({ message: "Method doesn't exists." });
  }
}
