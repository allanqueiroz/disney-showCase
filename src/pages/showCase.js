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
    const [idOnModal, setIdOnModal] = React.useState(0);

    const handleOpen = (id) => {setOpen(true); setIdOnModal(id)}
    const handleClose = () => setOpen(false);

    const OpenModal = () => {
        return <div>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        MEU ID: {idOnModal}
                    </Typography>
                    <Typography id="modal-modal-description"
                        sx={
                            {mt: 2}
                    }>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
                    characterData.data.map(({_id, name, imageUrl}) => (
                        <div key={_id}>
                            <Card sx={
                                {
                                    margin: 2,
                                    width: 180
                                }
                            }>
                                <CardActionArea onClick={()=>handleOpen(_id)}>
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
            <OpenModal/>
        </>
    )
}

export default ShowCase;
