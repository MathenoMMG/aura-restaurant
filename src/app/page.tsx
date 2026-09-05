"use client";

import React, { useState } from "react";
import { useComandaStore } from "@/store/useComandaStore";
import { MenuTemplate } from "@/components/templates/MenuTemplate";
import { AdminTemplate } from "@/components/templates/AdminTemplate";
import { WelcomeTemplate } from "@/components/templates/WelcomeTemplate";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const { config, isAdminView } = useComandaStore();

  if (isAdminView) {
    return <AdminTemplate />;
  }

  if (!hasEntered) {
    return (
      <WelcomeTemplate
        tableNumber={config.tableNumber}
        onEnter={() => setHasEntered(true)}
      />
    );
  }

  return <MenuTemplate onBackToWelcome={() => setHasEntered(false)} />;
}
