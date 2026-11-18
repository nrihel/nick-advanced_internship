"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/app/lib/firebase/config";
import LoginModal from "@/app/UI/LoginModal";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoginOpen: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openModal: () => void;
  closeModal: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  savedBookIds: string[];
  toggleSaveBook: (bookId: string) => Promise<void>;
  fontSize: string;
  setFontSize: (size: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openModal = () => setIsLoginOpen(true);
  const closeModal = () => setIsLoginOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState("text-base")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setSavedBookIds(userSnap.data().savedBooks || []);
        } else {
          await setDoc(userRef, {savedBooks: []});
          setSavedBookIds([]);
        }
      } else {
        setSavedBookIds([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleSaveBook = async (bookId: string) => {
    if (!user) {
      openModal();
      return;
    }
    const userRef = doc(db, "users", user.uid);
    const isAlreadySaved = savedBookIds.includes(bookId);

    if (isAlreadySaved) {
      setSavedBookIds((prev) => prev.filter((id) => id !== bookId));
      await setDoc(userRef, { savedBooks: arrayRemove(bookId) }, {merge: true} );
    } else {
      setSavedBookIds((prev) => [...prev, bookId]);
      await setDoc(userRef, { savedBooks: arrayUnion(bookId) }, {merge: true});
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const loginAsGuest = async () => {
    await signInAnonymously(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoginOpen,
        openModal,
        closeModal,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        loginAsGuest,
        resetPassword,
        logout,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        savedBookIds,
        toggleSaveBook,
        fontSize,
        setFontSize,
      }}
    >
      {children}
      <LoginModal isOpen={isLoginOpen} onClose={closeModal} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
