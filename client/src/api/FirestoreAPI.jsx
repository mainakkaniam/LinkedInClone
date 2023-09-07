import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

export const handlePost =async  (post) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
          post: post
        });
        console.log("Document added");
        toast.success("Post successfully added!");
      } catch (e) {
        toast.error("Error adding post!");
      }
}


export const readDoc = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsArray = [];

    querySnapshot.forEach((doc) => {
      // Push each document's data into the array
      postsArray.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    // Return the array of documents
    return postsArray;
  } catch (error) {
    console.error("Error reading documents: ", error);
    return []; // Return an empty array in case of an error
  }
};
