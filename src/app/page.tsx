"use client";
import Navbar from "@/shared/components/Navbar";
import Landing from "@/shared/components/LoginLanding";
import Features from "@/shared/components/LandingFeatures";
import Reviews from "@/shared/components/LandingReviews";
import Footer from "@/shared/components/Footer";
import { useState } from "react";
import LoginModal from "@/app/UI/LoginModal";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openModal = () => setIsLoginOpen(true);
  const closeModal = () => setIsLoginOpen(false);
  return (
    <>
      <Navbar onOpenModal={openModal} />
      <Landing onOpenModal={openModal} />
      <Features />
      <Reviews onOpenModal={openModal} />
      <Footer />

      <LoginModal isOpen={isLoginOpen} onClose={closeModal} />
    </>
  );
}
