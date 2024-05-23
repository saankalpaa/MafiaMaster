import * as fs from "fs";
import * as path from "path";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

const getRoomPath = (filename) => {
  return path.join(path.resolve(), "rooms", filename);
};

async function getRoom(id) {
  try {
    const roomPath = getRoomPath(id);
    const roomContent = await fs.promises.readFile(roomPath, "utf8");

    return JSON.parse(roomContent);
  } catch (e) {
    return null;
  }
}

async function updateRoom(id, body) {
  try {
    const roomPath = getRoomPath(id);
    const oldData = await getRoom(id);

    const updatedData = {
      ...oldData,
      players: [...oldData.players, body.player],
    };

    const contents = JSON.stringify(updatedData, null, 4);

    return fs.promises.writeFile(roomPath, contents);
  } catch (e) {
    return null;
  }
}

async function deleteRoom(id) {
  try {
    const roomPath = getRoomPath(id);

    return fs.promises.unlink(roomPath);
  } catch (e) {
    return null;
  }
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).end("Id not provided.");
  }

  const requestMethod = req.method;

  switch (requestMethod) {
    case "GET": {
      const room = await getRoom(id);

      if (!room) return res.status(404).json({ message: `Room not found.` });

      res.json({ room });

      break;
    }

    case "PATCH": {
      const { body } = req;

      await updateRoom(id, body);

      res.json({ message: `Updated room of id "${id}"` });

      break;
    }

    case "DELETE": {
      await deleteRoom(id);
      res.json({ message: `Deleted room of id "${id}"` });
      break;
    }

    default:
      res.status(400).send("Method doesn't exists.");
  }
}
