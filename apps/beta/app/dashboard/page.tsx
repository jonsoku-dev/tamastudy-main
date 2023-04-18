import React from 'react';

export const metadata = {
  title: 'Dashboard',
};

// // or Dynamic metadata
// export async function generateMetadata({ params }) {
//   return {
//     title: '...',
//   };
// }

export default function DashboardPage() {
  return (
    <div>
      DashBoard
      {/*<Counter />*/}
      {/*<ListUsers />*/}
    </div>
  );
}
