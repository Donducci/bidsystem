import { ReactNode } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/foooter/footer";
import { LayoutContainer, MainWrapper } from "./layout.style";
import { useState } from "react";
import Modal from "@/components/modal";
import { createCollection } from "@/pages/api";
import { jwtDecode } from "jwt-decode";
import { fetchAllCollections } from "@/store/collectionSlice";
import { useAppDispatch } from "@/libs/utils/hook";

interface LayoutProps {
  children: ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
}

interface DecodedToken {
  id: number;
  email: string;
  name: string;
}

interface CollectionData {
  name?: string;
  description?: string;
  price?: number;
  stocks?: number
}

function Layout({ children, widhHeader = true, withFooter = true }: any) {
  const dispatch = useAppDispatch();
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false); 
  const togglePostModal = () => setIsPostModalOpen(!isPostModalOpen);

   const handleSave = (data: CollectionData) => {
    const token = localStorage.getItem('token');
    if (token) { // Ensure token is not null before proceeding
      const decoded: DecodedToken = jwtDecode(token);
      const collectionData = { ...data, userId: decoded.id };

      createCollection(collectionData).then(() => {
        dispatch(fetchAllCollections());
        togglePostModal();
      }).catch((error) => {
        console.error("Error creating collection", error);
      });
    } else {
      console.error("No token found");
    }
  }

  return (
    <LayoutContainer>
      {widhHeader && <Header onPostClick={togglePostModal} />}
      <MainWrapper>
        {children}       
        {isPostModalOpen && <Modal toggleModal={togglePostModal} handleSave={handleSave} />}
      </MainWrapper>
        { withFooter && <Footer />}
    </LayoutContainer>
  )
}

export default Layout;
