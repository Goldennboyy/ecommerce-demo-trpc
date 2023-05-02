import { type NextPage } from "next";
import Layout from "@/components/Layout";
import Welcome from "@/components/landing/Welcome";
import FeaturedProducts from "@/components/landing/FeaturedProducts";

const Home: NextPage = () => {
  return (
    <Layout page="Shop">
      <Welcome />
      <FeaturedProducts />
    </Layout>
  );
};

export default Home;
