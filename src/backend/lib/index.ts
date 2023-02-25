import {
  dbFireStore,
  documentCollectionRef,
  storage,
  userCollectionRef,
} from "../db";
import {
  addDoc as addDocFB,
  query,
  getDocs,
  QueryConstraint,
  updateDoc as updateDocFB,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

type DocProps = {
  collection: "user" | "document";
  values: {};
};

export const addDoc = async (
  collection: DocProps["collection"] = "user",
  values: DocProps["values"]
) => {
  const getCollection =
    collection === "user" ? userCollectionRef : documentCollectionRef;

  return await addDocFB(getCollection, values);
};

export const delFile = async (filePath: string) => {
  const storageRef = ref(storage, filePath);

  deleteObject(storageRef)
    .then(() => {
      console.log("File deleted");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

export const delDoc = async (
  collection: DocProps["collection"] = "user",
  id: string,
  filePath?: string
) => {
  if (filePath) delFile(filePath);
  return await deleteDoc(doc(dbFireStore, collection, id));
};

export const updateDoc = async (
  collection: DocProps["collection"] = "user",
  id: string,
  values: DocProps["values"]
) => {
  return await updateDocFB(doc(dbFireStore, collection, id), values);
};

type FilterDocProps = {
  collection: "user" | "document";
  where: QueryConstraint;
};

export const filterDoc = async (
  collection: FilterDocProps["collection"] = "user",
  where: FilterDocProps["where"]
) => {
  const getCollection =
    collection === "user" ? userCollectionRef : documentCollectionRef;

  const res = query(getCollection, where);
  const querySnapshot = await getDocs(res);

  const data = [] as any;

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

type FileUploadProps = {
  fileName: string;
  file: File | any;
};

export const fileUpload = async (
  fileName: FileUploadProps["fileName"],
  file: FileUploadProps["file"]
) => {
  const storageRef = ref(storage, fileName);

  return await uploadBytes(storageRef, file);
};

export const getFile = async (filePath: string) => {
  const fileref = ref(storage, filePath);
  return await getDownloadURL(fileref).then((url) => url);
};
