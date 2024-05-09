import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useUser } from "../hooks/useUser";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import ProductBox from "../components/layout/ProductBox/ProductBox";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Modal from "../components/block/Modal/Modal";
import Title from "../components/common/Title/Title";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import Picture from "../components/common/Picture/Picture";
import loginImg from "../assets/login.svg";
import Gallery from "../components/layout/Gallery/Gallery";
import BlockHeader from "../components/layout/BlockHeader/BlockHeader";
import Product from "../components/block/Product/Product";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import BtnBlock from "../components/layout/BtnBlock/BtnBlock";

const OneProductPage = () => {
  const { slug } = useParams();

  return (
    <>
      <Header />

      <MainLayout>
        <ProductBox slug={slug} />
      </MainLayout>

      <Footer />
    </>
  );
};

export default OneProductPage;
