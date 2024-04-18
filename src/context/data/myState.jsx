import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

function myState(props) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [products, setProducts] = useState([]);

  const addProduct = async () => {
    if (
      product.title == null ||
      product.price == null ||
      product.imageUrl == null ||
      product.category == null ||
      product.description == null
    ) {
      return toast.error("Please fill all fields");
    }

    const productRef = collection(fireDB, "products");
    setLoading(true);

    try {
      await addDoc(productRef, product);
      toast.success("Product add successfully");
      getProduct();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setProduct("");
  };

  const getProduct = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const editHandle = (item) => {
    setProduct(item);
  };

  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", item.id), item);
      toast.success("Product Updated successfully");
      getProduct();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProduct("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      console.log(item.id);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getProduct();
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false);
    }
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        product,
        setProduct,
        addProduct,
        products,
        editHandle,
        updateProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
