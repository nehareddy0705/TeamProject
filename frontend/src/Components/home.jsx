import React, { useState, useEffect } from "react";
import home_1 from "../assets/OIP.webp";
import home_2 from "../assets/home_2.jpg";
import home_3 from "../assets/home_3.jpg";
import home_4 from "../assets/home_4.webp";
import home_6 from "../assets/home_6.png"
import * as theme from "../styles/Common";
import { API_BASE_URL } from "../config/api";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "DONOR",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "", role: "DONOR" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setFormSuccess("Signup successful. You can now login.");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          password: "",
          role: "DONOR",
        });
      } else {
        setFormError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setFormError("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        setShowLoginModal(false);
        window.history.pushState({}, "", "/fundraising");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Something went wrong!");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const slides = [
    {
      id: 1,
      text: "EVERY PENNY YOU SEND WILL BE A STEP FOR A BRIGHTER FUTURE OF A KID",
      subtext:
        "Money donated to orphanages helps children meet basic needs like food, clothing, healthcare, and education. It also eases the financial burden on orphanages, allowing them to focus on emotional care and long‑term growth. Even small contributions ensure nutrition, school supplies, medical support, and a nurturing environment where every child can thrive.",
      img: home_1,
    },
    {
      id: 2,
      text: "YOUR CONTRIBUTION HELPS RESTORE CLEAN POND WATER",
      subtext:
        "By supporting clean pond water initiatives, you are giving communities access to safe drinking water, healthier meals, and a renewed environment. Restored ponds not only provide clean water for families but also sustain agriculture, nourish livestock, and protect local ecosystems. Every drop you help restore becomes a source of life, dignity, and hope for generations to come.",
      img: home_2,
    },
    {
      id: 3,
      text: "YOUR CONTRIBUTION SAVES LIVES IN HOSPITALS",
      subtext:
        "Every donation you make strengthens hospitals by providing essential medicines, clean equipment, and life‑saving treatments. Your support ensures that patients receive timely care, doctors have the resources they need, and families can find hope even in their most difficult moments. From emergency wards to critical surgeries, your contribution directly translates into healthier lives and stronger communities.",
      img: home_3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 120000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative">
      <div className={theme.pageBackground + (showLoginModal ? " blur-sm" : "")}> 
      <div className="relative w-full h-screen bg-[#41431B] bg-opacity-95">
        <img
          src={home_6}    
              alt="Hospital background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16 h-full">
          <div className="md:w-1/2 text-left space-y-6">
            <h1 className="text-4xl font-bold text-[#F8F3E1]">
              Start a FREE Fundraiser & Raise Funds 
            </h1>
            <p className="text-lg text-[#adadac]">
              Now with <span className="font-semibold">0% platform fees*</span>
            </p>
           
          </div>

          <div className="md:w-1/2 bg-[#F8F3E1] border border-[#AEB784] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#41431B] mb-6">
              Sign up to start fundraising
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *"
                className={theme.input}
                required
              />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number *"
                className={theme.input}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className={theme.input}
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password *"
                className={theme.input}
                minLength={6}
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={theme.input}
                required
              >
                <option value="DONOR">Donor</option>
                <option value="FUNDRAISER">Fundraiser</option>
              </select>
              <button type="submit" className={theme.btnPrimary + " w-full"}>
                {isSubmitting ? "Signing up..." : "SIGN UP"}
              </button>
            </form>
            {formError ? (
              <p className="mt-3 text-sm text-red-700 text-center">{formError}</p>
            ) : null}
            {formSuccess ? (
              <p className="mt-3 text-sm text-green-700 text-center">{formSuccess}</p>
            ) : null}
            <p className="mt-3 text-sm text-[#41431B] text-center">
              If you have an account, 
              <button
                type="button"
                className="ml-1 font-semibold text-[#41431B] underline underline-offset-2 hover:text-[#AEB784]"
                onClick={() => {
                  setLoginError("");
                  setShowLoginModal(true);
                }}
              >
                Login
              </button>
            </p>
            <p className="mt-4 text-sm text-[#AEB784] text-center">
              204 People started a fundraiser in last 2 days
            </p>
          </div>
        </div>
      </div>

      

      <div className={theme.pageWrapper}>
        <div className={theme.card + " flex items-center gap-10 transition-all duration-500"}>
          <div className="w-1/2">
            <p className={theme.heading}>{slides[currentIndex].text}</p>
            <p className={theme.body}>{slides[currentIndex].subtext}</p>
          </div>

          <div className="w-1/2">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={slides[currentIndex].img}
              alt={`Slide ${currentIndex}`}
            />
          </div>
        </div>

        <div className="flex gap-5 mt-6">
          <button onClick={prevSlide} className={theme.btnPrimary}>
            Previous
          </button>
          <button onClick={nextSlide} className={theme.btnPrimary}>
            Next
          </button>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 flex justify-center p-5">
            <img
              className="rounded-full shadow-2xl shadow-[#AEB784]"
              src={home_4}
              alt="About us"
            />
          </div>
          <div className="md:w-1/2">
            <p className={theme.pageTitle}>ABOUT US</p>
            <p className={theme.body}>
              Our platform was born from a simple belief: when people come
              together, even small contributions can create extraordinary
              change. Every campaign reflects not just a need, but a dream —
              and every donation is a step toward making that dream real. We
              built this platform with trust at its core, ensuring transparency
              in every transaction and accountability in every campaign. Behind
              the scenes, our team’s hard work fuels the system, making it
              secure, reliable, and easy to use. Together, trust and dedication
              form the foundation of our mission: to connect hearts, empower
              communities, and prove that collective effort can transform lives.
            </p>
          </div>
        </div>
      </div>
    </div>

      {showLoginModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#41431B]/45 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#F8F3E1] border border-[#AEB784] rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#41431B]">Login</h3>
              <button
                type="button"
                className="text-[#41431B] hover:text-[#AEB784] text-lg"
                onClick={() => setShowLoginModal(false)}
              >
                x
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email Address *"
                className={theme.input}
                required
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password *"
                className={theme.input}
                required
              />
              <select
                name="role"
                value={loginData.role}
                onChange={handleLoginChange}
                className={theme.input}
                required
              >
                <option value="DONOR">Donor</option>
                <option value="FUNDRAISER">Fundraiser</option>
              </select>
              <button type="submit" className={theme.btnPrimary + " w-full"}>
                {isLoggingIn ? "Logging in..." : "LOGIN"}
              </button>
            </form>

            {loginError ? (
              <p className="mt-3 text-sm text-red-700 text-center">{loginError}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
