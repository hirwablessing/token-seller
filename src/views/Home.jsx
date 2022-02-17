import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <React.Fragment>
      <Header title="Home" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4 ">
              You have 10 active days
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
