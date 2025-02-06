async function addToReadingList(index) {
  try {
    const userData = localStorage.getItem("user");

    if (userData) {
      let parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;
    }

    const response = await fetch("/readinglist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        book_id: index,
        want_to_read: true,
      }),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error occurred during fetch:", error);
  }
}
