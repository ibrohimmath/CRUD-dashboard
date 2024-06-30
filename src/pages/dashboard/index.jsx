import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

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
      <div className="loader" style={{ transform: "scale(6)" }}></div>
    </div>
  ) : (
    <Layout>
      <div
        className="dashboard-content"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          color: "white",
          fontSize: "3rem",
          fontWeight: "600",
        }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
        dolorem.
      </div>
    </Layout>
  );
}

export default Dashboard;
