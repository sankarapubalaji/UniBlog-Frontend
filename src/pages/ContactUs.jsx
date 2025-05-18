import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoArrowBack } from "react-icons/io5";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageCategory: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const { name, email, messageCategory, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your Formspree or other form submission endpoint
      await fetch("https://formspree.io/f/xldbvrpd", {
        method: "POST",
        body: JSON.stringify({
          to: "uniblogadmin@example.com",
          subject: `Uni Blog Contact: ${messageCategory || "General Inquiry"} from ${name}`,
          message: `Name: ${name}\nEmail: ${email}\nCategory: ${messageCategory || "Not Specified"}\nDescription: ${description}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", messageCategory: "", description: "" });
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to submit your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 relative overflow-hidden">
      <style>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.3);
          animation: drift 20s infinite;
          pointer-events: none;
        }
        .particle:nth-child(1) {
          width: 30px;
          height: 30px;
          left: 20%;
          animation-duration: 18s;
          animation-delay: 0s;
        }
        .particle:nth-child(2) {
          width: 50px;
          height: 50px;
          left: 40%;
          animation-duration: 22s;
          animation-delay: 2s;
        }
        .particle:nth-child(3) {
          width: 40px;
          height: 40px;
          left: 60%;
          animation-duration: 20s;
          animation-delay: 4s;
        }
        .particle:nth-child(4) {
          width: 35px;
          height: 35px;
          left: 80%;
          animation-duration: 24s;
          animation-delay: 6s;
        }
        @keyframes drift {
          0% {
            transform: translateY(100vh) scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(1.1);
            opacity: 0.2;
          }
        }
        .form-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glow-input {
          transition: all 0.3s ease;
        }
        .glow-input:focus {
          box-shadow: 0 0 10px rgba(94, 234, 212, 0.5);
          border-color: #5eead4;
        }
        .success-message {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <Navbar />
      <div className="px-6 md:px-[150px] py-12 relative z-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-teal-300 transition-colors"
          >
            <IoArrowBack className="mr-2" />
            Back
          </button>
        </div>

        <div className="form-container rounded-2xl p-8 shadow-2xl">
          {submitSuccess ? (
            <div className="success-message text-center">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Message Sent!</h2>
              <p className="text-gray-300 mb-6">
                Thank you for contacting Uni Blog Support. We'll get back to you soon!
                <br />
                (This will close automatically in 5 seconds)
              </p>
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <p className="text-gray-200"><strong>Name:</strong> {name}</p>
                <p className="text-gray-200"><strong>Email:</strong> {email}</p>
                <p className="text-gray-200"><strong>Category:</strong> {messageCategory || "General Inquiry"}</p>
              </div>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="text-white bg-teal-500 font-semibold px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h1 className="font-bold text-3xl text-white mb-8 text-center bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
                Contact Uni Blog Support
              </h1>
              <form onSubmit={onSubmit} className="w-full flex flex-col space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={onChange}
                      className="glow-input w-full outline-none px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      className="glow-input w-full outline-none px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Message Category</label>
                    <select
                      name="messageCategory"
                      value={messageCategory}
                      onChange={onChange}
                      className="glow-input w-full outline-none px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Blog Support">Blog Support</option>
                      <option value="Account Issue">Account Issue</option>
                      <option value="Feedback">Feedback</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={onChange}
                      className="glow-input w-full outline-none px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                      rows={5}
                      placeholder="Tell us about your query..."
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    type="submit"
                    className="w-full md:w-[20%] text-white bg-teal-500 font-semibold px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full md:w-[20%] text-white bg-gray-600 font-semibold px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;