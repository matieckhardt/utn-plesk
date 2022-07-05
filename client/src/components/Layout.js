import { Card } from "@mui/material";


function Layout({ children }) {

    return (
        <>
            <Card sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight:"80vh",
                backgroundColor: "white"
            }}>
                {children}
            </Card>
        </>
    );
}

export default Layout;