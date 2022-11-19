import React, { useState } from 'react';
import axios from "axios";
import { useQuery } from "react-query";


const endpoint = "https://graphqlzero.almansi.me/api";
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


export default function useFetchUsers() {

  const [users, setUsers] = useState([]);

  const { data, isLoading, error } = useQuery("launches", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: USERS_QUERY
      }
    });
    setUsers(response.data.data.users.data);
    return response.data.data;
  });

  // if (isLoading) return <h2>Loading...</h2>;
  // if (error) return <pre>Error occured</pre>;

  return { users, setUsers, isLoading, error, data };

}
