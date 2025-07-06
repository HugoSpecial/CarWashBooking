import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RecoverPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("anbfoiasbfiolbsafbnseds'd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      setSuccess("Password reset link sent to your email!");
    } catch (err) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const buttonTap = {
    scale: 0.98,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-[Poppins] bg-[url('/bgauth.png')] bg-cover bg-center bg-no-repeat">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1E1E1E] rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-[#B8893F]"
      >
        {/* Golden Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="bg-[#B8893F] text-white p-8 md:p-12 flex-1 flex flex-col justify-center items-center rounded-b-3xl md:rounded-r-full md:rounded-bl-none order-first md:order-none"
        >
          <div className="text-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Recuperar Senha
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 md:mb-8 text-lg text-[#F5F5F5]"
            >
              Digite seu email para redefinir sua senha
            </motion.p>
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => navigate("/")}
              className="border-2 border-white text-white hover:bg-white hover:text-[#B8893F] px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Voltar para Login
            </motion.button>
          </div>
        </motion.div>

        {/* Form Section */}
        <div className="flex-1 p-6 md:p-12 flex flex-col justify-center bg-[#1E1E1E] text-[#F5F5F5] order-last md:order-none">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-sm mx-auto w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"
            >
              Redefinir Senha
            </motion.h2>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm border border-red-500/30 flex items-start"
              >
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-500/20 text-green-300 rounded-lg text-sm border border-green-500/30 flex items-start"
              >
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{success}</span>
              </motion.div>
            )}

            <motion.form
              variants={containerVariants}
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#B8893F]" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 md:py-4 bg-[#0B0B0B] text-[#F5F5F5] placeholder-gray-500 border border-[#B8893F] rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  required
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={!loading ? buttonHover : {}}
                whileTap={!loading ? buttonTap : {}}
                type="submit"
                disabled={loading}
                className="w-full bg-[#B8893F] hover:bg-[#D4AF37] text-[#0B0B0B] py-3 md:py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar Link"
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
