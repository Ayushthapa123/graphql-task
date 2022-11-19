import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useQuery } from "react-query";

import styles from './sass/displayusers.module.scss';

import { GoPlus } from 'react-icons/go'

import Titles from './Titles';
import User from './User';


const endpoint: string = "https://graphqlzero.almansi.me/api";
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


export default function DisplayUsers() {


  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  const { data, isLoading, error } = useQuery("users", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: USERS_QUERY
      }
    });

    setUsers(response.data.data.users.data)
    // return response.data.data;
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <pre>Oops...Error occured</pre>;


  function handleSelect(e: any): void {
    console.log(e.target)

    const { name, checked } = e.target;

    if (name === "selectall") {

      let tempUser: any = users.map((user: any) => {
        return { ...user, isChecked: checked };
      });

      setUsers(tempUser);
    }

    else {

      let tempUser: any = users.map((user: any) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };



  return (
    <div className={styles.displayusers}>
      <div className={styles.header}>
        <b>Users</b><input type='text' placeholder='Filter Users' value={filter} onChange={(e) => setFilter(e.target.value.toLocaleLowerCase())} /> <button><span><GoPlus /></span>New User</button>
      </div>
      <div className={styles.userlist}>
        <Titles handleSelect={handleSelect} users={users} />

        {users &&
          <div>
            {users?.
              filter((user: any, index: number) => {
                if (filter == "") {
                  return user
                } else if (
                  user.name.toLowerCase().includes(filter.toLowerCase())
                  || user.username.toLowerCase().includes(filter.toLowerCase())
                  || user.phone.toLowerCase().includes(filter.toLowerCase())
                  || user.website.toLowerCase().includes(filter.toLowerCase())
                  || user.email.toLowerCase().includes(filter.toLowerCase())) {

                  return user
                }
              })
              .map((user: any) => (
                <div key={user.id}>

                  <User
                    handleSelect={handleSelect}
                    user={user}
                  />
                </div>
              ))}
          </div>
        }



      </div>
    </div>
  )
}
