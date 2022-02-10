import React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const styleMenuBar = {
    display: "flex",
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-evenly",
    bgcolor: "#393e8f"
}
const MenuBar = ({ setFilter }) => {
    return (
        <Box >
            <AppBar position="static" sx={styleMenuBar}>
                <Typography variant="h6" sx={{ width: "60%", padding: 1 }}>
                    DISNEY SHOWCASE
                </Typography>
                <Box sx={{ display: "flex", width: "35%" }}>
                    <TextField
                        title="Você pode pesquisar por nome, filme, tvShow e videogame (pros 3 últimos, a frase deve ser completa)"
                        label="Pesquisar"
                        onChange={e => setFilter(e.target.value)}
                        sx={{ bgcolor: "#f3f7f3", width: "100%" }}
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </AppBar>
        </Box>
    )
}

export default MenuBar;