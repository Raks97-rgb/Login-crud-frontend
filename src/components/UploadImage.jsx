import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, IconButton, Button } from '@mui/material';
import axios from 'axios';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function Uploadimage() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        const imageUpload = async () => {
            try {
                const fileData = new FormData();
                fileData.append('image', selectedFile);
                const response = await axios.post('http:3.111.1.234/question/addImage', fileData);
                console.log(response.data, "Uploaded Successfully");
            } catch (error) {
                console.error(error);
            }
        };
        imageUpload();
    }, []);


    return (
        <div>
            <Grid container display={'flex'} flexDirection={'column'} p={5} spacing={5} >
                <Grid item>
                    <Typography variant='h4' fontWeight={'bolder'} color={"#2F3B9F"}>Create Image Link</Typography>
                </Grid>
                <Grid item lg={11} mx={3} mt={5} p={3} bgcolor="#EFFAFE">
                    <Typography>
                        As an admin you can upload images and generate URLs for the images
                        that can be associated with your daily quiz content...
                    </Typography>
                    <Typography>
                        Once you upload an image here a unique URL is generated for it.
                    </Typography>
                    <Typography>
                        This acts as a direct link to the uploaded image.
                    </Typography>
                    <Typography>
                        To link an image to a specific questions in your quiz, simply copy
                        the image URL using “copy link” button and paste it into the
                        relevant cell in the Excel spreadsheet.
                    </Typography>
                    <Typography>
                        By doing so, the image will be associated with the corresponding
                        quiz when you upload the spreadsheet.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6' color={"#2F3B9F"}>Upload Image</Typography>
                </Grid>
                <Grid item mx={5} mt={3} lg={2} md={2} sm={2}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                        border: "1px dashed #5666EE",
                        borderRadius: "10px",
                        maxHeight: '25vh',
                        p: 5
                    }}>
                    <IconButton >
                        <AddPhotoAlternateIcon sx={{ fontSize: "2rem", color: "#5666EE" }} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Grid container display={'flex'} flexDirection={'row'} alignItems={'center'} spacing={2}>
                        <Grid item lg={4}>
                            <TextField type='text' placeholder='Image Link' fullWidth />
                        </Grid>
                        <Grid item>
                            <Button variant='contained' sx={{ textTransform: 'none', height: '5.5vh' }}>Copy Link</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Uploadimage;