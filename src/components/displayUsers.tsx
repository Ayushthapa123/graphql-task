import React, { useState } from 'react';

import styles from './sass/displayusers.module.scss';

import { GoPlus } from 'react-icons/go'

import Titles from './Titles';
import User from './User';
import useFetchUsers from '../hooks/useFetchUsers';


export default function DisplayUsers() {

  const [filter, setFilter] = useState("");

  const endpoint = "https://graphqlzero.almansi.me/api";
  const { users, setUsers, isLoading, error } = useFetchUsers(endpoint)


  function handleSelect(e: any): void {
    const { name, checked } = e.target;

    if (name === "selectall") {
      let tempUser: Array<object> = users.map((user: any) => {
        console.log(user)
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser: Array<object> = users.map((user: any) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };



  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <pre>Oops...Error occured</pre>;

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
                  || user.address.street.toLowerCase().includes(filter.toLowerCase())
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
