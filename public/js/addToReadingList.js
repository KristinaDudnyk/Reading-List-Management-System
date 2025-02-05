async function addToReadingList(index) {
    try {
      const userData = localStorage.getItem("user");

      let userId;

      if (userData) {
        let parsedUserData = JSON.parse(userData);
        userId = parsedUserData.id;
       
      } 

      let response = await fetch("/readinglist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          book_id: index,
          read_status: "not read",
          want_to_read: "yes",
        }),
      });

    } catch (error) {
      console.error("Error occurred during fetch:", error);
    }
  }