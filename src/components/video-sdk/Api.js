import { onFailure } from "../../utils/notifications/OnFailure";

export const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MzQ2ZmY0NS1kOTMzLTRiMjktYWY1Ny0xOGNmMmQwM2M1NDMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNTg5MjY3MiwiZXhwIjoxNzMzNjY4NjcyfQ.izmn9n9lhSHNls1jXyNAhrOw-o0o70D5oRVbndDLyUc'; // Start with an initial token

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
