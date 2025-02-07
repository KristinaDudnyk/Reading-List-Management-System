async function addToReadingList(book_id) {
  try {
    const userData = localStorage.getItem("user");
    const parsedUserData = JSON.parse(userData);
    const user_id = parsedUserData.id;

    const response = await fetch("/readinglist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        book_id: book_id,
        want_to_read: true,
      }),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error occurred during fetch:", error);
  }
}
