import { create } from "zustand";
import { signOut } from "firebase/auth";
import { auth } from "@/backend/db";
import { filterDoc } from "@/backend/lib";
import { where } from "firebase/firestore";
import { Document } from "@/common/types/document";

type UseStoreProps = {
  documents: Document[] | [];
  logout: () => void;
  getUserDocuments: () => void;
};

export const useStore = create<UseStoreProps>((set) => ({
  documents: [],

  logout: () => {
    localStorage.removeItem("token");
    signOut(auth);

    set({ documents: [] });
  },

  getUserDocuments: async () => {
    const token = localStorage.getItem("token");
    let documents = await filterDoc("document", where("user", "==", token));
    documents.reverse();
    set({ documents });
  },
}));
