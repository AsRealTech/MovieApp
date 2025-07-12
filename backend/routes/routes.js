import { Router } from "express";
import axios from "axios";

const router = Router();

let users = [
    {
        name: "john",
    }
];

router.get("/", (req, res) => {
    res.json({message: "coming from router"});
});

router.post("/users", (req, res) => {
    res.json({message: "coming from router"});
});

router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    res.json({message: "coming from router " + id});
});

router.put("/users/id", (req, res) => {
    const { id } = req.params.id;
    res.json({message: `coming from router ${id}`});
});

router.patch("/users/id", (req, res) => {
    res.json({message: "coming from router"});
});

router.delete("/users/:id", (req, res) => {
    res.json({message: "user deleted"});
});



router.get("/movieinfo/:id", async (req, res) => {
  const id =  req.params.id;  
  const urlSearch = `https://api.themoviedb.org/3/movie/${id}`;

  try {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API}`
            }
        };
        const response = await axios.get(urlSearch, options);
        res.json(await response.data);
  } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data from TMDB" });
    
  }

});

router.get("/search", async (req, res) => {
  const query =  req.query.query;  
  const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${query}`;

  try {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API}`
            }
        };
        const response = await axios.get(urlSearch, options);
        res.json(response.data);
  } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data from TMDB" });
    
  }

});

router.get("/popular", async (req, res) => {
        const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API}`
        }
    };
  const urlDiscover = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

  try {
     const response = await axios.get(urlDiscover, options);
    //  if(response.status == 200){
        res.status(200).json(response.data);
    //  }
  } catch (error) {
    res.status(500).json({message: " error fetching popular movies"});
  }

});


router.use((req, res) => {
    res.status(404).json({message: "path not found"});
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: "error with server"});
});

export default router;