import { onFailure } from "../../utils/notifications/OnFailure";

export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhOTE1MzJhYi1hOGM1LTRjYjEtYTY4Ni1mNWIyY2UyNzQwZmIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczNTY3NDk1NCwiZXhwIjoxODkzNDYyOTU0fQ.w7wqu6O-159LvHgftoxoo61ErC82VNVr_EjxpPACDVc";
export const createMeeting = async () => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      // Fetch the error message and pass it to onFailure
      const errorData = await res.json();
      const errorMessage = errorData?.message || "Failed to create meeting. Please try again later.";
      onFailure({ message: "Failed to generate meeting id.", error: errorMessage });
      throw new Error(errorMessage);
    }

    const { roomId } = await res.json();
    return roomId;

  } catch (error) {
    // Catch errors from fetch or other issues and pass them to onFailure
    //onFailure({ message: error.message || "Something went wrong", error: error.message });
    console.error(error); // Log the error for debugging
  }
};
