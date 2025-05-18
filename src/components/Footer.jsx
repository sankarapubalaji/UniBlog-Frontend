const Footer = () => {
  return (
    <>
      <style>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: float 15s infinite;
          pointer-events: none;
        }

        .bubble:nth-child(1) {
          width: 40px;
          height: 40px;
          left: 10%;
          animation-duration: 12s;
          animation-delay: 0s;
        }

        .bubble:nth-child(2) {
          width: 60px;
          height: 60px;
          left: 30%;
          animation-duration: 18s;
          animation-delay: 2s;
        }

        .bubble:nth-child(3) {
          width: 30px;
          height: 30px;
          left: 50%;
          animation-duration: 15s;
          animation-delay: 4s;
        }

        .bubble:nth-child(4) {
          width: 50px;
          height: 50px;
          left: 70%;
          animation-duration: 20s;
          animation-delay: 6s;
        }

        @keyframes float {
          0% {
            transform: translateY(100%) scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100%) scale(1.2);
            opacity: 0.2;
          }
        }
      `}</style>
      <footer className="w-full bg-gradient-to-r from-gray-900 to-black px-8 py-8 text-center text-sm relative overflow-hidden mt-auto">
        {/* Bubble Elements */}
        <div className="bubble bg-pink-400"></div>
        <div className="bubble bg-cyan-400"></div>
        <div className="bubble bg-yellow-400"></div>
        <div className="bubble bg-purple-400"></div>

        {/* Footer Content */}
        <div className="relative z-10">
          <p className="bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent font-semibold">
            Designed by Group 12
          </p>
          <p className="bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent font-semibold">
            All Rights Reserved
          </p>
          <p>
            <a
              href="mailto:uniblogroup7@gmail.com"
              className="bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent hover:from-pink-500 hover:via-cyan-500 hover:to-yellow-500 transition-colors font-semibold"
            >
              contact us - uniblogroup7@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;