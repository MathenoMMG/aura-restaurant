"use client";

import React, { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useComandaStore } from "@/store/useComandaStore";
import { MenuTemplate } from "@/components/templates/MenuTemplate";
import { AdminTemplate } from "@/components/templates/AdminTemplate";
import { WelcomeTemplate } from "@/components/templates/WelcomeTemplate";

/** La bienvenida se va hacia arriba y la carta entra desde abajo; al volver,
 *  el recorrido se invierte para que el gesto de "atrás" se lea como tal. */
const EASE = [0.22, 0.7, 0.3, 1] as const;

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const { config, isAdminView } = useComandaStore();

  if (isAdminView) {
    return <AdminTemplate />;
  }

  return (
    // reducedMotion="user" respeta la preferencia del sistema en toda la app.
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {hasEntered ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <MenuTemplate onBackToWelcome={() => setHasEntered(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <WelcomeTemplate
              tableNumber={config.tableNumber}
              onEnter={() => setHasEntered(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
