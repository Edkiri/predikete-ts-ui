// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBell } from 'react-icons/fa';

// import { AppContext } from '../../../../App.context';

// import './Notification.css';
// import { useNotifications } from './use-notifications';

// export function Notifications() {
//   const [isToggled, setIsToggled] = useState(false);
//   const { notifications } = useNotifications();
//   console.log(notifications);
//   const navigate = useNavigate();

//   const handleLink = (notification) => {
//     setIsToggled(false);
//     navigate(`/${notification.type}/${notification.id}`, {
//       replace: true,
//       state: { group: notification.group },
//     });
//   };

//   return (
//     <>
//       <div className="NotificationsContainer">
//         <div className="BellContainer" onClick={() => setIsToggled(!isToggled)}>
//           <FaBell className="NotificationBell" />
//           {notificationsList.length > 0 && <div className="circle"></div>}
//         </div>
//         {isToggled && (
//           <div className="NotificationsList">
//             {notificationsList.map((notification) => (
//               <div
//                 key={`${notification.type}-${notification.id}`}
//                 onClick={() => handleLink(notification)}
//               >
//                 <div className="Notification">
//                   <p>
//                     <strong>{notification.issuedBy.username}</strong>{' '}
//                     {notification.title}{' '}
//                     <strong>{notification.group.name}</strong>
//                   </p>
//                   <small>{notification.message}</small>
//                 </div>
//               </div>
//             ))}
//             {notificationsList.length === 0 && (
//               <div className="Notification">
//                 <p>You don't have notifications...</p>
//               </div>
//             )}
//             <div className="TopTriangle"></div>
//           </div>
//         )}
//       </div>
//       {isToggled && (
//         <div className="DarkLayout" onClick={() => setIsToggled(false)}></div>
//       )}
//     </>
//   );
// }
