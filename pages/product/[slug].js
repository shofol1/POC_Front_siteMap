import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const addPage = async (sl) => {
      if (sl) {
        try {
          const routeName = `/product/${sl}`; // Replace with the actual route name

          const response = await axios.post("/api/pages", { routeName });
          if (response.status === 201) {
            console.log("Page added successfully");
            // Trigger sitemap generation after adding the page
            generateSitemap();
          } else {
            console.error("Error adding page:", response.data.error);
          }
        } catch (error) {
          console.error("Error adding page:", error);
        }
      } else {
        return true;
      }
    };
    const generateSitemap = async () => {
      try {
        const response = await axios.get("/api/generate-sitemap");
        if (response.status === 200) {
          console.log("Sitemap generated successfully");
        } else {
          console.error("Error generating sitemap:", response.data.error);
        }
      } catch (error) {
        console.error("Error generating sitemap:", error);
      }
    };
    addPage(slug);
  }, [slug]);

  return (
    <div className="container">
      <h1>Products</h1>
      <p>products-{slug}</p>
    </div>
  );
};

export default Product;
