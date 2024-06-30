import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "@/context/ProductsContext";
import Layout from "@/components/Layout";
import ProductAdd from "@/components/ProductAdd";

function ProductUpdatePage() {
  const { id } = useParams();
  const { getOneProduct } = useContext(ProductsContext);

  // console.log("Product id", id, "Product", getOneProduct(id));

  return (
    <Layout>
      <ProductAdd updateItem={getOneProduct(id)} />
    </Layout>
  );
}

export default ProductUpdatePage;
