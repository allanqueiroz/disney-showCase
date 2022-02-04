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
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const ShowCase = () => {
    const [characterData, setCharacterData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [character, setCharacter] = React.useState({});

    const handleOpen = (updateClickedCharacter) => {setOpen(true); setCharacter(updateClickedCharacter)}
    const handleClose = () => setOpen(false);

    const OpenModal = () => {
        console.log(character)
        return <div>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        MEU ID: {character._id}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        FILMES: {character.films[0]}
                    </Typography>
                    <Typography id="modal-modal-description"
                        sx={
                            {mt: 2}
                    }>
                        {character.name}
                    </Typography>
                </Box>
            </Modal>
        </div>
    }

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
                        justifyContent: "center"
                    }
                }>
                    {
                    characterData.data.map((item) => (
                        <div key={item._id}>
                            <Card sx={
                                {
                                    margin: 2,
                                    width: 180
                                }
                            }>
                                <CardActionArea onClick={()=>handleOpen(item)}>
                                    <CardMedia component="img"
                                        src={item.imageUrl}
                                        alt={
                                            `character's card: ${item.name}`
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
                                            {item.name} </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
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
            {open?<OpenModal/>:null}
        </>
    )
}

export default ShowCase;
