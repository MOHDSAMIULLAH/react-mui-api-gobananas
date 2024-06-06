import React, { useState, useEffect } from "react";
import { fetchPosts } from "../utils/api";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Avatar,
  Box,
  TextField,
} from "@mui/material";

// Component to display list of posts with search functionality
const Posts = () => {
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch posts from API on component mount
  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false); // Set loading to false after fetching data
    };
    getPosts();
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
      py={{ xs: 6, sm: 12 }}
      bgcolor="lightblue.50"
    >
      <Container maxWidth="lg" py={4}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Our Posts
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          fontWeight="medium"
          color="textSecondary"
          gutterBottom
        >
          API used: JSON Placeholder
        </Typography>
        <TextField
          label="Search Posts"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearch}
        />
        <Grid container direction="column" spacing={6} mt={5}>
          {filteredPosts &&
            filteredPosts.map((post) => (
              <Grid item key={post._id}>
                <Card sx={{ maxWidth: "100%", boxShadow: 3 }}>
                  <CardContent>
                    <Box mt={2}>
                      <Typography
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                        color="textPrimary"
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" mt={2}>
                        {post.body}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={4}
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar
                          alt="Mohd Samiullah"
                          src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                          sx={{ mr: 2 }}
                        />
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color="textPrimary"
                        >
                          Mohd Samiullah
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Posts;
