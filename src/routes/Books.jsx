import {useEffect, useState} from 'react';

import useAxios from '../services/useAxios';

import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
} from '@mui/material';

function Books() {
  const {data, loading, get} = useAxios('http://localhost:3000');
  const [searchInput, setSearchInput] = useState('');

  function getBooks() {
    get('books');
  }

  // TODO: Implement search functionality

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  const searchHandler = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
  };
  const filteredData = data.filter((el) =>
    el.name.toLowerCase().includes(searchInput) || el.author.toLowerCase().includes(searchInput)

  );

  return (
    <>
      <h2>Search for books: </h2>
      <input type="text" id="search" onChange={searchHandler}></input>
      <Box sx={{mx: 'auto', p: 2}}>
        {loading && <CircularProgress />}
        {!loading && (
          <div>
            <Stack
              sx={{justifyContent: 'space-around'}}
              spacing={{xs: 1}}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              {filteredData.map((book) => (
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '15%',
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{height: 250}}
                    image={book.img}
                    title={book.name}
                  />
                  <Box sx={{pt: 2, pl: 2}}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{mt: 2}}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={book.stars}
                      readOnly
                      size="small"
                    />
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </div>
        )}
      </Box>
    </>
  );
}

export default Books;
