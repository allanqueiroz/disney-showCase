import React from "react";
import api from "../services/api";

import Container from "@mui/material/Container"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ShowCase = () => {
    const [characterData, setCharacterData] = React.useState([]);

    async function getAllCharacters() {
        const res = await api.get("/characters");
        console.log(res.data);
        setCharacterData(res.data)
    }

    return (
        <>
            <Container maxWidth="lg">
                <h1>PERSONAGENS CARAIO</h1>
                <button onClick={getAllCharacters}>Buscar</button>

                {
                characterData.data ? <Box sx={
                    {
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }
                }>
                    {
                    characterData.data.map(({_id, name, imageUrl}) => (
                        <Card sx={
                                {
                                    margin: 2,
                                    width: 180
                                }
                            }
                            key={_id}>
                            <CardActionArea>
                                <CardMedia component="img"
                                    src={imageUrl}
                                    alt={
                                        `character's card: ${name}`
                                    }
                                    height="160"
                                    sx={
                                        {objectFit: "fill"}
                                    }/>
                                <Divider sx={
                                    {margin: 1}
                                }/>
                                <CardContent>
                                    <Typography gutterBottom variant="h7">
                                        {name} </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                }
                    <Stack spacing={2}>
                        <Pagination count={
                                characterData.totalPages
                            }
                            variant="outlined"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                            sx={
                                {
                                    padding: 3,
                                    marginLeft: 3
                                }
                            }/>
                    </Stack>
                </Box> : <h3>Nada para ver aqu1 :D</h3>
            } </Container>
        </>
    )
}

export default ShowCase;
