// import { places } from "../../../../lib/db.js";
import useSWR from "swr";
import Place from "@/db/models/Places.js";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    return response.status(200).json(place);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

// const place = places.find((place) => place.id === id);
// if (!place) {
//   return response.status(404).json({ status: "Not found" });
// }
