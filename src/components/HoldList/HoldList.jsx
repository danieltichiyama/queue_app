import React from 'react';
import styles from './HoldList.module.scss';
import Reservation from '../Reservation/Reservation.jsx';

const HoldList = (props) => {
    let {
        holdList,
        handleExpand,
        handleCollapse,
        handlePlusPartySize
    } = props;

    return (
        <ul className={styles.HoldList} id="holdList">
            <div className={styles.expand} onClick={handleExpand} id="expand" />
            <div className={styles.header}>
                <h3 id="onHoldH3">On Hold</h3>
                <div className={styles.collapseContainer}>
                    <div
                        className={styles.collapse}
                        onClick={handleCollapse}
                        id="collapse"
                    ></div>
                </div>
            </div>
            <div className={styles.listContainer}>
                {holdList.map((reservation, index) => {
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
                            isHold={true}
                            reservation={reservation}
                            color={color}
                            index={index}
                            key={index}
                            handlePlusPartySize={handlePlusPartySize}
                        ></Reservation>
                    )
                })}
            </div>
        </ul>
    )
}

export default HoldList;
