import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="w-[10px] h-[10px] bg-gray-400"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      exit={{ scale: 0 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
      }}
    />
  );
};

export default Loading;
