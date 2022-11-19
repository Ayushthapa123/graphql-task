import React from 'react'
import styles from './sass/user.module.scss'

export default function User(props: any) {
    return (
        <div className={styles.user}>
            <div><input type='checkbox' className='usercheckbox' name={props.user.name} checked={props.user.isChecked || false}
                onChange={(e) => props.handleSelect(e)} /></div>
            <div><span>{props.user.name}</span></div>
            <div><span>{props.user.username}</span></div>
            <div><span>{props.user.email}</span></div>
            <div><span>{props.user.phone}</span></div>
            <div><span>{props.user.website}</span></div>
            <div><span>{props.user.address.street}</span></div>
        </div>
    )
}
