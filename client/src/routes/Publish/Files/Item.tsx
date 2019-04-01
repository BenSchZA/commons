import React from 'react'
import styles from './Item.module.scss'
import filesize from 'filesize'

const Item = ({ item, removeItem }: { item: any; removeItem: any }) => (
    <li>
        <a href={item.url} className={styles.linkUrl}>
            {item.url}
        </a>
        <div className={styles.details}>
            <span>URL {item.found ? 'confirmed' : ' not confirmed'}</span>
            <span>
                {item.found && item.size ? filesize(item.size) : 'unknown size'}
            </span>
            <span>
                {item.found && item.type
                    ? item.type.split('/')[1]
                    : 'unknown type'}
            </span>
        </div>
        <button
            type="button"
            className={styles.remove}
            title="Remove item"
            onClick={removeItem}
        >
            &times;
        </button>
    </li>
)

export default Item