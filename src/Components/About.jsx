import React from "react";

const About = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-amber-500 p-10 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold mb-5"> Carlitos Dutan</h1>
        </div>
        <div className="flex justify-center">
          <a className="developer-link" href="https://github.com/CRDutan5">
            <img
              className="developer-image"
              src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711574507/Data%20seed%20class/github-mark_edqyun.png"
              alt="Carlitos Dutan GitHub"
            />
          </a>
        </div>
        <div className="mt-5 max-w-80 text-center">
          <p className="font-bold">
            ...is a Software Developer from Queens, New York. Some of his
            hobbies consists of coding, playing soccer, working out and hanging
            out with friends!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
