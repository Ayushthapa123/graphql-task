import React, { useEffect, useState } from 'react'
import styles from './sass/titles.module.scss'

export default function Titles(props: any) {

    return (
        <div className={styles.titles}>
            <div><input type='checkbox' name="selectall" onChange={(e) => props.handleSelect(e)}
                checked={!props.users.some((user: any) => user.isChecked !== true)}
            /></div>
            <div><span>Name</span></div>
            <div><span>Username</span></div>
            <div><span>Email</span></div>
            <div><span>Phone</span></div>
            <div><span>Website</span></div>
            <div><span>Address</span></div>
        </div>
    )
}
