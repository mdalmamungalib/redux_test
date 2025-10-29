


const Layout = ({ children }) => {
  return (
    <div className=" bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <main className="flex-grow min-h-screen p-4 mx-auto max-w-screen-2xl sm:p-6 lg:p-8 ">
        {children}
      </main>
    </div>
  );
};

export default Layout;