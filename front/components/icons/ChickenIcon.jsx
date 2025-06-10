// components/icons/ChickenIcon.jsx
export default function ChickenIcon({ width = 24, height = 24, color = "#EF4444", ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* El path original del SVG */}
      <path
        d="M28.76,3.24C28.25,1.91,26.96,1,25.5,1C23.57,1,22,2.57,22,4.5c0,0.58,0.16,1.15,0.43,1.65l-2.86,2.86   C14.82,7.4,7.06,10.8,3.93,13.93c-3.9,3.9-3.9,10.24,0,14.14C5.88,30.02,8.44,31,11,31s5.12-0.98,7.07-2.92   c3.13-3.13,6.53-10.89,4.91-15.64l2.86-2.86C26.35,9.84,26.92,10,27.5,10c1.93,0,3.5-1.57,3.5-3.5C31,5.04,30.09,3.75,28.76,3.24z"
        fill={color}
      />
    </svg>
  );
}
