import { useState } from 'react';

const Body = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    

     
      <div className="flex-grow p-4">
        {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-2 py-1 mb-4 md:hidden bg-gray-200 rounded"
        >
          Toggle Sidebar
        </button> */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Content</h2>
          <p className="mt-4">Here is your main content...</p>
        </div>
      </div>

  );
};

export default Body;