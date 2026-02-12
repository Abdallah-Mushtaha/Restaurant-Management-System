const FoodDoodles = () => {
  const icons = [
    "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
    "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    "https://cdn-icons-png.flaticon.com/512/2153/2153788.png",
    "https://cdn-icons-png.flaticon.com/512/3753/3753464.png",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] z-0">
      <div className="relative w-full h-full">
        {[...Array(20)].map((_, i) => (
          <img
            key={i}
            src={icons[i % icons.length]}
            className="absolute doodle-float"
            style={{
              width: `${Math.random() * 40 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDoodles;
