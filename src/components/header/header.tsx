import { HeaderContainer, RightHandContainer, UserComponent } from "./header.style"
import { Logo } from "@/libs/icons/logo"
import { useRouter } from "next/router"
import { PostCallToAction, LogoutCallToAction } from "./header.style"
import { Box } from "@/libs/shared-components/theme/theme"

interface HeaderProps {
  onPostClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPostClick  }) => {
  const { push } = useRouter();  
  
  const handleNavigateHome = () => {
    push('/home');
  }
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    push('/login')
  }
  
  return (
    <HeaderContainer>
        <Logo onClick={handleNavigateHome} />
        <RightHandContainer>
            <PostCallToAction type="button" size="2xs" onClick={onPostClick}>
                <Box as={'span'}>Post</Box>
            </PostCallToAction>
            <UserComponent>
              <LogoutCallToAction type="button" size="medium" onClick={handleLogout}>
                <Box as={'span'}>Logout</Box>
              </LogoutCallToAction>
            </UserComponent>
        </RightHandContainer>
    </HeaderContainer>  
  )
}

export default Header;
