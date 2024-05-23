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

export default async function handler(req, res) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case "GET": {
      //
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
