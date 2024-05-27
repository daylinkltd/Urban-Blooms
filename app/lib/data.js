
// users

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const fetchUsers = async (q, page) => {
  const url = `${baseUrl}/api/users?q=${q}&page=${page}`;

  try {
      const res = await fetch(url, { cache: 'no-store' });

      if (!res.ok) {
          throw new Error("Failed to Fetch Users");
      }
      return res.json();
  } catch (err) {
      console.log("Error Loading Users: ", err);
      throw new Error("Failed to Fetch Users");
  }
};

export const fetchUser = async (id)=>{
  const url = `${baseUrl}/api/users/${id}`;

  try{
    const res = await fetch(url, {cache: 'no-store'});
    if(!res.ok) {
      throw new Error("Failed to fetch Users")
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}
