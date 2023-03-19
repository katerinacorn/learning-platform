import React, { useEffect, useState } from 'react';
import {
    Box, Container, List, ListItem, ListItemText, ListItemIcon, ListItemButton, Typography
} from '@mui/material';
import { getCourseDetails } from '../../services/course-details-service';
import VideoPlayer from '../../components/video-player/video-player';
import { Outlet } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';


interface Course {
    id?: string;
    title?: string;
    tags?: string[];
    launchDate?: string;
    status?: string;
    description?: string;
    duration?: number;
    previewImageLink?: string;
    rating?: number;
    meta?: {
        slug: string;
        skills: string[];
        courseVideoPreview: {
            link: string;
            duration: number;
            previewImageLink: string;
        };
    };
    lessons?: Lesson[];
    containsLockedLessons?: boolean;
}

interface Lesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: string;
    link: string;
    previewImageLink: string;
    meta: null;
}

interface Props {
    id: string;
}

// - для курсу: `previewImageLink + '/cover.webp'`
// - для уроку: `previewImageLink + '/' + lesson.order + '.webp'`
//( ${previewImageLink}/lesson-${order}.webp.)

const Course = ({ id }: Props) => {
    const [courseDetails, setCourseDetails] = useState<Course>({});
    const [url, setUrl] = useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        getCourseDetails(id).then((response) => { setCourseDetails(response); setUrl(response.lessons[0].link) });
    }, []);

    return (
        <Container maxWidth={"lg"}>
            <Box width={"100%"} display="flex" alignItems={"center"} flexDirection={"column"} justifyContent="center">
                <Typography marginTop={"40px"} variant='h3' component={"h1"}>{courseDetails?.title}</Typography>
                <Box width={"50%"} marginTop={"8%"}>
                    <VideoPlayer url={url} />
                    <Typography>{courseDetails?.description}</Typography>
                </Box>
                <Box width={"50%"} display={"flex"}>
                    <List>
                        {courseDetails?.lessons?.map((lesson, index) => {
                            return (<ListItem key={lesson.id} disablePadding>
                                <ListItemButton selected={selectedIndex === index} disabled={lesson.status === "locked"} onClick={() => { setUrl(lesson.link); setSelectedIndex(index) }}>
                                    <ListItemIcon>
                                        {
                                            lesson.status === "locked" ? <LockIcon /> : <SchoolIcon />
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={lesson.title} />
                                </ListItemButton>
                            </ListItem>)
                        })}
                    </List>
                </Box>
            </Box>
            <Outlet />
        </Container >
    )
}

export default Course;