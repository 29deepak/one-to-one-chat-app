// import React from 'react'
// import moment from 'moment';
// const Date = () => {
//     const data = [{ "updatedAt": "2023-12-18T09:12:37.000Z" }, { "updatedAt": "2023-12-12T09:23:39.000Z" }, { "updatedAt": "2023-12-18T09:23:44.000Z" }, { "updatedAt": "2023-12-18T10:28:10.000Z" }, { "updatedAt": "2023-12-18T10:28:28.000Z" }, { "updatedAt": "2023-12-18T10:32:13.000Z" }, { "updatedAt": "2023-12-18T10:32:17.000Z" }, { "updatedAt": "2023-12-18T10:35:30.000Z" }, { "updatedAt": "2023-12-18T10:35:37.000Z" }, { "updatedAt": "2023-12-18T13:51:29.000Z" }, { "updatedAt": "2023-12-18T13:51:59.000Z" }, { "updatedAt": "2023-12-18T16:05:54.000Z" }, { "updatedAt": "2023-12-18T16:07:30.000Z" }, { "updatedAt": "2023-12-18T16:08:00.000Z" }, { "updatedAt": "2023-12-18T16:08:56.000Z" }, { "updatedAt": "2023-12-18T16:09:14.000Z" }, { "updatedAt": "2023-12-18T16:09:54.000Z" }, { "updatedAt": "2023-12-18T16:10:12.000Z" }, { "updatedAt": "2023-12-18T16:11:19.000Z" }, { "updatedAt": "2023-12-18T16:13:08.000Z" }, { "updatedAt": "2023-12-18T16:13:58.000Z" }, { "updatedAt": "2023-12-18T16:39:31.000Z" }, { "updatedAt": "2023-12-18T16:39:37.000Z" }, { "updatedAt": "2023-12-18T16:40:02.000Z" }, { "updatedAt": "2023-12-18T16:40:28.000Z" }, { "updatedAt": "2023-12-18T16:45:01.000Z" }, { "updatedAt": "2023-12-18T16:45:43.000Z" }, { "updatedAt": "2023-12-19T06:06:32.000Z" }, { "updatedAt": "2023-12-19T06:08:56.000Z" }, { "updatedAt": "2023-12-19T06:09:26.000Z" }, { "updatedAt": "2023-12-19T06:09:54.000Z" }, { "updatedAt": "2023-12-19T06:10:15.000Z" }, { "updatedAt": "2023-12-19T06:10:42.000Z" }, { "updatedAt": "2023-12-19T06:11:27.000Z" }, { "updatedAt": "2023-12-19T06:12:48.000Z" }, { "updatedAt": "2023-12-19T06:13:49.000Z" }, { "updatedAt": "2023-12-19T06:14:01.000Z" }, { "updatedAt": "2023-12-19T06:22:07.000Z" }, { "updatedAt": "2023-12-19T06:22:17.000Z" }, { "updatedAt": "2023-12-19T06:22:33.000Z" }, { "updatedAt": "2023-12-19T06:22:56.000Z" }, { "updatedAt": "2023-12-19T06:23:04.000Z" }, { "updatedAt": "2023-12-19T17:58:10.000Z" }, { "updatedAt": "2023-12-19T18:08:24.000Z" }, { "updatedAt": "2023-12-19T18:08:36.000Z" }, { "updatedAt": "2023-12-19T18:09:24.000Z" }, { "updatedAt": "2023-12-19T18:09:31.000Z" }, { "updatedAt": "2023-12-20T06:41:59.000Z" }, { "updatedAt": "2023-12-20T06:42:04.000Z" }, { "updatedAt": "2023-12-20T06:42:22.000Z" }]
//     const formattedDates = data.map((item) => ({
//         ...item,
//         formattedDateTime: moment(item.updatedAt).calendar(null, {
//             sameDay: '[Today at] LT',
//             lastDay: '[Yesterday at] LT',
//             lastWeek: 'dddd [at] LT',
//             sameElse: 'MMMM D, YYYY [at] LT',
//         }),
//     }));
//     return (
//         <div style={{ color: "white" }}>
//             {formattedDates.map((item) => (
//                 <p key={item.id}>
//                     Formatted Date and Time: {item.formattedDateTime}
//                 </p>
//             ))}


//         </div>
//     )
// }

// export default Date

import React, { useEffect, useState } from 'react';
import moment from 'moment';

const YourChatComponent = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello!', createdAt: '2023-01-16T10:30:00Z' },
        { id: 2, text: 'How are you?', createdAt: '2023-01-16T15:45:00Z' },
        { id: 3, text: 'Good morning!', createdAt: '2023-01-17T08:00:00Z' },
        { id: 4, text: 'Good morning!', createdAt: '2023-01-17T08:00:00Z' },
        { id: 5, text: 'Good morning!', createdAt: '2023-12-20T08:00:00Z' },
        { id: 6, text: 'Good morning!', createdAt: '2023-01-19T08:00:00Z' },
        // Add more messages with different dates
    ]);

    const groupMessagesByDate = () => {
        const groupedMessages = {};
        messages.forEach((message) => {
            const dateKey = moment(message.createdAt).format('YYYY-MM-DD');
            if (!groupedMessages[dateKey]) {
                groupedMessages[dateKey] = [];
            }
            groupedMessages[dateKey].push(message);
        });
        return groupedMessages;
    };

    const renderGroupedMessages = () => {
        const groupedMessages = groupMessagesByDate();
        return Object.keys(groupedMessages).map((dateKey) => (
            <div key={dateKey}>
                <h2>{formatDateHeading(dateKey)}</h2>
                {groupedMessages[dateKey].map((message) => (
                    <p key={message.id}>{message.text}</p>
                ))}
            </div>
        ));
    };

    const formatDateHeading = (dateKey) => {
        const today = moment().format('YYYY-MM-DD');
        const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

        if (dateKey === today) {
            return 'Today';
        } else if (dateKey === yesterday) {
            return 'Yesterday';
        } else {
            return moment(dateKey).format('MMMM D, YYYY');
        }
    };

    return (
        <div>
            {renderGroupedMessages()}
        </div>
    );
};

export default YourChatComponent;