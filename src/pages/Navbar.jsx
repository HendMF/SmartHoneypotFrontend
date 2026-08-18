// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./ .css";

// function  ({ onMenuClick }) {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const userMenuRef = useRef(null);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       const userMenuElement =
//         userMenuRef.current;

//       if (!userMenuElement) {
//         return;
//       }

//       if (
//         !userMenuElement.contains(
//           event.target
//         )
//       ) {
//         setShowUserMenu(false);
//       }
//     };

//     document.addEventListener(
//       "pointerdown",
//       handleOutsideClick,
//       true
//     );

//     return () => {
//       document.removeEventListener(
//         "pointerdown",
//         handleOutsideClick,
//         true
//       );
//     };
//   }, []);

//   const handleLogout = async () => {
//     if (isLoggingOut) {
//       return;
//     }

//     setIsLoggingOut(true);

//     try {
//       await logout();

//       navigate("/login", {
//         replace: true,
//       });
//     } finally {
//       setIsLoggingOut(false);
//       setShowUserMenu(false);
//     }
//   };

//   const handleUserButtonClick = () => {
//     setShowUserMenu(
//       (current) => !current
//     );
//   };

//   return (
//     <header className=" ">
//       <div className=" -left">
//         <button
//           type="button"
//           className="menu-button"
//           onClick={onMenuClick}
//           aria-label="Open navigation menu"
//         >
//           ☰
//         </button>

//         <div className=" -page">
//           <span className=" -eyebrow">
//             Security Operations
//           </span>

//           <h1 className=" -title">
//             Threat Intelligence Dashboard
//           </h1>
//         </div>
//       </div>

//       <div className=" -right">
//         <div className=" -status">
//           <span className=" -status-dot" />

//           <div className=" -status-text">
//             <span className=" -status-title">
//               Monitoring Active
//             </span>

//             <span className=" -status-subtitle">
//               Honeypot environment online
//             </span>
//           </div>
//         </div>

//         {user && (
//           <div
//             className=" -user"
//             ref={userMenuRef}
//           >
//             <button
//               type="button"
//               className=" -user-button"
//               onClick={
//                 handleUserButtonClick
//               }
//               aria-expanded={
//                 showUserMenu
//               }
//               aria-haspopup="menu"
//             >
//               <span className=" -user-avatar">
//                 {user.name
//                   ?.charAt(0)
//                   .toUpperCase()}
//               </span>

//               <span className=" -user-info">
//                 <strong>
//                   {user.name}
//                 </strong>

//                 <span>
//                   {user.role}
//                 </span>
//               </span>

//               <span className=" -user-arrow">
//                 {showUserMenu
//                   ? "▲"
//                   : "▼"}
//               </span>
//             </button>

//             {showUserMenu && (
//               <div
//                 className=" -user-menu"
//                 role="menu"
//               >
//                 <div className=" -user-menu-header">
//                   <strong>
//                     {user.name}
//                   </strong>

//                   <span>
//                     {user.email}
//                   </span>
//                 </div>

//                 <button
//                   type="button"
//                   className=" -logout-button"
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                   role="menuitem"
//                 >
//                   {isLoggingOut
//                     ? "Signing out..."
//                     : "Sign out"}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default ;