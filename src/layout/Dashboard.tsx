import GroupsIcon from '@mui/icons-material/Groups';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MapIcon from '@mui/icons-material/Map';
import { AppProvider } from '@toolpad/core/react-router-dom';
import { Outlet } from 'react-router-dom';
import type { Navigation } from '@toolpad/core';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { createTheme } from '@mui/material';
import logo from "../assets/logo.png";
import { getCssVariable } from "../styles/getCssVariable";
import ProfileIcon from '../components/ProfileIcon';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'my-trips',
    title: 'My Trips',
    icon: <BeachAccessIcon />,
    pattern: 'my-trips{/:segment}*', // zero or more segments, MUI toolpad Navigation section
  },
  {
    segment: "map",
    title: "My Map",
    icon: <MapIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Public',
  },
  {
    segment: "explore",
    title: "Explore",
    icon: <GroupsIcon />,
    pattern: 'explore{/:segment}*', // zero or more segments, MUI toolpad Navigation section
  },
];

const BRANDING = {
    logo: <img src={logo} alt="logo" />,
    title: 'Adventurely',
    homeUrl: '/my-trips',
};

const THEME = createTheme({
    palette: {
        primary: {
          main: getCssVariable("--text-color"), // Navbar color
        },
    },
    components: { // Remove focus rings and hover backgrounds from IconButton
        MuiIconButton: {
          styleOverrides: {
            root: {
              '&:focus': {
                outline: 'none', // Remove focus ring
              },
              '&:hover': {
                backgroundColor: 'transparent', // Remove hover background
              },
            },
          },
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 750,
          md: 750,
          lg: 1536,
          xl: 1536,
        },
      },
});



const Dashboard = () => {
    return (
        <AppProvider 
            navigation={NAVIGATION} 
            branding={BRANDING}
            theme={THEME}
            >
            <DashboardLayout
                sx={{
                    // Hide breadcrumb and title in the top bar
                    '& .css-nen11g-MuiStack-root': {
                      display: 'none', 
                    }
                  }}
                slots={{
                  toolbarActions: ProfileIcon
                }}
            >
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
};

export default Dashboard;
