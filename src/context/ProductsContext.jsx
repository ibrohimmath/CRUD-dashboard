import { createContext, useState, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [added, setAdded] = useState(0);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  const getCategories = async (setIsLoading) => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      console.log("Categories", res);
      setCategories(res.data);
    } catch (err) {
      toast.error(err.message || "Error");
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (
    imageUrl,
    category,
    price,
    title,
    description = ""
  ) => {
    try {
      const res = await axios({
        method: "post",
        url: "https://fakestoreapi.com/products",
        data: {
          image: imageUrl,
          category,
          price,
          title,
          description,
        },
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAdded(added + 1);
      setData(
        (data || []).concat({
          id: uuidv4(),
          image: imageUrl,
          category,
          price,
          title,
          description,
        })
      );
      toast.success("Product was successfully created");
    }
  };

  const updateProduct = async (
    id,
    imageUrl,
    category,
    price,
    title,
    description = ""
  ) => {
    try {
      const res = await axios({
        method: "put",
        url: "https://fakestoreapi.com/products/" + id,
        data: {
          image: imageUrl,
          category,
          price,
          title,
          description,
        },
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setData(
        data.map((productItem) => {
          if (productItem.id != id) {
            return productItem;
          }
          return {
            id,
            image: imageUrl,
            category,
            price,
            title,
            description,
          };
        })
      );
      toast.success("Product was successfully updated");
    }
  };

  const getOneProduct = (id) => {
    for (const productItem of data) {
      if (productItem.id == id) {
        return productItem;
      }
    }
  };

  const deleteProduct = async (id, setIsLoading) => {
    console.log("Delete", id);
    try {
      const res = await axios.delete("https://fakestoreapi.com/products/" + id);
    } catch (err) {
      console.log("Delete error", err.message);
    } finally {
      setAdded(Math.max(added - 1, 0));
      setData(data.filter((dataItem) => dataItem.id != id));
      toast.success("Product with id " + id + " was successfully deleted");
    }
  };

  const getProducts = async (setIsloading) => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setData(res.data);
      // console.log(res.data);
    } catch (err) {
      toast.error(err.message || "Error");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        categories,
        setCategories,
        data,
        setData,
        getCategories,
        addProduct,
        updateProduct,
        getOneProduct,
        getProducts,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };
