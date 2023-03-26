"use client";

export const Footer = () => {
  const defaultImage = "/backgrounds/footer.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="w-full h-[500px]  mt-40" style={backgroundImageStyle}>
      <div className="container px-10 mx-auto">
        <h1>Atlas</h1>
        <h5>Home to the Adventurers</h5>
      </div>
    </div>
  );
};
