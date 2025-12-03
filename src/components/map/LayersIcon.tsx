import React from "react";

interface IconProps {
  size?: number;
}

export const AmenitiesIcon: React.FC<IconProps> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="4" fill="#ECECEC" />
    <path d="M14 19V25C14 25 16 27 20 27C24 27 26 25 26 25V19" stroke="black" strokeWidth="1.5" />
    <path d="M28.5 24.5L27.0647 27.8435C26.8369 28.374 27.2391 29 27.8286 29H29.1714C29.7609 29 30.1631 28.374 29.9353 27.8435L28.5 24.5ZM28.5 24.5V17.5"
      stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.88 11.0088C16.9949 11.4275 12.6241 13.8845 10.4627 15.1882C9.84576 15.5603 9.84576 16.4397 10.4627 16.8118C12.6241 18.1155 16.9949 20.5725 19.88 20.9912C19.961 21.0029 20.039 21.0029 20.12 20.9912C23.0051 20.5725 27.3759 18.1155 29.5373 16.8118C30.1542 16.4397 30.1542 15.5603 29.5373 15.1882C27.3759 13.8845 23.0051 11.4275 20.12 11.0088C20.039 10.9971 19.961 10.9971 19.88 11.0088Z"
      stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);



export const MetroIcon = ({ size = 34 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="4" fill="#ECECEC" />
        <path d="M10 11.0001L18 11L28.8395 18.2266C29.5644 18.7098 29.9997 19.5234 29.9997 20.3945C29.9997 21.8336 28.8332 23.0001 27.3942 23.0001H10" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 16L13 16C14.6568 16 16 17.3431 16 19V20H10" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M29.5 19H23.3333C20.3878 19 18 16.7614 18 14V11" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 26H30" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M26 26V29M20 26V29M14 26V29" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>

);

export const SewerIcon = ({ size = 34 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="4" fill="#ECECEC" />
        <path d="M11.25 25.0002H15.927C15.5475 24.7106 15.2017 24.3766 14.8895 23.9982C14.5773 23.6201 14.3168 23.2041 14.1077 22.7502H11.25V25.0002ZM20 25.0002C21.3833 25.0002 22.5625 24.5127 23.5375 23.5377C24.5125 22.5627 25 21.3836 25 20.0002C25 18.6169 24.5125 17.4377 23.5375 16.4627C22.5625 15.4877 21.3833 15.0002 20 15.0002C18.6167 15.0002 17.4375 15.4877 16.4625 16.4627C15.4875 17.4377 15 18.6169 15 20.0002C15 21.3836 15.4875 22.5627 16.4625 23.5377C17.4375 24.5127 18.6167 25.0002 20 25.0002ZM25.8923 17.2502H28.75V15.0002H24.073C24.4525 15.2899 24.7983 15.6239 25.1105 16.0022C25.4227 16.3804 25.6833 16.7964 25.8923 17.2502ZM9.75 27.3847V20.3657H11.25V21.2502H13.6423C13.5898 21.0451 13.5529 20.8409 13.5318 20.6377C13.5106 20.4346 13.5 20.2221 13.5 20.0002C13.5 18.1896 14.1307 16.6536 15.392 15.3922C16.6533 14.1309 18.1893 13.5002 20 13.5002H28.75V12.6157H30.25V19.6347H28.75V18.7502H26.3577C26.4102 18.9554 26.4471 19.1596 26.4683 19.3627C26.4894 19.5659 26.5 19.7784 26.5 20.0002C26.5 21.8109 25.8693 23.3469 24.608 24.6082C23.3467 25.8696 21.8107 26.5002 20 26.5002H11.25V27.3847H9.75ZM20 22.606C19.5142 22.606 19.101 22.4358 18.7605 22.0955C18.4202 21.755 18.25 21.3418 18.25 20.856C18.25 20.5303 18.3196 20.2041 18.4588 19.8772C18.5978 19.5502 18.857 19.0945 19.2365 18.51L19.9905 17.3945L20.7537 18.51C21.1436 19.1071 21.4071 19.5656 21.5443 19.8855C21.6814 20.2055 21.75 20.529 21.75 20.856C21.75 21.3418 21.5798 21.755 21.2395 22.0955C20.899 22.4358 20.4858 22.606 20 22.606Z" fill="#1F1F1F" />
    </svg>

);

export const WaterIcon = ({ size = 34 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="4" fill="#ECECEC" />
        <path d="M16 29.5H23" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.5 13.5H16.5V19.5H22.5V13.5Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20.9879 19.5H17.9922V29.5H20.9879V19.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.5 10.5H15.7637C14.9885 10.5 14.2832 10.9479 13.9535 11.6495L10.5 19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.4844 10.5V13.5" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M26.5558 15.0002L22.5 15V17.9903H26.4934C26.4989 17.9903 26.5033 17.9948 26.5033 18.0004V20.5H29.4951V18.4995C29.6127 15.82 27.5846 15.0501 26.5558 15.0002Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M27.9998 23.5C25.756 25.6981 26.2601 27.5 27.9993 27.5C29.7386 27.5 30.2435 25.6981 27.9998 23.5Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>

);
// ... Continue this same conversion style for RuralIcon, RailwayIcon, SewerIcon, etc.

// SPECIAL LEGEND ICONS
export const LegendSuburbIcon: React.FC<IconProps> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 54 18" fill="none">
    <rect y="7" width="54" height="4" fill="#DF1600" />
    <circle cx="27" cy="9" r="8.5" fill="#DF1600" stroke="white" />
    <g clipPath="url(#clip0_80_7872)">
      <path d="M30.3332 10.2497V6.49967C30.3332 5.5792 29.587 4.83301 28.6665 4.83301H25.3332C24.4127 4.83301 23.6665 5.5792 23.6665 6.49967V10.2497C23.6665 11.1701 24.4127 11.9163 25.3332 11.9163H28.6665C29.587 11.9163 30.3332 11.1701 30.3332 10.2497Z"
        stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      ...
    </g>
    <defs>
      <clipPath id="clip0_80_7872">
        <rect width="10" height="10" fill="white" transform="translate(22 4)" />
      </clipPath>
    </defs>
  </svg>
);

export const LegendHighTensionIcon: React.FC<IconProps> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 54 18" fill="none">
    <rect y="7" width="54" height="4" fill="#CE6418" />
    <circle cx="27" cy="9" r="8.5" fill="#CE6418" stroke="white" />
    <path d="..." fill="#CE6418" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
