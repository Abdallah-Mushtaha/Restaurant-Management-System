const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
    html { scroll-behavior: smooth; }
    body { font-family: 'Tajawal', sans-serif; background-color: #ffffff; overflow-x: hidden; }
    .text-gradient { background: linear-gradient(to left, #111827, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .btn-shadow { box-shadow: 0 20px 40px -15px rgba(249, 115, 22, 0.4); }
    .card-hover { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    .card-hover:hover { transform: translateY(-12px); box-shadow: 0 40px 70px -20px rgba(0,0,0,0.1); }
    @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .doodle-float { animation: float 10s ease-in-out infinite; }
  `}</style>
);

export default GlobalStyles;
