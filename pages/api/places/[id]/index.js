// import { places } from "../../../../lib/db.js";
import useSWR from "swr";
import Place from "@/db/models/Places.js";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    return response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    console.log("hit the update part");
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);
    response.status(200).json({ status: "Place successfully updated" });
  }

  if (request.method === "DELETE") {
    console.log("about to delete");
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place Deleted" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

// const place = places.find((place) => place.id === id);
// if (!place) {
//   return response.status(404).json({ status: "Not found" });
// }
