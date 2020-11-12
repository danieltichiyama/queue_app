import React from 'react';
import styles from './WaitList.module.scss'
import clock from '../../utils/imgs/clock.png'
import Reservation from '../Reservation';

const WaitList = (props) => {
    let {
        retailerName,
        waitList,
        handlePlusPartySize,
    } = props;

    return (
        <ul className={styles.WaitList}>
            <div className={styles.header}>
                <h1>{retailerName}</h1>
                <div className={styles.time}>
                    <img src={clock} alt="average wait time" />
                    <h3>5 Min</h3>
                </div>
            </div>
            <div className={styles.listContainer}>
                {waitList.map((reservation, index) => {
                    let replyStatuses = {
                        confirmed: "#6d9773",
                        hold: "#ffba00",
                        cancelled: "#ff421f",
                    };
                    let color;
                    if (
                        reservation.replyStatus !== "pending" ||
                        reservation.replyStatus !== "entered"
                    ) {
                        color = replyStatuses[reservation.replyStatus];
                    }
                    return (
                        <Reservation
                            reservation={reservation}
                            color={color}
                            index={index}
                            key={index}
                            handlePlusPartySize={handlePlusPartySize}
                        />
                    )
                })}
            </div>
        </ul>
    );
};

export default WaitList;
