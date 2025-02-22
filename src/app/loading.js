export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

// export default function Loading() {
//   return (
//     <div className="space-y-2">
//       <div className="animate-pulse bg-gray-500 h-10 w-full rounded"></div>
//       <div className="animate-pulse bg-gray-500 h-10 w-full rounded"></div>
//       <div className="animate-pulse bg-gray-500 h-10 w-full rounded"></div>
//     </div>
//   );
// }