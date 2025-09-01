import { motion } from "framer-motion";

const About = () => {
  const sections = [
    {
      title: "Our Mission",
      text: "At Zamora Beauty Guide, our mission is to empower everyone with the knowledge and products they need for their unique skincare journey.",
    },
    {
      title: "How It Works",
      text: "Getting started is easy! Sign up or log in, complete a brief consultation, and receive customized beauty and skincare product recommendations.",
    },
    {
      title: "Our Team",
      text: "Our team of beauty experts and skincare enthusiasts is passionate about helping you achieve your goals.",
    },
    {
      title: "Contact Us",
      text: (
        <>
          Got questions? Email us at{" "}
          <a
            href="mailto:morafidela1@gmail.com"
            className="text-pink-600 hover:underline font-medium"
          >
            morafidela1@gmail.com
          </a>
        </>
      ),
    },
  ];

  return (
    <section
      className="relative min-h-screen mt-10 px-6 bg-gradient-to-b from-pink-50 via-white to-pink-100 flex flex-col justify-center"
      id="about"
    >
      {/* background accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          About Us
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to{" "}
          <span className="font-semibold text-pink-600">
            Zamora Beauty Guide
          </span>
          , your trusted platform for personalized beauty and skincare advice.
          We are here to help you achieve radiant, healthy skin with tailored
          recommendations.
        </motion.p>

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-0">
          {sections.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white shadow-lg rounded-3xl p-8 border border-pink-100 hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
