import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { Text, Size, Boldness } from "@/components/Typography";
import { ProductsContext } from "@/context/ProductsContext";
import { Button, Type } from "@/components/Button";
import cn from "./style.module.scss";

function ProductAdd({ updateItem }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { categories, getCategories, addProduct, updateProduct } =
    useContext(ProductsContext);

  const [imageUrl, setImageUrl] = useState(updateItem?.image || "");
  const [validImage, setValidImage] = useState(true);
  const [imageError, setImageError] = useState("");
  const [category, setCategory] = useState(
    updateItem?.category || categories?.[0] || ""
  );
  const [price, setPrice] = useState(updateItem?.price || 0);
  const [title, setTitle] = useState(updateItem?.title || "");
  const [description, setDescription] = useState(updateItem?.description || "");

  // Checking whether image url is valid or not
  const validateImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error("Invalid image URL"));
      img.src = url;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(imageUrl, category, price, title, description);
    if (updateItem) {
      updateProduct(
        updateItem.id,
        imageUrl,
        category,
        price,
        title,
        description
      );
    } else {
      addProduct(imageUrl, category, price, title, description);
    }
    const timeout = setTimeout(() => {
      setImageUrl("");
      setCategory("");
      setPrice(0);
      setTitle("");
      setDescription("");
      navigate("/products");
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!categories.length) getCategories(setIsLoading);
    else {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        clearTimeout(timeout);
      }, 500);
    }
    setCategory(categories[0]);
  }, []);

  // checking whether image url is valid and exists
  useEffect(() => {
    (async () => {
      setValidImage(true);
      setImageError("");
      if (imageUrl.trim()) {
        try {
          await validateImageUrl(imageUrl);
          setValidImage(true);
          setImageError("");
        } catch (err) {
          setValidImage(false);
          setImageError(err.message);
        }
      }
    })();
  }, [imageUrl]);

  return isLoading ? (
    <div
      className="loader-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        margin: "30vh 0",
        width: "100%",
      }}
    >
      <div className="loader"></div>
    </div>
  ) : (
    <div className={clsx(cn["product-add"])}>
      <ToastContainer />
      <Text size={Size.lg} boldness={Boldness.bold}>
        {updateItem ? "Product update" : "Product add"}
      </Text>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="image"
          style={{ display: "block", marginTop: "1rem", fontWeight: "500" }}
        >
          Image
        </label>
        <input
          type="url"
          name="image"
          id="image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div
          className="flex-two"
          style={{
            width: "100%",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div className="flex-item" style={{ marginTop: "1rem" }}>
            <label
              htmlFor="category"
              style={{ display: "block", fontWeight: "500" }}
            >
              Category
            </label>
            <select
              name="categories"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((categoryItem) => (
                <option key={uuidv4()} value={categoryItem}>
                  {categoryItem}
                </option>
              ))}
            </select>
          </div>
          <div
            className="flex-item"
            style={{ marginTop: "1rem", width: "15%" }}
          >
            <label htmlFor="price" style={{ fontWeight: "500" }}>
              Price
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <label
          htmlFor="title"
          style={{ display: "block", marginTop: "1rem", fontWeight: "500" }}
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label
          htmlFor="description"
          style={{ display: "block", marginTop: "1rem", fontWeight: "500" }}
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          value={description}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          submit={true}
          type={Type.secondary}
          style={{ marginTop: "1rem", width: "25%" }}
        >
          {updateItem ? "Update Product" : "Add Product"}
        </Button>
        <br />
        {validImage ? (
          <img
            src={imageUrl}
            style={{ marginTop: "1rem", maxWidth: "100%", maxHeight: "30vh" }}
          />
        ) : (
          <Text
            style={{ marginTop: "1rem", color: "red" }}
            size={Size.lg}
            boldness={Boldness.semibold}
          >
            {imageError}
          </Text>
        )}
      </form>
    </div>
  );
}

export default ProductAdd;
