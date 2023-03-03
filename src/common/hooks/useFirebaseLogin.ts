import { auth } from "@/backend/db";
import { addDoc, filterDoc } from "@/backend/lib";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { where } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const useFirebaseLogin = () => {
  async function handleLogin() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result?.user;

        const res = await filterDoc("user", where("uid", "==", user?.uid));
        localStorage.setItem("token", user?.uid!);

        if (res.length !== 0) return;

        await addDoc("user", {
          name: user?.displayName,
          uid: user?.uid,
          image: user?.photoURL,
          email: user?.email,
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  return { handleLogin };
};
