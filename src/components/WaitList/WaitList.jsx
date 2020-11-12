import React from 'react';
import styles from './WaitList.module.scss'
import clock from '../../utils/imgs/clock.png'
import Reservation from '../Reservation';
import { actionUpdateReservation } from '../../actions';
import { connect } from "react-redux";

const WaitList = (props) => {
    let {
        retailerName,
        waitList,
        holdList,
        handlePlusPartySize,
    } = props;

    const clearReservations = () => {
        let waitLength = waitList.length;
        let holdLength = holdList.length;

        if (waitLength === 0 && holdLength === 0) {
            return alert('No reservations to cancel.');
        }
        if (waitLength !== 0) {
            waitList.forEach((res) => {
                let data = { queueStatus: 'cancelled' }
                props.dispatchUpdateReservation(data, res.id);
            });
            alert(`Wait list cleared ${waitLength} reservations.`)
        };
        if (holdLength !== 0) {
            holdList.forEach((res) => {
                let data = { queueStatus: 'cancelled' }
                props.dispatchUpdateReservation(data, res.id);
            })
            alert(`Hold list cleared ${holdLength} reservations.`)
        }
        return
    };

    return (
        <ul className={styles.WaitList}>
            <div className={styles.header}>
                <h1>{retailerName}</h1>
                <div className={styles.time}>
                    <img src={clock} alt="average wait time" />
                    <h3>5 Min</h3>
                </div>
                <button
                    type="button"
                    onClick={clearReservations}
                >
                    Clear
                </button>
            </div>
            <div className={styles.listContainer}>
                {waitList.length === 0 ? "No Reservations..." : null}
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpdateReservation: (data, id) => {
            return dispatch(actionUpdateReservation(data, id))
        }
    }
};

export default connect(null, mapDispatchToProps)(WaitList);
