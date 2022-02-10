import React from "react";
import api from "../services/api";
import MenuBar from "../components/menuBar";

import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const styleModal = {
    position: 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -15%)',
    width: '55%',
    minHeight: "55%",
    bgcolor: '#f1f1f1',
    border: '2px solid #0900ff',
    p: 4,
    boxShadow: 24,
};
const styleBoxContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "90vh"
};

const ShowCase = () => {
    const [characterData, setCharacterData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [char, setChar] = React.useState({});
    const [filterChar, setFilterChar] = React.useState("");

    React.useEffect(async () => {
        try {
            const res = await api.get("/characters");
            console.log(res.data);
            setCharacterData(res.data)
        } catch (error) {
            console.log("É, deu erro", error);
        }
    }, [])

    const handleOpen = (updateClickedCharacter) => { setOpen(true); setChar(updateClickedCharacter) }

    const LoadAllCharacters = () => {
        return (
            <React.Fragment>
                {
                    characterData.data.map((item) => (
                        <div key={item._id}>
                            <Card sx={{ margin: 2, width: 180 }}>
                                <CardActionArea onClick={() => handleOpen(item)}>
                                    <CardMedia component="img"
                                        src={item.imageUrl}
                                        alt={`character's card: ${item.name}`}
                                        height="160"
                                        sx={{ objectFit: "fill" }}
                                    />
                                    <Divider sx={{ margin: 1 }} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h7">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    ))
                }
            </React.Fragment>
        )
    }
    const ModalCharacter = () => {
        return <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                disableScrollLock={true}
                sx={{ overflowY: "scroll" }}
            >
                <Box sx={styleModal} >
                    <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center"}} >
                        <Typography variant="h4" >{char.name}</Typography>
                        <Icon onClick={() => setOpen(false)} className="close-icon-pointer">
                            <CancelPresentationIcon />
                        </Icon>
                    </Box>
                    <Divider sx={{ margin: 1 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-around", padding: 1 }}>
                        <Box>
                            <ShowDescriptionItem characterItem={char.allies}>- Aliados:</ShowDescriptionItem>
                            <ShowDescriptionItem characterItem={char.enemies}>- Inimigos:</ShowDescriptionItem>
                            <ShowDescriptionItem characterItem={char.films}>- Filmes:</ShowDescriptionItem>
                            <ShowDescriptionItem characterItem={char.parkAttractions}>- Atrações:</ShowDescriptionItem>
                            <ShowDescriptionItem characterItem={char.shortFilms}>- Curtas:</ShowDescriptionItem>
                            <ShowDescriptionItem characterItem={char.tvShows}>- Programas de TV:</ShowDescriptionItem>
                            <ShowDescriptionItem characterItem={char.videoGames}>- Jogos de Videogame:</ShowDescriptionItem>
                        </Box>
                        <Card sx={{ margin: 2, width: 180, maxHeight: 160 }}>
                            <CardMedia component="img"
                                src={char.imageUrl}
                                alt={`character's card: ${char.name}`}
                                height="160"
                                sx={{ objectFit: "fill" }}
                            />
                        </Card>
                    </Box>
                </Box>
            </Modal>
        </div>
    }
    const ShowDescriptionItem = ({ characterItem, children }) => {
        return <React.Fragment>
            <Typography variant="h6" >
                {children}
                {characterItem.length ?
                    <ul>
                        {characterItem.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    :
                    " Não possui"}
            </Typography>
        </React.Fragment>
    }
    const SearchCharacter = () => {
        return (
            <React.Fragment>
                {
                    characterData.data.filter((item) => {
                        if (item.name.toLowerCase().includes(filterChar.toLowerCase()) ||
                            item.videoGames.includes(filterChar) ||
                            item.films.includes(filterChar) ||
                            item.tvShows.includes(filterChar)) {
                            return item
                        }
                    }).map(character => {
                        return <div key={character._id}>
                            <Card sx={{ margin: 2, width: 180 }}>
                                <CardActionArea onClick={() => handleOpen(character)}>
                                    <CardMedia component="img"
                                        src={character.imageUrl}
                                        alt={`character's card: ${character.name}`}
                                        height="160"
                                        sx={{ objectFit: "fill" }} />
                                    <Divider sx={{ margin: 1 }} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h7">
                                            {character.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    })
                }
            </React.Fragment>
        )
    }

    return (
        <>
            <MenuBar setFilter={setFilterChar} />
            <Container maxWidth="lg">{
                <Box sx={styleBoxContainer}>
                    {characterData.data ?
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {!filterChar ? <LoadAllCharacters /> : <SearchCharacter />}
                        </Box>
                        :
                        <h3>CARREGANDO</h3>
                    }
                    <Stack spacing={2}>
                        <Pagination count={characterData.totalPages}
                            variant="outlined"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                            sx={{
                                padding: 3,
                                marginLeft: 3
                            }} />
                    </Stack>
                </Box>
            }</Container>

            {open ? <ModalCharacter /> : null}
        </>
    )
}

export default ShowCase;
