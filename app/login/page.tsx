"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CustomInput } from "@/components/Login/CustomInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { LuMail, LuLock } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const {login , error} = useAuth()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email) setErrors((prev) => ({ ...prev, email: "Email is required" }));
    if (!password) setErrors((prev) => ({ ...prev, password: "Password is required" }));

    if (!email || !password) return;

    setIsLoading(true);
    // Simulate login
    const loginStatus = await login(email, password)

    if(loginStatus){
      router.replace("/admin")
    }
    
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md mx-4"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-800 mb-2"
        >
          LNS Invshield Grills
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-gray-600 mb-8"
        >
          Admin Panel Login
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <CustomInput
              title="Email"
              type="email"
              icon={<LuMail className="w-5 h-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          <div>
            <CustomInput
              title="Password"
              type="password"
              icon={<LuLock className="w-5 h-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </div>
            {error && <p className="text-red-600 font-bold">{error}</p>}
          <PrimaryButton
            title={isLoading ? "Logging in..." : "Login"}
            backgroundColor="#0a0b0d"
            textColor="white"
            hoverBackgroundColor="#100d08"
            onHoverInteracte={true}
            onClick={() => {}}
          />
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-6"
        >
         
        </motion.div>
      </motion.div>
    </div>
  );
}