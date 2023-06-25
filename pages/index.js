import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  console.log("🚀 ~ file: index.js:7 ~ Home ~ router:", router);
  useEffect(() => {
    const addPage = async () => {
      try {
        const routeName = router.route; // Replace with the actual route name

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

    addPage();
  }, []);

  return (
    <div className="container">
      <h1>Dynamic Sitemap Generation</h1>
      <p>Sitemap generation triggered.</p>
    </div>
  );
};

export default Home;
