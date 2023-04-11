import { type NextPage } from "next";
import Layout from "@/components/Layout";
import Welcome from "@/components/Landing/Welcome";
import FeaturedProducts from "@/components/Landing/FeaturedProducts";

const Home: NextPage = () => {
  return (
    <Layout page="Shop">
      <Welcome />
      <FeaturedProducts />
    </Layout>
  );
};

export default Home;
