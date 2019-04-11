import React from 'react'
import styles from './Item.module.scss'
import filesize from 'filesize'
import Dotdotdot from 'react-dotdotdot'

const Item = ({
    item,
    removeItem
}: {
    item: {
        url: string
        found: boolean
        contentType: string
        contentLength: number
    }
    removeItem(): void
}) => (
    <li>
        <a href={item.url} className={styles.linkUrl} title={item.url}>
            <Dotdotdot clamp={1}>{item.url}</Dotdotdot>
        </a>
        <div className={styles.details}>
            <span>URL {item.found ? 'confirmed' : ' not confirmed'}</span>
            <span>
                {item.found && item.contentLength
                    ? filesize(item.contentLength)
                    : 'unknown size'}
            </span>
            <span>
                {item.found && item.contentType
                    ? item.contentType.split('/')[1]
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
