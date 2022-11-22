import React, { useState } from 'react';
import axios from "axios";
import { useQuery } from "react-query";



const USERS_QUERY = `
  {
   users {
    data {
        id
        name
        username
        email
        address {
            street
        }
        phone
        website
    }
   }
  }
`;


export default function useFetchUsers(url: string) {

  const [users, setUsers] = useState([]);

  const { isLoading, error } = useQuery("users", async () => {
    const response = await axios({
      url: url,
      method: "POST",
      data: {
        query: USERS_QUERY
      }
    });
    setUsers(response.data.data.users.data);
    return response.data.data;
  });

  return { users, setUsers, isLoading, error };

}
