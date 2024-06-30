import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { ToastContainer } from "react-toastify";
import clsx from "clsx";
import { ProductsContext } from "@/context/ProductsContext";
import cn from "./style.module.scss";

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, getProducts, deleteProduct, added } =
    useContext(ProductsContext);

  const columns = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Image",
      accessorKey: "image",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Actions",
      accessorKey: "actions",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setIsLoading(true);
    if (!data || !data.length || data.length <= added)
      getProducts(setIsLoading);
    else {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        clearTimeout(timeout);
      }, 500);
    }
  }, []);

  return (
    <div className={clsx(cn["products"])}>
      <ToastContainer />
      {isLoading ? (
        <div
          className="loader-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            margin: "25vh 0",
            width: "100%",
          }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <table style={{ width: "100%" }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // console.log(header);
                  return (
                    <th key={header.id} className={clsx(cn[header.id])}>
                      {header.isPlaceholder
                        ? null
                        : header.column.columnDef.header}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // console.log(row);
                  if (cell.column.id === "image") {
                    return (
                      <td
                        key={cell.id}
                        className={clsx(cn["product-image-wrapper"])}
                      >
                        {cell?.isPlaceholder ? null : (
                          <img
                            src={cell.getValue()}
                            className={clsx(cn["product-image"])}
                          />
                        )}
                      </td>
                    );
                  }
                  if (cell.column.id === "actions") {
                    return (
                      <td key={cell.id} className={cn["actions"]}>
                        {cell?.isPlaceholder ? null : (
                          <>
                            <NavLink to={"update/" + row.original.id}>
                              <i
                                className={clsx(
                                  "fa-regular fa-pen-to-square",
                                  cn["update"]
                                )}
                              ></i>
                            </NavLink>
                            <i
                              className={clsx(
                                "fa-regular fa-trash-can",
                                cn["delete"]
                              )}
                              onClick={() => deleteProduct(row.original.id)}
                            ></i>
                          </>
                        )}
                      </td>
                    );
                  }

                  return (
                    <td key={cell.id}>
                      {cell?.isPlaceholder ? null : cell.getValue()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;
