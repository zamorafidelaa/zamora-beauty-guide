const Home = () => {
  return (
    <div className="home-container">
      <video
        className="video-player"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="welcome-message">
        <h1>Welcome to Zamora Beauty Guide</h1>
        <p>
          Discover the perfect way to care for your skin. Zamora Beauty Guide 
          helps you consult and understand your skin's unique needs, providing 
          expert recommendations to achieve your best glow.
        </p>
      </div>
    </div>
  );
};

export default Home;
