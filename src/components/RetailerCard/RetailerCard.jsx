import React from 'react';
import styles from './RetailerCard.module.scss';

function RetailerCard(props) {
    let {
        index,
        store
    } = props;


    return (
        <li className={styles.result} key={"retailers-" + index}>
            <div className={styles.storePic}></div>
            <div className={styles.generalInfo}>
                <h3>{store.retailerName}</h3>
                <p>{`Opens: ${store.open} ~ Close: ${store.close}`}</p>
                <p>
                    {`${store.address}`}
                    <br />
                    {`${store.city}, ${store.state} ${store.zipcode}`}
                </p>
                <a href={`tel:${store.phoneNumber}`}>{store.phoneNumber}</a>
            </div>

            <div className={styles.counter}>
                <p>Waiting:</p>
                <p className={styles.count}>{store.currentCapacity}</p>
            </div>
        </li>
    )
}

export default RetailerCard;